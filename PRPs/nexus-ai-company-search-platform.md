name: "Nexus AI Company Search Platform - Complete Implementation"
description: |

## Purpose
Comprehensive implementation of Nexus AI - a company intelligence platform that uncovers ownership structures, hidden links, and risk flags using UK Companies House and global data sources.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
Build Nexus AI as the fastest, easiest, and most reliable way to uncover a company's real owners, hidden links, and risk flags — all from official UK and global data sources — in seconds, without the user needing to manually search multiple government websites.

### Target Users
- Law firms, accountants, banks
- Compliance officers
- Investigative journalists
- SMEs needing quick due diligence reports

### Key Features
- Zero-friction onboarding – Free sign-up with instant company search
- One-click report generation – No manual data downloads
- Multi-level ownership mapping – See 3+ layers deep instantly
- Risk flagging – Automatic sanctions, charity, and property checks
- Scalable subscription model – Upgrade path from free to Pro

### User Journey
**Step 0 – Sign-up**
- User chooses Free, Beginner, or Pro tier
- Email/password or Google/Microsoft login

**Step 1 – Search**
- User enters a company number or name
- Nexus AI calls Companies House API and fetches base profile

**Step 2 – Deep Linking**
- AI cross-references GLEIF, UK Sanctions, Charity Commission, Land Registry
- Ownership tree up to 3 levels deep is built

**Step 3 – Risk Detection**
- AI flags: Directors on sanctions list, Multiple companies at same address
- Offshore parents via LEI records, Charity trusteeships
- Suspicious property ownership patterns

**Step 4 – Visual & Report**
- Interactive Graph view of ownership
- PDF Compliance Report with profile, graph, and risk section

**Step 5 – Save / Monitor**
- Beginner/Pro users can save company profiles
- Pro users can set alerts for changes (daily, weekly)

## Why
Current pain points:
1. **Problem 1**: Data scattered across multiple government websites
2. **Problem 2**: Directors may control companies indirectly through other companies, trusts, or charities
3. **Problem 3**: Compliance officers waste hours downloading and cross-checking filings
4. **Problem 4**: Mistakes or missing a hidden owner can lead to huge fines from the FCA or HMRC

**Solution**: Nexus AI automatically fetches all relevant official data, uses AI to detect hidden links up to 3+ levels deep, highlights risky people or companies, and produces a professional, regulator-ready report in under 5 seconds.

## What
Complete implementation of a Next.js 14+ application with Supabase backend, AI-powered company intelligence, and subscription-based access.

### Success Criteria
- [ ] User can sign up and authenticate via email/Google/Microsoft
- [ ] Company search returns complete profile with officers and PSCs
- [ ] Multi-level ownership mapping (3+ levels) with visual graph
- [ ] Risk detection identifies sanctions, property links, charity connections
- [ ] PDF report generation with compliance-ready format
- [ ] Subscription tiers properly enforced (Free/Beginner/Pro)
- [ ] Real-time monitoring and alerts for Pro users
- [ ] Full test coverage with E2E testing
- [ ] Production deployment ready with monitoring

## All Needed Context

### Documentation & References
```yaml
- url: https://developer.company-information.service.gov.uk/
  why: Official UK corporate registry – primary source for company profiles, directors, PSCs.

- url: https://www.gleif.org/en/lei-data/gleif-api
  why: Global corporate ownership links via LEI records.

- url: https://www.gov.uk/government/publications/financial-sanctions-consolidated-list-of-targets
  why: Identify sanctioned individuals/entities.

- url: https://register-of-charities.charitycommission.gov.uk/register/full-register-download
  why: Find cross-links between company directors and charities.

- url: https://use-land-property-data.service.gov.uk/datasets
  why: Detect links between companies and UK property holdings.

- url: https://nextjs.org/docs
  why: Next.js 14+ App Router documentation

- url: https://supabase.com/docs
  why: Supabase backend setup and configuration

- url: https://neo4j.com/docs/
  why: Graph database for relationship mapping

- url: https://tailwindcss.com/docs
  why: UI styling framework
```

### Current Codebase Structure
```bash
C:\Users\BakkaiahMadipalli\Cursor\Web-apps\companyhouseai\
├── MCP-server\                    # MCP server for external integrations
├── PRPs\                          # Pull Request Proposals
│   ├── base_prp.md               # Template for PRPs
│   ├── claude.md                 # Development guidelines
│   └── nexus-ai-company-search-platform.md  # This PRP
├── claude-code-full-guide\       # Development documentation
└── .git                          # Git repository
```

