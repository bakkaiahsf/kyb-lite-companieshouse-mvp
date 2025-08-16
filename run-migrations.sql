-- Combined migration script for running directly in Supabase Dashboard
-- This combines both initial schema and RLS policies

-- Initial schema for Nexus AI platform
-- Create custom types
DO $$ BEGIN
    CREATE TYPE subscription_tier AS ENUM ('free', 'beginner', 'pro');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'past_due', 'trialing');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE action_type AS ENUM ('search', 'company_view', 'officer_view', 'psc_view', 'export');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    phone TEXT,
    bio TEXT,
    avatar_url TEXT,
    subscription_tier subscription_tier DEFAULT 'free'::subscription_tier,
    subscription_status subscription_status DEFAULT 'active'::subscription_status,
    stripe_customer_id TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_number TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    company_status TEXT NOT NULL,
    company_type TEXT NOT NULL,
    date_of_creation DATE,
    date_of_cessation DATE,
    registered_office_address JSONB NOT NULL,
    sic_codes TEXT[] DEFAULT '{}',
    accounts JSONB,
    confirmation_statement JSONB,
    links JSONB NOT NULL,
    data_fetched_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create company_officers table
CREATE TABLE IF NOT EXISTS company_officers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_number TEXT NOT NULL REFERENCES companies(company_number) ON DELETE CASCADE,
    officer_role TEXT NOT NULL,
    appointed_on DATE,
    resigned_on DATE,
    name TEXT NOT NULL,
    nationality TEXT,
    occupation TEXT,
    country_of_residence TEXT,
    date_of_birth JSONB,
    address JSONB,
    links JSONB NOT NULL,
    data_fetched_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create company_pscs table (Persons with Significant Control)
CREATE TABLE IF NOT EXISTS company_pscs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    company_number TEXT NOT NULL REFERENCES companies(company_number) ON DELETE CASCADE,
    kind TEXT NOT NULL,
    name TEXT NOT NULL,
    notified_on DATE,
    ceased_on DATE,
    nationality TEXT,
    date_of_birth JSONB,
    address JSONB,
    natures_of_control TEXT[] DEFAULT '{}',
    links JSONB NOT NULL,
    data_fetched_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create search_history table
CREATE TABLE IF NOT EXISTS search_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    results_count INTEGER NOT NULL DEFAULT 0,
    filters JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create usage_tracking table
CREATE TABLE IF NOT EXISTS usage_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    action_type action_type NOT NULL,
    resource_accessed TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_companies_company_number ON companies(company_number);
CREATE INDEX IF NOT EXISTS idx_companies_company_name ON companies(company_name);
CREATE INDEX IF NOT EXISTS idx_companies_status ON companies(company_status);
CREATE INDEX IF NOT EXISTS idx_companies_created_at ON companies(created_at);
CREATE INDEX IF NOT EXISTS idx_companies_data_fetched_at ON companies(data_fetched_at);

CREATE INDEX IF NOT EXISTS idx_company_officers_company_number ON company_officers(company_number);
CREATE INDEX IF NOT EXISTS idx_company_officers_name ON company_officers(name);
CREATE INDEX IF NOT EXISTS idx_company_officers_role ON company_officers(officer_role);

CREATE INDEX IF NOT EXISTS idx_company_pscs_company_number ON company_pscs(company_number);
CREATE INDEX IF NOT EXISTS idx_company_pscs_name ON company_pscs(name);
CREATE INDEX IF NOT EXISTS idx_company_pscs_kind ON company_pscs(kind);

CREATE INDEX IF NOT EXISTS idx_search_history_user_id ON search_history(user_id);
CREATE INDEX IF NOT EXISTS idx_search_history_created_at ON search_history(created_at);

CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_action_type ON usage_tracking(action_type);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_created_at ON usage_tracking(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DO $$ BEGIN
    CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_company_officers_updated_at BEFORE UPDATE ON company_officers
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_company_pscs_updated_at BEFORE UPDATE ON company_pscs
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Row Level Security (RLS) policies for Nexus AI

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_officers ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_pscs ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Authenticated users can view companies" ON companies;
DROP POLICY IF EXISTS "Service role can insert companies" ON companies;
DROP POLICY IF EXISTS "Service role can update companies" ON companies;
DROP POLICY IF EXISTS "Authenticated users can view company officers" ON company_officers;
DROP POLICY IF EXISTS "Service role can insert company officers" ON company_officers;
DROP POLICY IF EXISTS "Service role can update company officers" ON company_officers;
DROP POLICY IF EXISTS "Authenticated users can view company PSCs" ON company_pscs;
DROP POLICY IF EXISTS "Service role can insert company PSCs" ON company_pscs;
DROP POLICY IF EXISTS "Service role can update company PSCs" ON company_pscs;
DROP POLICY IF EXISTS "Users can view own search history" ON search_history;
DROP POLICY IF EXISTS "Users can insert own search history" ON search_history;
DROP POLICY IF EXISTS "Users can delete own search history" ON search_history;
DROP POLICY IF EXISTS "Users can view own usage tracking" ON usage_tracking;
DROP POLICY IF EXISTS "Users can insert own usage tracking" ON usage_tracking;
DROP POLICY IF EXISTS "Service role can view all usage tracking" ON usage_tracking;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies policies (public read access for all authenticated users)
CREATE POLICY "Authenticated users can view companies" ON companies
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service role can insert companies" ON companies
    FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can update companies" ON companies
    FOR UPDATE TO service_role USING (true);

-- Company officers policies (public read access for all authenticated users)
CREATE POLICY "Authenticated users can view company officers" ON company_officers
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service role can insert company officers" ON company_officers
    FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can update company officers" ON company_officers
    FOR UPDATE TO service_role USING (true);

-- Company PSCs policies (public read access for all authenticated users)
CREATE POLICY "Authenticated users can view company PSCs" ON company_pscs
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service role can insert company PSCs" ON company_pscs
    FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can update company PSCs" ON company_pscs
    FOR UPDATE TO service_role USING (true);

-- Search history policies (users can only see their own search history)
CREATE POLICY "Users can view own search history" ON search_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own search history" ON search_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own search history" ON search_history
    FOR DELETE USING (auth.uid() = user_id);

-- Usage tracking policies (users can only see their own usage data)
CREATE POLICY "Users can view own usage tracking" ON usage_tracking
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage tracking" ON usage_tracking
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can view all usage tracking" ON usage_tracking
    FOR SELECT TO service_role USING (true);

-- Create a function to check subscription limits
CREATE OR REPLACE FUNCTION check_user_subscription_limit(user_uuid UUID, action_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_tier subscription_tier;
    monthly_usage INTEGER;
    tier_limit INTEGER;
BEGIN
    -- Get user's subscription tier
    SELECT subscription_tier INTO user_tier
    FROM profiles
    WHERE id = user_uuid;
    
    -- Count usage for current month
    SELECT COUNT(*) INTO monthly_usage
    FROM usage_tracking
    WHERE user_id = user_uuid
    AND action_type::TEXT = action_name
    AND created_at >= date_trunc('month', NOW());
    
    -- Set limits based on tier
    CASE user_tier
        WHEN 'free' THEN tier_limit := 10;
        WHEN 'beginner' THEN tier_limit := 100;
        WHEN 'pro' THEN tier_limit := 1000;
        ELSE tier_limit := 0;
    END CASE;
    
    RETURN monthly_usage < tier_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'first_name',
        NEW.raw_user_meta_data->>'last_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Test query to verify setup
SELECT 'Database schema setup completed successfully!' as status;