### Desired Codebase Structure
```
├── src/
│   ├── app/                      # Next.js 14+ App Router
│   │   ├── (auth)/              # Authentication routes
│   │   │   ├── signin/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── (dashboard)/         # Protected dashboard routes
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── loading.tsx
│   │   │   ├── search/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [companyId]/
│   │   │   │       └── page.tsx
│   │   │   ├── reports/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [reportId]/
│   │   │   │       └── page.tsx
│   │   │   ├── monitoring/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── api/                 # API routes
│   │   │   ├── auth/
│   │   │   │   └── callback/
│   │   │   │       └── route.ts
│   │   │   ├── companies/
│   │   │   │   ├── search/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── officers/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── pscs/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── relationships/
│   │   │   │   │       └── route.ts
│   │   │   │   └── bulk/
│   │   │   │       └── route.ts
│   │   │   ├── reports/
│   │   │   │   ├── generate/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── [id]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── pdf/
│   │   │   │       └── route.ts
│   │   │   ├── monitoring/
│   │   │   │   ├── watchlist/
│   │   │   │   │   └── route.ts
│   │   │   │   └── alerts/
│   │   │   │       └── route.ts
│   │   │   ├── billing/
│   │   │   │   ├── limits/
│   │   │   │   │   └── route.ts
│   │   │   │   └── upgrade/
│   │   │   │       └── route.ts
│   │   │   └── webhooks/
│   │   │       ├── stripe/
│   │   │       │   └── route.ts
│   │   │       └── supabase/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── loading.tsx          # Global loading UI
│   │   ├── error.tsx            # Global error UI
│   │   └── not-found.tsx        # 404 page
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── table.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── form.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── toast.tsx
│   │   │   └── spinner.tsx
│   │   ├── auth/                # Authentication components
│   │   │   ├── signin-form.tsx
│   │   │   ├── signup-form.tsx
│   │   │   ├── auth-provider.tsx
│   │   │   └── logout-button.tsx
│   │   ├── company/             # Company-specific components
│   │   │   ├── search-form.tsx
│   │   │   ├── company-profile.tsx
│   │   │   ├── officers-table.tsx
│   │   │   ├── pscs-table.tsx
│   │   │   ├── ownership-graph.tsx
│   │   │   ├── risk-indicators.tsx
│   │   │   └── company-card.tsx
│   │   ├── reports/             # Report components
│   │   │   ├── report-generator.tsx
│   │   │   ├── report-preview.tsx
│   │   │   ├── pdf-viewer.tsx
│   │   │   └── report-list.tsx
│   │   ├── monitoring/          # Monitoring components
│   │   │   ├── watchlist.tsx
│   │   │   ├── alerts-list.tsx
│   │   │   ├── add-to-watchlist.tsx
│   │   │   └── alert-settings.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── nav-menu.tsx
│   │   │   └── breadcrumbs.tsx
│   │   ├── billing/             # Billing components
│   │   │   ├── subscription-card.tsx
│   │   │   ├── usage-meter.tsx
│   │   │   ├── upgrade-modal.tsx
│   │   │   └── billing-history.tsx
│   │   └── charts/              # Chart components
│   │       ├── ownership-tree.tsx
│   │       ├── risk-chart.tsx
│   │       └── network-graph.tsx
│   ├── lib/                     # Utility libraries
│   │   ├── supabase/            # Supabase configuration
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   ├── middleware.ts
│   │   │   └── types.ts
│   │   ├── services/            # External API services
│   │   │   ├── companies-house.ts
│   │   │   ├── gleif.ts
│   │   │   ├── sanctions.ts
│   │   │   ├── charity-commission.ts
│   │   │   ├── land-registry.ts
│   │   │   ├── entity-resolver.ts
│   │   │   └── graph-builder.ts
│   │   ├── utils/               # Utility functions
│   │   │   ├── pdf-generator.ts
│   │   │   ├── data-formatter.ts
│   │   │   ├── risk-analyzer.ts
│   │   │   ├── relationship-mapper.ts
│   │   │   └── validation.ts
│   │   ├── auth/                # Authentication utilities
│   │   │   ├── config.ts
│   │   │   ├── providers.ts
│   │   │   └── middleware.ts
│   │   ├── neo4j/               # Neo4j graph database
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── models.ts
│   │   ├── stripe/              # Stripe billing
│   │   │   ├── client.ts
│   │   │   ├── webhooks.ts
│   │   │   └── plans.ts
│   │   ├── validations.ts       # Zod schemas
│   │   ├── constants.ts         # App constants
│   │   ├── env.ts              # Environment validation
│   │   └── utils.ts            # General utilities
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-company-search.ts
│   │   ├── use-auth.ts
│   │   ├── use-subscription.ts
│   │   ├── use-reports.ts
│   │   ├── use-monitoring.ts
│   │   ├── use-debounce.ts
│   │   └── use-local-storage.ts
│   ├── stores/                  # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── company-store.ts
│   │   ├── report-store.ts
│   │   └── ui-store.ts
│   ├── types/                   # TypeScript type definitions
│   │   ├── supabase.ts         # Auto-generated from Supabase
│   │   ├── company.ts
│   │   ├── report.ts
│   │   ├── auth.ts
│   │   ├── billing.ts
│   │   └── global.d.ts
│   └── styles/                  # Global styles
│       └── globals.css
├── supabase/                    # Supabase configuration
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   ├── functions/
│   │   ├── generate-report/
│   │   ├── sync-companies-house/
│   │   └── process-webhooks/
│   ├── config.toml
│   └── seed.sql
├── tests/                       # Test files
│   ├── __tests__/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── pages/
│   ├── e2e/
│   │   ├── auth.spec.ts
│   │   ├── search.spec.ts
│   │   ├── reports.spec.ts
│   │   └── billing.spec.ts
│   └── setup.ts
├── docs/                        # Documentation
│   ├── api.md
│   ├── deployment.md
│   └── user-guide.md
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

### Known Gotchas & Library Quirks
```typescript
// Companies House API constraints
const COMPANIES_HOUSE_RATE_LIMIT = 600; // requests per 5 minutes per API key
const COMPANIES_HOUSE_BASE_URL = 'https://api.company-information.service.gov.uk';

// GLEIF API is paginated – handle large datasets carefully
const GLEIF_PAGE_SIZE = 100;
const GLEIF_MAX_PAGES = 50;

// Supabase real-time updates require replication enabled
// Neo4j queries beyond depth=3 can be slow without indexes
const MAX_OWNERSHIP_DEPTH = 3;
const NEO4J_TIMEOUT = 30000; // 30 seconds

// Name/address variations require fuzzy matching to avoid false negatives
const FUZZY_MATCH_THRESHOLD = 0.8;

// PDF generation memory limits
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

// Rate limiting per subscription tier
const RATE_LIMITS = {
  free: { searches: 5, period: 'month' },
  beginner: { searches: 50, period: 'month' },
  pro: { searches: 'unlimited', period: 'month' }
};
```

## Implementation Blueprint

### Phase 1: Foundation Setup (Week 1)
**Core Infrastructure**
1. **Project Initialization**
   - Next.js 14+ with App Router setup
   - TypeScript configuration with strict mode
   - Tailwind CSS + Shadcn/ui components
   - ESLint + Prettier configuration

2. **Database Setup**
   - Supabase project creation and configuration
   - Database schema migration (see schema below)
   - Row Level Security (RLS) policies
   - Neo4j graph database setup for relationships

3. **Authentication System**
   - Supabase Auth setup with email/password
   - Google and Microsoft OAuth providers
   - Protected route middleware
   - User profile management

### Phase 2: Core Company Search (Week 2)
**Company Data Pipeline**
1. **Companies House Integration**
   - API client with rate limiting
   - Company profile fetching
   - Officers and PSCs data retrieval
   - Filing history access

2. **Search Interface**
   - Company search form with validation
   - Real-time search suggestions
   - Results display with pagination
   - Company profile pages

3. **Data Storage**
   - Company data caching in Supabase
   - Incremental updates and sync
   - Data deduplication logic

### Phase 3: Relationship Mapping (Week 3)
**Multi-level Ownership Analysis**
1. **External Data Sources**
   - GLEIF API integration for LEI data
   - UK Sanctions list processing
   - Charity Commission data sync
   - Land Registry property links

2. **Entity Resolution**
   - Name matching algorithms
   - Address normalization
   - Date of birth correlation
   - Confidence scoring

3. **Graph Database**
   - Neo4j relationship modeling
   - Ownership tree construction
   - Circular reference detection
   - Performance optimization

### Phase 4: Risk Analysis & Visualization (Week 4)
**Intelligence & Reporting**
1. **Risk Detection**
   - Sanctions screening
   - Shell company identification
   - Unusual ownership patterns
   - Property connection analysis

2. **Visualization**
   - Interactive ownership graphs
   - Risk indicator dashboards
   - Geographic mapping
   - Timeline views

3. **Report Generation**
   - PDF compliance reports
   - Executive summaries
   - Evidence documentation
   - Export capabilities

### Phase 5: Subscription & Monitoring (Week 5)
**Business Logic**
1. **Billing System**
   - Stripe payment processing
   - Subscription tier management
   - Usage tracking and limits
   - Upgrade/downgrade flows

2. **Monitoring & Alerts**
   - Watchlist management
   - Change detection
   - Email notifications
   - Real-time updates

3. **API Access**
   - RESTful API for Pro users
   - Rate limiting per tier
   - API key management
   - Webhook notifications

### Data Models and Schema

**Supabase Database Schema**
```sql
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- =========
-- Authentication & Organizations
-- =========
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TYPE subscription_plan AS ENUM ('free', 'beginner', 'pro');

CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  full_name TEXT,
  role TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL DEFAULT 'free',
  seats INT NOT NULL DEFAULT 1,
  renews_at DATE,
  status TEXT NOT NULL DEFAULT 'active',
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========
-- Usage Tracking
-- =========
CREATE TABLE public.usage_counters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  searches_count INT NOT NULL DEFAULT 0,
  reports_count INT NOT NULL DEFAULT 0,
  alerts_sent_count INT NOT NULL DEFAULT 0,
  UNIQUE (org_id, period_start, period_end)
);

-- =========
-- Data Sources & Provenance
-- =========
CREATE TYPE source_kind AS ENUM (
  'companies_house', 'gleif', 'uk_sanctions', 
  'charity_commission', 'land_registry', 'derived'
);

CREATE TABLE public.data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind source_kind NOT NULL,
  source_ref TEXT,
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  raw JSONB,
  hash BYTEA,
  UNIQUE (kind, source_ref)
);

-- =========
-- Core Business Entities
-- =========
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_number CITEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  status TEXT,
  incorporation_date DATE,
  dissolution_date DATE,
  company_type TEXT,
  jurisdiction TEXT DEFAULT 'GB',
  registered_address TEXT,
  lei CITEXT,
  sic_codes TEXT[],
  last_synced_at TIMESTAMPTZ,
  source_id UUID REFERENCES public.data_sources(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_companies_name ON public.companies USING GIN (to_tsvector('english', name));
CREATE INDEX idx_companies_lei ON public.companies (lei);
CREATE INDEX idx_companies_status ON public.companies (status);

-- People (directors, PSCs, trustees)
CREATE TABLE public.persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  nationality TEXT,
  address TEXT,
  normalized_name TEXT,
  occupation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_persons_normalized_name ON public.persons (normalized_name);
CREATE INDEX idx_persons_dob ON public.persons (date_of_birth);

-- Officers (directors, secretaries)
CREATE TABLE public.officers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES public.persons(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  appointed_on DATE,
  resigned_on DATE,
  source_id UUID REFERENCES public.data_sources(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_officers_company_id ON public.officers (company_id);
CREATE INDEX idx_officers_person_id ON public.officers (person_id);
CREATE INDEX idx_officers_role ON public.officers (role);

-- PSCs (Persons with Significant Control)
CREATE TABLE public.pscs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  person_id UUID REFERENCES public.persons(id) ON DELETE SET NULL,
  psc_kind TEXT NOT NULL,
  ownership_percent DECIMAL(5,2),
  natures_of_control TEXT[],
  notified_on DATE,
  ceased_on DATE,
  source_id UUID REFERENCES public.data_sources(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pscs_company_id ON public.pscs (company_id);
CREATE INDEX idx_pscs_person_id ON public.pscs (person_id);
CREATE INDEX idx_pscs_ownership ON public.pscs (ownership_percent);

-- =========
-- Relationships & Network Analysis
-- =========
CREATE TYPE company_relation_kind AS ENUM (
  'parent_of', 'subsidiary_of', 'same_registered_address', 
  'shared_officer', 'derived_ownership', 'same_ultimate_parent'
);

CREATE TABLE public.company_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  to_company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  kind company_relation_kind NOT NULL,
  depth INT NOT NULL DEFAULT 1,
  confidence DECIMAL(4,3) NOT NULL DEFAULT 1.0,
  evidence JSONB,
  source_id UUID REFERENCES public.data_sources(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (from_company_id, to_company_id, kind, depth)
);

CREATE INDEX idx_relationships_from_company ON public.company_relationships (from_company_id, kind, depth);
CREATE INDEX idx_relationships_to_company ON public.company_relationships (to_company_id, kind, depth);

-- =========
-- Risk & Compliance
-- =========
CREATE TABLE public.sanctions_hits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('person', 'company')),
  entity_id UUID NOT NULL,
  list_name TEXT NOT NULL DEFAULT 'UK_OFSI',
  matched_name TEXT NOT NULL,
  match_score DECIMAL(4,3) NOT NULL,
  details JSONB,
  source_id UUID REFERENCES public.data_sources(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sanctions_hits_entity ON public.sanctions_hits (entity_type, entity_id);
CREATE INDEX idx_sanctions_hits_score ON public.sanctions_hits (match_score);

-- Charities
CREATE TABLE public.charities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  charity_number CITEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  registration_date DATE,
  activities TEXT,
  source_id UUID REFERENCES public.data_sources(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.trustees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  charity_id UUID NOT NULL REFERENCES public.charities(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES public.persons(id) ON DELETE CASCADE,
  appointed_on DATE,
  resigned_on DATE,
  source_id UUID REFERENCES public.data_sources(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_trustees_person_id ON public.trustees (person_id);
CREATE INDEX idx_trustees_charity_id ON public.trustees (charity_id);

-- Properties
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uprn TEXT,
  address TEXT NOT NULL,
  postcode TEXT,
  property_type TEXT,
  tenure TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.company_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  relation TEXT NOT NULL DEFAULT 'registered_address_match',
  confidence DECIMAL(4,3) NOT NULL DEFAULT 0.8,
  source_id UUID REFERENCES public.data_sources(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (company_id, property_id, relation)
);

-- =========
-- Reports & Monitoring
-- =========
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  report_type TEXT NOT NULL DEFAULT 'compliance',
  content JSONB NOT NULL,
  pdf_url TEXT,
  generated_by UUID NOT NULL REFERENCES auth.users(id),
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reports_org_id ON public.reports (org_id);
CREATE INDEX idx_reports_company_id ON public.reports (company_id);

CREATE TABLE public.watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  frequency TEXT NOT NULL DEFAULT 'weekly',
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, company_id)
);

CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  watchlist_id UUID NOT NULL REFERENCES public.watchlist(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  payload JSONB NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  delivered_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========
-- System Tables
-- =========
CREATE TABLE public.ingest_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind source_kind NOT NULL,
  params JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  error TEXT,
  result JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.api_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  request_body JSONB,
  response_code INT,
  response_time_ms INT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========
-- Views
-- =========
CREATE VIEW public.v_company_intelligence AS
SELECT 
  c.id,
  c.company_number,
  c.name,
  c.status,
  c.incorporation_date,
  c.registered_address,
  (SELECT COUNT(*) FROM public.officers o WHERE o.company_id = c.id AND o.resigned_on IS NULL) as active_officers_count,
  (SELECT COUNT(*) FROM public.pscs p WHERE p.company_id = c.id AND p.ceased_on IS NULL) as active_pscs_count,
  (SELECT COUNT(*) FROM public.sanctions_hits s WHERE s.entity_type = 'company' AND s.entity_id = c.id) as sanctions_hits_count,
  (SELECT COUNT(*) FROM public.company_relationships cr WHERE cr.from_company_id = c.id OR cr.to_company_id = c.id) as relationships_count,
  (SELECT MAX(fetched_at) FROM public.data_sources ds WHERE ds.id = c.source_id) as last_data_refresh
FROM public.companies c;

-- =========
-- Row Level Security
-- =========
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "org_members_read_org" ON public.organizations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.org_id = organizations.id AND p.user_id = auth.uid())
  );

CREATE POLICY "users_read_own_profile" ON public.profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "org_members_access_subscription" ON public.subscriptions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.org_id = subscriptions.org_id AND p.user_id = auth.uid())
  );

CREATE POLICY "org_members_access_reports" ON public.reports
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles p WHERE p.org_id = reports.org_id AND p.user_id = auth.uid())
  );
```

### TypeScript Types and Validation
```typescript
// types/company.ts
import { z } from 'zod'

export const CompanyNumberSchema = z.string().regex(/^[A-Z0-9]{2,8}$/i, 'Invalid company number')

export const CompanyProfileSchema = z.object({
  id: z.string().uuid(),
  company_number: CompanyNumberSchema,
  name: z.string().min(1),
  status: z.string().optional(),
  incorporation_date: z.string().date().optional(),
  dissolution_date: z.string().date().optional(),
  company_type: z.string().optional(),
  jurisdiction: z.string().default('GB'),
  registered_address: z.string().optional(),
  lei: z.string().optional(),
  sic_codes: z.array(z.string()).default([]),
})

export const OfficerSchema = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  person_id: z.string().uuid(),
  role: z.enum(['director', 'secretary', 'corporate-director', 'corporate-secretary']),
  appointed_on: z.string().date().optional(),
  resigned_on: z.string().date().optional(),
})

export const PSCSchema = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  person_id: z.string().uuid().optional(),
  psc_kind: z.enum(['individual', 'legal-person', 'trust', 'corporate-entity']),
  ownership_percent: z.number().min(0).max(100).optional(),
  natures_of_control: z.array(z.string()).default([]),
})

export const SearchRequestSchema = z.object({
  query: z.string().min(1),
  type: z.enum(['company_number', 'company_name', 'officer_name']).default('company_name'),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
})

export const ReportGenerationSchema = z.object({
  company_id: z.string().uuid(),
  report_type: z.enum(['compliance', 'due_diligence', 'ownership', 'risk_assessment']).default('compliance'),
  include_officers: z.boolean().default(true),
  include_pscs: z.boolean().default(true),
  include_relationships: z.boolean().default(true),
  include_risk_analysis: z.boolean().default(true),
  max_depth: z.number().int().min(1).max(5).default(3),
})

export type CompanyProfile = z.infer<typeof CompanyProfileSchema>
export type Officer = z.infer<typeof OfficerSchema>
export type PSC = z.infer<typeof PSCSchema>
export type SearchRequest = z.infer<typeof SearchRequestSchema>
export type ReportGeneration = z.infer<typeof ReportGenerationSchema>
```

### Task List for Implementation

```yaml
# Phase 1: Foundation (Week 1)
Task 1.1: Project Setup and Configuration
  - Initialize Next.js 14+ project with TypeScript
  - Configure Tailwind CSS and Shadcn/ui
  - Setup ESLint, Prettier, and Husky
  - Configure environment variables and validation

Task 1.2: Database and Authentication Setup  
  - Create Supabase project and configure local development
  - Run database migrations for core schema
  - Setup authentication with email/Google/Microsoft
  - Implement protected route middleware

Task 1.3: Core UI Components
  - Build auth forms (signin/signup)
  - Create layout components (header, sidebar, footer)
  - Setup error boundaries and loading states
  - Implement theme switching and responsive design

# Phase 2: Company Search Engine (Week 2)
Task 2.1: Companies House API Integration
  - Implement API client with rate limiting
  - Create company search functionality
  - Build officers and PSCs data fetching
  - Add caching layer with Supabase

Task 2.2: Search Interface
  - Build company search form with validation
  - Implement real-time search suggestions
  - Create results display with pagination
  - Add company profile pages

Task 2.3: Data Management
  - Implement data caching and sync strategies
  - Add incremental update mechanisms
  - Create data deduplication logic
  - Setup background job processing

# Phase 3: Relationship Mapping (Week 3)
Task 3.1: External Data Sources
  - Integrate GLEIF API for LEI data
  - Process UK Sanctions list
  - Connect Charity Commission API
  - Setup Land Registry data pipeline

Task 3.2: Entity Resolution Engine
  - Implement name matching algorithms
  - Build address normalization service
  - Create date of birth correlation
  - Add confidence scoring system

Task 3.3: Graph Database Implementation
  - Setup Neo4j and relationship modeling
  - Build ownership tree construction
  - Implement circular reference detection
  - Add performance optimization indexes

# Phase 4: Risk Analysis & Visualization (Week 4)
Task 4.1: Risk Detection Engine
  - Implement sanctions screening
  - Build shell company identification
  - Create unusual pattern detection
  - Add property connection analysis

Task 4.2: Interactive Visualizations
  - Build ownership graph component
  - Create risk indicator dashboards
  - Implement geographic mapping
  - Add timeline visualization

Task 4.3: Report Generation System
  - Create PDF compliance reports
  - Build executive summary templates
  - Implement evidence documentation
  - Add export capabilities (CSV, JSON)

# Phase 5: Business Features (Week 5)
Task 5.1: Subscription and Billing
  - Integrate Stripe payment processing
  - Implement subscription tier management
  - Build usage tracking and limits
  - Create upgrade/downgrade flows

Task 5.2: Monitoring and Alerts
  - Build watchlist management
  - Implement change detection algorithms
  - Create email notification system
  - Setup real-time alert delivery

Task 5.3: API and Integration
  - Build RESTful API for Pro users
  - Implement rate limiting per tier
  - Create API key management
  - Setup webhook notifications

# Phase 6: Testing and Deployment (Week 6)
Task 6.1: Comprehensive Testing
  - Unit tests for all services and utilities
  - Integration tests for API endpoints
  - E2E tests for critical user journeys
  - Performance and load testing

Task 6.2: Production Deployment
  - Setup production Supabase environment
  - Configure CI/CD pipeline
  - Implement monitoring and logging
  - Setup error tracking and analytics

Task 6.3: Documentation and Training
  - Create API documentation
  - Write user guides and tutorials
  - Setup admin dashboard
  - Prepare go-live checklist
```

### Per-Task Pseudocode

**Task 1.1: Project Setup and Configuration**
```bash
# Initialize Next.js project
npx create-next-app@latest nexus-ai --typescript --tailwind --eslint --app --src-dir

# Install core dependencies
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
pnpm add zod @hookform/resolvers react-hook-form
pnpm add @radix-ui/react-* class-variance-authority clsx tailwind-merge
pnpm add lucide-react @tanstack/react-query zustand

# Install dev dependencies
pnpm add -D @types/node vitest @testing-library/react @testing-library/jest-dom
pnpm add -D playwright @playwright/test
pnpm add -D prettier prettier-plugin-tailwindcss

# Configure environment validation
echo "NEXT_PUBLIC_SUPABASE_URL=" >> .env.example
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=" >> .env.example
echo "SUPABASE_SERVICE_ROLE_KEY=" >> .env.example
echo "COMPANIES_HOUSE_API_KEY=" >> .env.example
echo "STRIPE_SECRET_KEY=" >> .env.example
```

**Task 2.1: Companies House API Integration**
```typescript
// lib/services/companies-house.ts
import { z } from 'zod'

const COMPANIES_HOUSE_BASE_URL = 'https://api.company-information.service.gov.uk'

export class CompaniesHouseService {
  private apiKey: string
  private rateLimiter: RateLimiter

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.rateLimiter = new RateLimiter({ requests: 600, window: 300000 }) // 600 per 5min
  }

  async searchCompanies(query: string, itemsPerPage = 20): Promise<CompanySearchResult[]> {
    await this.rateLimiter.acquire()
    
    const url = `${COMPANIES_HOUSE_BASE_URL}/search/companies`
    const params = new URLSearchParams({
      q: query,
      items_per_page: itemsPerPage.toString(),
    })

    const response = await fetch(`${url}?${params}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
      },
    })

    if (!response.ok) {
      throw new CompaniesHouseError(`Search failed: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    return data.items?.map(this.mapCompanySearchResult) || []
  }

  async getCompanyProfile(companyNumber: string): Promise<CompanyProfile> {
    await this.rateLimiter.acquire()
    
    const url = `${COMPANIES_HOUSE_BASE_URL}/company/${companyNumber}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new CompaniesHouseError('Company not found', 404)
      }
      throw new CompaniesHouseError(`Failed to fetch company: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    return this.mapCompanyProfile(data)
  }

  async getOfficers(companyNumber: string): Promise<Officer[]> {
    await this.rateLimiter.acquire()
    
    const url = `${COMPANIES_HOUSE_BASE_URL}/company/${companyNumber}/officers`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
      },
    })

    if (!response.ok) {
      throw new CompaniesHouseError(`Failed to fetch officers: ${response.statusText}`, response.status)
    }

    const data = await response.json()
    return data.items?.map(this.mapOfficer) || []
  }

  private mapCompanyProfile(data: any): CompanyProfile {
    return {
      id: crypto.randomUUID(),
      company_number: data.company_number,
      name: data.company_name,
      status: data.company_status,
      incorporation_date: data.date_of_creation,
      dissolution_date: data.date_of_dissolution,
      company_type: data.type,
      jurisdiction: data.jurisdiction || 'GB',
      registered_address: this.formatAddress(data.registered_office_address),
      sic_codes: data.sic_codes || [],
    }
  }

  private formatAddress(address: any): string {
    if (!address) return ''
    
    const parts = [
      address.premises,
      address.address_line_1,
      address.address_line_2,
      address.locality,
      address.region,
      address.postal_code,
      address.country,
    ].filter(Boolean)
    
    return parts.join(', ')
  }
}

class CompaniesHouseError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message)
    this.name = 'CompaniesHouseError'
  }
}

class RateLimiter {
  private requests: number[] = []
  
  constructor(private config: { requests: number; window: number }) {}
  
  async acquire(): Promise<void> {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.config.window)
    
    if (this.requests.length >= this.config.requests) {
      const oldestRequest = Math.min(...this.requests)
      const waitTime = this.config.window - (now - oldestRequest)
      
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime))
        return this.acquire()
      }
    }
    
    this.requests.push(now)
  }
}
```

**Task 4.3: Report Generation System**
```typescript
// lib/utils/pdf-generator.ts
import puppeteer from 'puppeteer'
import { CompanyProfile, Officer, PSC, RiskAnalysis } from '@/types'

export interface ReportData {
  company: CompanyProfile
  officers: Officer[]
  pscs: PSC[]
  relationships: CompanyRelationship[]
  riskAnalysis: RiskAnalysis
  metadata: {
    generatedAt: Date
    generatedBy: string
    reportType: string
  }
}

export class PDFGenerator {
  async generateComplianceReport(data: ReportData): Promise<Buffer> {
    const html = this.buildReportHTML(data)
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    
    try {
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'networkidle0' })
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '1in',
          right: '0.5in',
          bottom: '1in',
          left: '0.5in',
        },
        displayHeaderFooter: true,
        headerTemplate: this.getHeaderTemplate(data),
        footerTemplate: this.getFooterTemplate(),
      })
      
      return pdf
    } finally {
      await browser.close()
    }
  }

  private buildReportHTML(data: ReportData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Company Intelligence Report - ${data.company.name}</title>
          <style>${this.getReportCSS()}</style>
        </head>
        <body>
          ${this.buildExecutiveSummary(data)}
          ${this.buildCompanyOverview(data)}
          ${this.buildOwnershipStructure(data)}
          ${this.buildRiskAssessment(data)}
          ${this.buildAppendices(data)}
        </body>
      </html>
    `
  }

  private buildExecutiveSummary(data: ReportData): string {
    const { company, riskAnalysis } = data
    
    return `
      <section class="executive-summary">
        <h1>Executive Summary</h1>
        <div class="company-header">
          <h2>${company.name}</h2>
          <p class="company-number">Company Number: ${company.company_number}</p>
          <p class="company-status status-${company.status?.toLowerCase()}">${company.status}</p>
        </div>
        
        <div class="key-findings">
          <h3>Key Findings</h3>
          <div class="risk-score ${this.getRiskScoreClass(riskAnalysis.overallScore)}">
            <span class="score">${riskAnalysis.overallScore}</span>
            <span class="label">${this.getRiskScoreLabel(riskAnalysis.overallScore)}</span>
          </div>
          
          <ul class="findings-list">
            ${riskAnalysis.findings.map(finding => `
              <li class="finding ${finding.severity}">
                <strong>${finding.title}</strong>
                <p>${finding.description}</p>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div class="recommendations">
          <h3>Recommendations</h3>
          <ul>
            ${riskAnalysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
      </section>
    `
  }

  private buildOwnershipStructure(data: ReportData): string {
    return `
      <section class="ownership-structure">
        <h2>Ownership Structure</h2>
        
        <div class="officers-section">
          <h3>Officers</h3>
          <table class="officers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Appointed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${data.officers.map(officer => `
                <tr>
                  <td>${officer.person?.full_name || 'N/A'}</td>
                  <td>${officer.role}</td>
                  <td>${officer.appointed_on || 'N/A'}</td>
                  <td>${officer.resigned_on ? 'Resigned' : 'Active'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="pscs-section">
          <h3>Persons with Significant Control</h3>
          <table class="pscs-table">
            <thead>
              <tr>
                <th>Name/Entity</th>
                <th>Type</th>
                <th>Ownership %</th>
                <th>Nature of Control</th>
              </tr>
            </thead>
            <tbody>
              ${data.pscs.map(psc => `
                <tr>
                  <td>${psc.person?.full_name || 'Corporate Entity'}</td>
                  <td>${psc.psc_kind}</td>
                  <td>${psc.ownership_percent || 'N/A'}%</td>
                  <td>${psc.natures_of_control?.join(', ') || 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `
  }

  private getReportCSS(): string {
    return `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 210mm;
        margin: 0 auto;
        padding: 0;
      }
      
      .executive-summary {
        page-break-after: always;
        padding: 20px 0;
      }
      
      .company-header {
        border-bottom: 2px solid #2563eb;
        padding-bottom: 15px;
        margin-bottom: 30px;
      }
      
      .company-header h2 {
        margin: 0;
        color: #1e40af;
        font-size: 28px;
      }
      
      .company-number {
        font-weight: 600;
        color: #6b7280;
        margin: 5px 0;
      }
      
      .status-active { color: #059669; }
      .status-dissolved { color: #dc2626; }
      .status-liquidation { color: #d97706; }
      
      .risk-score {
        display: inline-flex;
        align-items: center;
        padding: 15px 20px;
        border-radius: 8px;
        margin: 20px 0;
        font-weight: bold;
      }
      
      .risk-score.low { background-color: #dcfce7; color: #166534; }
      .risk-score.medium { background-color: #fef3c7; color: #92400e; }
      .risk-score.high { background-color: #fee2e2; color: #991b1b; }
      
      .risk-score .score {
        font-size: 24px;
        margin-right: 10px;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      
      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
      }
      
      th {
        background-color: #f9fafb;
        font-weight: 600;
        color: #374151;
      }
      
      .finding.high { color: #dc2626; }
      .finding.medium { color: #d97706; }
      .finding.low { color: #059669; }
      
      @media print {
        body { margin: 0; }
        .page-break { page-break-before: always; }
      }
    `
  }

  private getRiskScoreClass(score: number): string {
    if (score >= 70) return 'high'
    if (score >= 40) return 'medium'
    return 'low'
  }

  private getRiskScoreLabel(score: number): string {
    if (score >= 70) return 'High Risk'
    if (score >= 40) return 'Medium Risk'
    return 'Low Risk'
  }
}
```

## Final Validation Checklist

### Core Quality Standards
- [ ] **All tests pass** – `pnpm test`
- [ ] **No linting errors** – `pnpm lint`
- [ ] **No type errors** – `pnpm type-check`
- [ ] **Build succeeds** – `pnpm build`

### Functionality Verification
- [ ] User authentication (email, Google, Microsoft) works
- [ ] Company search returns accurate results from Companies House
- [ ] Multi-level ownership mapping displays correctly
- [ ] Risk detection identifies sanctions and unusual patterns
- [ ] PDF report generation produces compliant documents
- [ ] Subscription limits are properly enforced
- [ ] Real-time monitoring and alerts function correctly

### Security & Performance
- [ ] All API keys stored securely in environment variables
- [ ] Row Level Security policies protect user data
- [ ] Rate limiting prevents API abuse
- [ ] Input validation prevents injection attacks
- [ ] HTTPS enforced in production
- [ ] Database queries optimized with proper indexes
- [ ] Image optimization and lazy loading implemented

### Production Readiness
- [ ] Environment variables documented in .env.example
- [ ] Database migrations run successfully
- [ ] Error monitoring configured (Sentry)
- [ ] Analytics tracking implemented
- [ ] Backup and disaster recovery procedures documented
- [ ] Performance monitoring setup (Web Vitals)

### Documentation & Training
- [ ] API documentation complete and accurate
- [ ] User guide covers all major features
- [ ] Admin dashboard provides necessary controls
- [ ] Deployment guide verified
- [ ] Troubleshooting documentation available

## Anti-Patterns to Avoid
- ❌ **Don't hardcode API keys** – Always use environment variables
- ❌ **Don't skip rate limiting** – Respect external API limits  
- ❌ **Don't ignore data validation** – Validate all inputs with Zod
- ❌ **Don't bypass RLS policies** – Use service role sparingly
- ❌ **Don't store sensitive data in logs** – Sanitize all log outputs
- ❌ **Don't skip error handling** – Handle all API failures gracefully
- ❌ **Don't create circular dependencies** – Keep module imports clean
- ❌ **Don't skip database indexes** – Optimize all frequent queries

---

This PRP provides a comprehensive roadmap for building Nexus AI as a production-ready company intelligence platform. The implementation follows Next.js 14+ best practices, implements robust security measures, and provides a scalable foundation for growth.