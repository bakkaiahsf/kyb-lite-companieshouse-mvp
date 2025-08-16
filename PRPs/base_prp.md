name: "Base PRP Template v2 - Context-Rich with Validation Loops"
description: |

## Purpose
Template optimized for AI agents to implement features with sufficient context and self-validation capabilities to achieve working code through iterative refinement.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
Nexus AI will be the fastest, easiest, and most reliable way to uncover a company’s real owners, hidden links, and risk flags — all from official UK and global data sources — in seconds, without the user needing to manually search multiple government websites.
It will work for law firms, accountants, banks, compliance officers, investigative journalists, and SMEs who need quick, regulator-ready due diligence reports.

Zero-friction onboarding – Free sign-up with instant company search.

One-click report generation – No manual data downloads.

Multi-level ownership mapping – See 3+ layers deep instantly.

Risk flagging – Automatic sanctions, charity, and property checks.

Scalable subscription model – Upgrade path from free to Pro.

Logical Usage Flow

Step 0 – Sign-up

User chooses Free, Beginner, or Pro tier.

Email/password or Google/Microsoft login.

Step 1 – Search

User enters a company number or name.

Nexus AI calls Companies House API and fetches base profile.

Step 2 – Deep Linking

AI cross-references GLEIF, UK Sanctions, Charity Commission, Land Registry.

Ownership tree up to 3 levels deep is built.

Step 3 – Risk Detection

AI flags:

Directors on sanctions list

Multiple companies at same address

Offshore parents via LEI records

Charity trusteeships

Suspicious property ownership patterns

Step 4 – Visual & Report

Interactive Graph view of ownership

PDF Compliance Report with profile, graph, and risk section

Step 5 – Save / Monitor

Beginner/Pro users can save company profiles.

Pro users can set alerts for changes (daily, weekly).

Subscription Tiers
Tier	Monthly Price	Features
Free	£0	- 5 company searches/month
- Basic profile & ownership tree
- No saved searches
- No monitoring
Beginner	£15	- 50 searches/month
- Save companies to dashboard
- PDF reports
- Basic risk alerts
Pro	£50	- Unlimited searches
- Unlimited saved companies
- Automated monitoring & alerts
- Export to CSV/JSON
- API access for integrations

final application goal would be :
Lets you type in a company number.

Pulls in live data from Companies House and other official public records.

Uses AI to link names, companies, and addresses even when they are slightly different.

Builds an interactive visual family tree of ownership and control.

Flags risk alerts like sanctions or suspicious connections.

Generates a PDF compliance report you can send straight to regulators or clients.

## Why
Right now, finding out who really controls a company is slow, manual, and risky:

Problem 1: The data is scattered across multiple government websites.

Problem 2: Directors may control companies indirectly through other companies, trusts, or charities — these links are easy to miss.

Problem 3: Compliance officers waste hours downloading and cross-checking filings.

Problem 4: Mistakes or missing a hidden owner can lead to huge fines from the FCA or HMRC.

Nexus AI solves all this by automatically:

Fetching all the relevant official data for you in seconds.

Using AI to detect hidden links up to 3+ levels deep.

Highlighting risky people or companies.

Producing a professional, regulator-ready report in under 5 seconds.

User Type	Needs	Pain Points	Why Nexus AI Helps
Small law/accounting firms	Fast due diligence on clients	No in-house compliance tools	Single dashboard, instant risk report
Compliance officers (FCA/HMRC regulated)	Ongoing monitoring of companies	High manual workload, fines for missing links	AI-driven monitoring & alerts
Investigative journalists	Mapping hidden ownership	Data scattered, manual linking is slow	Visual ownership graph up to 3 levels
SMEs onboarding new partners	Quick KYC checks	Lack of tools, expensive paid services	Free tier covers basic checks

## What
[User-visible behavior and technical requirements]

### Success Criteria
- [ ] [Specific measurable outcomes]

## All Needed Context

### Documentation & References (list all context needed to implement the feature)
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


```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase
```bash

```

### Desired Codebase tree with files to be added and responsibility of file
.
├── backend/
│   ├── server.js               # Express server entry
│   ├── routes/company.js       # Company search API
│   ├── services/
│   │   ├── companiesHouse.js    # CH API wrapper
│   │   ├── gleif.js             # GLEIF API wrapper
│   │   ├── sanctions.js         # UK Sanctions API
│   │   ├── charity.js           # Charity Commission data handler
│   │   ├── landRegistry.js      # UK Land Registry integration
│   │   ├── entityResolver.js    # AI fuzzy matching logic
│   │   ├── graphBuilder.js      # Neo4j graph mapping
│   ├── utils/pdfGenerator.js    # Compliance report generation
├── frontend/
│   ├── pages/index.tsx
│   ├── pages/company/[id].tsx
│   ├── components/GraphView.tsx
│   ├── components/CompanyProfile.tsx
│   ├── lib/api.ts
├── supabase/
│   ├── schema.sql
│   ├── migrations/



```

### Known Gotchas of our codebase & Library Quirks
// Companies House rate limit: 600 requests / 5 min per API key.
// GLEIF API is paginated – handle large datasets carefully.
// Supabase real-time updates require replication enabled.
// Neo4j queries beyond depth=3 can be slow without indexes.
// Name/address variations require fuzzy matching to avoid false negatives.
```

## Implementation Blueprint
Step 0 – Sign-up

User chooses Free, Beginner, or Pro tier.

Email/password or Google/Microsoft login.

Step 1 – Search

User enters a company number or name.

Nexus AI calls Companies House API and fetches base profile.

Step 2 – Deep Linking

AI cross-references GLEIF, UK Sanctions, Charity Commission, Land Registry.

Ownership tree up to 3 levels deep is built.

Step 3 – Risk Detection

AI flags:

Directors on sanctions list

Multiple companies at same address

Offshore parents via LEI records

Charity trusteeships

Suspicious property ownership patterns

Step 4 – Visual & Report

Interactive Graph view of ownership

PDF Compliance Report with profile, graph, and risk section

Step 5 – Save / Monitor

Beginner/Pro users can save company profiles.

Pro users can set alerts for changes (daily, weekly).

Tier	Monthly Price	Features
Free	£0	- 5 company searches/month
- Basic profile & ownership tree
- No saved searches
- No monitoring
Beginner	£15	- 50 searches/month
- Save companies to dashboard
- PDF reports
- Basic risk alerts
Pro	£50	- Unlimited searches
- Unlimited saved companies
- Automated monitoring & alerts
- Export to CSV/JSON
- API access for integrations
### Data models and structure

Create the core data models, we ensure type safety and consistency.
One schema to run in supabase/migrations/001_init.sql. Uses uuid-ossp/pgcrypto for UUIDs, and citext to normalize case. Keep everything under public unless you prefer a separate nexus schema.

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- =========
-- Tenancy / Identity / Billing
-- =========

-- Supabase auth handles auth.users (id uuid)
-- Store user profile & org membership here
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create type subscription_plan as enum ('free','beginner','pro');

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  org_id uuid references public.organizations(id) on delete set null,
  full_name text,
  role text,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  plan subscription_plan not null default 'free',
  seats int not null default 1,
  renews_at date,
  status text not null default 'active', -- active|past_due|canceled
  created_at timestamptz not null default now()
);

-- Usage limits and metering
create table public.usage_counters (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  searches_count int not null default 0,
  reports_count int not null default 0,
  alerts_sent_count int not null default 0,
  unique (org_id, period_start, period_end)
);

-- =========
-- Data provenance & sources (compliance)
-- =========
create type source_kind as enum ('companies_house','gleif','uk_sanctions','charity_commission','land_registry','derived');

create table public.data_sources (
  id uuid primary key default gen_random_uuid(),
  kind source_kind not null,
  source_ref text,              -- e.g., filing id, LEI, URL
  fetched_at timestamptz not null default now(),
  raw jsonb,                    -- raw payload (optional, size aware)
  hash bytea,                   -- sha256 for dedupe
  unique (kind, source_ref)
);

-- =========
-- Core Business Entities
-- =========
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  company_number citext unique not null,
  name text not null,
  status text,
  incorporation_date date,
  registered_address text,
  jurisdiction text default 'GB',
  lei citext,                   -- optional, from GLEIF
  last_synced_at timestamptz,
  source_id uuid references public.data_sources(id),
  created_at timestamptz not null default now()
);
create index on public.companies (lower(name));
create index on public.companies (lei);

-- People (directors, PSCs, trustees)
create table public.persons (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  date_of_birth date,
  nationality text,
  address text,
  normalized_name text,         -- for dedupe
  created_at timestamptz not null default now()
);
create index on public.persons (normalized_name);

-- Officers (director/secretary)
create table public.officers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  person_id uuid not null references public.persons(id) on delete cascade,
  role text not null,                      -- director, secretary
  appointed_on date,
  resigned_on date,
  source_id uuid references public.data_sources(id),
  created_at timestamptz not null default now()
);
create index on public.officers (company_id);
create index on public.officers (person_id);

-- PSCs (Persons with Significant Control)
create table public.pscs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  person_id uuid references public.persons(id) on delete set null,
  psc_kind text not null,                 -- individual|legal-person|trust
  ownership_percent numeric(5,2),         -- 0..100
  natures_of_control text[],              -- CH natures array
  source_id uuid references public.data_sources(id),
  created_at timestamptz not null default now()
);
create index on public.pscs (company_id);

-- Company<->Company derived relationships (subsidiary, same-address, co-officer links)
create type company_relation_kind as enum ('parent_of','subsidiary_of','same_registered_address','shared_officer','derived_ownership');

create table public.company_relationships (
  id uuid primary key default gen_random_uuid(),
  from_company_id uuid not null references public.companies(id) on delete cascade,
  to_company_id uuid not null references public.companies(id) on delete cascade,
  kind company_relation_kind not null,
  depth int not null default 1,           -- traversal depth (1..N)
  confidence numeric(4,3) not null default 1.0, -- 0..1
  source_id uuid references public.data_sources(id),
  created_at timestamptz not null default now(),
  unique (from_company_id, to_company_id, kind, depth)
);
create index on public.company_relationships (from_company_id, kind, depth);

-- Charity / trustee links (public cross-check)
create table public.charities (
  id uuid primary key default gen_random_uuid(),
  charity_number citext unique not null,
  name text not null,
  address text,
  source_id uuid references public.data_sources(id),
  created_at timestamptz not null default now()
);

create table public.trustees (
  id uuid primary key default gen_random_uuid(),
  charity_id uuid not null references public.charities(id) on delete cascade,
  person_id uuid not null references public.persons(id) on delete cascade,
  appointed_on date,
  resigned_on date,
  source_id uuid references public.data_sources(id),
  created_at timestamptz not null default now()
);
create index on public.trustees (person_id);

-- Sanctions hits
create table public.sanctions_hits (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('person','company')),
  entity_id uuid not null, -- FK polymorphic (validated in app layer)
  list_name text not null default 'UK_OFSI',
  matched_name text not null,
  match_score numeric(4,3) not null,
  source_id uuid references public.data_sources(id),
  created_at timestamptz not null default now()
);
create index on public.sanctions_hits (entity_type, entity_id);

-- Land Registry property linkage (lightweight)
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  uprn text,                   -- unique property reference number (if available)
  address text not null,
  created_at timestamptz not null default now()
);

create table public.company_properties (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  relation text not null default 'registered_address_match', -- future: title_owner
  confidence numeric(4,3) not null default 0.8,
  source_id uuid references public.data_sources(id),
  created_at timestamptz not null default now(),
  unique (company_id, property_id, relation)
);

-- Monitoring & alerts
create table public.watchlist (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  created_by uuid not null references auth.users(id),
  frequency text not null default 'weekly', -- daily|weekly
  created_at timestamptz not null default now(),
  unique (org_id, company_id)
);

create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  watchlist_id uuid not null references public.watchlist(id) on delete cascade,
  kind text not null, -- officer_change|psc_change|filing|sanctions_hit
  payload jsonb not null,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

-- Reports (store metadata, not binaries unless needed)
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  title text not null,
  storage_path text not null,         -- points to Supabase Storage
  generated_by uuid not null references auth.users(id),
  generated_at timestamptz not null default now()
);

-- Ingest jobs & audit logs
create table public.ingest_jobs (
  id uuid primary key default gen_random_uuid(),
  kind source_kind not null,
  params jsonb not null,
  status text not null default 'queued', -- queued|running|failed|done
  started_at timestamptz,
  finished_at timestamptz,
  error text
);

create table public.api_audit_log (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  route text not null,
  request jsonb,
  response_code int,
  took_ms int,
  created_at timestamptz not null default now()
);

-- Helpful views
create view public.v_company_health as
select
  c.id as company_id,
  c.company_number,
  c.name,
  (select count(*) from public.officers o where o.company_id=c.id) as officers_count,
  (select count(*) from public.pscs p where p.company_id=c.id) as psc_count,
  (select count(*) from public.sanctions_hits s where s.entity_type='company' and s.entity_id=c.id) as sanctions_hits
from public.companies c;

-- (Optional) RLS scaffolding (enable and add policies per table as needed)
-- alter table public.companies enable row level security;
-- create policy "org can read its companies" on public.companies
--   for select using (true); -- tighten with org scoping if you shard by org

```

### list of tasks to be completed to fullfill the PRP in the order they should be completed

```yaml
Task 1:
MODIFY src/existing_module.py:
  - FIND pattern: "class OldImplementation"
  - INJECT after line containing "def __init__"
  - PRESERVE existing method signatures

CREATE src/new_feature.py:
  - MIRROR pattern from: src/similar_feature.py
  - MODIFY class name and core logic
  - KEEP error handling pattern identical

For deep, fast relationship queries (multi-level). Keep the graph derived from Postgres (rebuildable).

Node Labels

Company {id, companyNumber, name, lei, status}

Person {id, fullName, dob, nationality, normalizedName}

Charity {id, charityNumber, name}

Address {id, text}

Property {id, uprn, address}

Filing {id, kind, filedAt} (optional)

Sanction {id, listName} (optional for quick joins)

Relationships

(:Person)-[:OFFICER_OF {role, appointedOn, resignedOn, sourceId}]->(:Company)

(:Person)-[:PSC_OF {percent, natures, sourceId}]->(:Company)

(:Company)-[:PARENT_OF {depth, confidence, sourceId}]->(:Company) // or SUBSIDIARY_OF inverse

(:Company)-[:REGISTERED_AT]->(:Address)

(:Company)-[:OWNS_PROPERTY {confidence, sourceId}]->(:Property)

(:Person)-[:TRUSTEE_OF {appointedOn, resignedOn, sourceId}]->(:Charity)

(:Company)-[:DERIVED_REL {kind, depth, confidence}]->(:Company) // e.g., shared_officer, same_address

(:Person|:Company)-[:SANCTIONED_AS {matchScore, listName}]->(:Sanction)

(:Person)-[:SAME_AS {confidence}]->(:Person) // entity resolution links

Indexes (Cypher)

CREATE INDEX company_by_number IF NOT EXISTS FOR (c:Company) ON (c.companyNumber);
CREATE INDEX person_by_name_norm IF NOT EXISTS FOR (p:Person) ON (p.normalizedName);
CREATE INDEX charity_by_number IF NOT EXISTS FOR (ch:Charity) ON (ch.charityNumber);

Put in backend/domain/schemas.ts. Generate types from Zod for strict API contracts.

import { z } from "zod";

export const CompanyNumber = z.string().regex(/^[A-Z0-9]{2,8}$/i, "Invalid company number");

export const CompanyProfile = z.object({
  id: z.string().uuid(),
  companyNumber: CompanyNumber,
  name: z.string().min(2),
  status: z.string().optional(),
  incorporationDate: z.string().date().or(z.string().optional()),
  registeredAddress: z.string().optional(),
  jurisdiction: z.string().default("GB"),
  lei: z.string().optional(),
});
export type CompanyProfile = z.infer<typeof CompanyProfile>;

export const Person = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(2),
  dateOfBirth: z.string().date().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
});
export type Person = z.infer<typeof Person>;

export const Officer = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  personId: z.string().uuid(),
  role: z.enum(["director","secretary"]),
  appointedOn: z.string().date().optional(),
  resignedOn: z.string().date().optional(),
});
export type Officer = z.infer<typeof Officer>;

export const PSC = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  personId: z.string().uuid().optional(),
  pscKind: z.enum(["individual","legal-person","trust"]),
  ownershipPercent: z.number().min(0).max(100).optional(),
  naturesOfControl: z.array(z.string()).default([]),
});
export type PSC = z.infer<typeof PSC>;

export const Relationship = z.object({
  fromCompanyId: z.string().uuid(),
  toCompanyId: z.string().uuid(),
  kind: z.enum(["parent_of","subsidiary_of","same_registered_address","shared_officer","derived_ownership"]),
  depth: z.number().int().min(1),
  confidence: z.number().min(0).max(1),
});
export type Relationship = z.infer<typeof Relationship>;

export const SearchRequest = z.object({
  companyNumber: CompanyNumber
}).or(z.object({ query: z.string().min(2) })); // fallback name search

export const SearchResponse = z.object({
  profile: CompanyProfile,
  officers: z.array(Officer),
  pscs: z.array(PSC),
  graph: z.object({
    nodes: z.array(z.any()),
    edges: z.array(z.any())
  }),
  risk: z.object({
    sanctionsHits: z.array(z.object({
      entityType: z.enum(["person","company"]),
      entityId: z.string().uuid(),
      listName: z.string(),
      matchScore: z.number()
    })).default([]),
    addressAnomalies: z.array(z.string()).default([]),
    globalParents: z.array(z.string()).default([])
  }),
  reportUrl: z.string().url().optional()
});
export type SearchResponse = z.infer<typeof SearchResponse>;

Consistency helpers (dedupe & lineage)

Minimal columns to keep data clean and explainable.

data_sources on every ingest → attach source_id to dependent rows.

Normalization: persist persons.normalized_name (e.g., lowercase, no punctuation).

Deduplication: compute a stable hash per entity (e.g., sha256(full_name|dob|address) for Person; sha256(company_number) for Company). You can store in Postgres (additional column) or only in Neo4j for SAME_AS edges.

RLS (Row Level Security) patterns

Quick example—tighten as needed.

-- Example: organizations + profiles scoped access
alter table public.organizations enable row level security;
create policy org_read on public.organizations
  for select using (
    exists (select 1 from public.profiles p where p.org_id = organizations.id and p.user_id = auth.uid())
  );

alter table public.watchlist enable row level security;
create policy watchlist_rw on public.watchlist
  for all using (
    exists (
      select 1 from public.profiles p
      where p.org_id = watchlist.org_id and p.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.profiles p
      where p.org_id = watchlist.org_id and p.user_id = auth.uid()
    )
  );

6) Eventing & monitoring (for Pro tier alerts)

ingest_jobs: queue & track sync from Companies House, GLEIF, etc.

alerts: insert on detected changes; deliveries handled by worker (e.g., Supabase Functions / Node worker).

usage_counters: increment in transaction around each search/report; enforce plan limits in the API.

7) Minimal DTOs for API routes (Next.js/Express)

Contracts that map 1:1 to Zod schemas.

POST /api/company/search → SearchRequest → SearchResponse

POST /api/company/monitor → { companyId, frequency } → { watchlistId }

GET /api/company/:id/graph → { nodes, edges }

POST /api/reports/generate → { companyId } → { reportUrl }

GET /api/billing/limits → { plan, searchesUsed, searchesLimit }

8) Indices you’ll actually feel

companies (company_number) unique

companies lower(name) btree

persons (normalized_name) btree

officers (company_id), (person_id)

pscs (company_id)

company_relationships (from_company_id, kind, depth)

sanctions_hits (entity_type, entity_id)

usage_counters (org_id, period_start, period_end) unique

9) What’s left to “perfect” this

Materialized views for common graph summaries (e.g., flattened 3-level ownership for CSV export).

Soft delete pattern if you want to retain history (deleted_at columns).

CDC (change data capture) via Supabase Realtime to push deltas into Neo4j incrementally.

Data retention windows for personal data (GDPR: purge PII beyond necessity).

Plan guardrails: Postgres CHECKs + API middleware to enforce rate/usage limits.

### Per task pseudocode as needed added to each task
Core Data Models — fully detailed for a Next.js + Node.js + Supabase stack

Per-task pseudocode — step-by-step with CRITICAL gotchas

This is written so even the "dumbest" developer (your words 😄) can follow it without missing a single dependency.

Core Data Models (TypeScript / Supabase Schema)

We’ll model users, subscriptions, companies, API reports, and audit logs.
All entities will follow type safety via TypeScript interfaces + Supabase row-level types.

// src/types/db.ts

// User table
export interface User {
  id: string;                // UUID (Supabase Auth user ID)
  email: string;             // User email
  full_name?: string;        // Optional full name
  role: 'free' | 'beginner' | 'pro';
  created_at: string;
  updated_at: string;
}

// Subscription plans
export interface Subscription {
  id: string;               // UUID
  user_id: string;          // FK -> User.id
  plan: 'free' | 'beginner' | 'pro';
  status: 'active' | 'cancelled' | 'expired';
  start_date: string;
  end_date?: string;
}

// Company profile (from Companies House, GLEIF, etc.)
export interface CompanyProfile {
  id: string;               // UUID
  source: 'companies_house' | 'gleif' | 'sanctions' | 'charity_commission' | 'land_registry';
  external_id: string;      // Company number, LEI, etc.
  name: string;
  registered_address: string;
  status: string;           // Active, dissolved, etc.
  incorporation_date?: string;
  last_updated: string;
  meta_json: Record<string, any>; // Raw API response for debugging
}

// Report table (aggregated data from multiple APIs)
export interface Report {
  id: string;
  user_id: string;           // FK -> User.id
  company_id: string;        // FK -> CompanyProfile.id
  report_json: Record<string, any>;
  generated_at: string;
}

// Audit logs
export interface AuditLog {
  id: string;
  user_id: string;           // FK -> User.id
  action: string;            // 'search_company', 'view_report', 'export_pdf'
  target_id?: string;        // Company or report ID
  timestamp: string;
  metadata: Record<string, any>;
}

Per Task Pseudocode with CRITICAL details
Task 1: Implement Supabase Database Schema
// CRITICAL: Enable Row Level Security (RLS) in Supabase
// All queries must use the authenticated user's JWT to avoid data leaks

-- users table
create table users (
  id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  full_name text,
  role text check (role in ('free','beginner','pro')) default 'free',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- subscription table
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  plan text check (plan in ('free','beginner','pro')),
  status text check (status in ('active','cancelled','expired')) default 'active',
  start_date timestamptz default now(),
  end_date timestamptz
);

-- company_profile table
create table company_profiles (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  external_id text not null,
  name text not null,
  registered_address text,
  status text,
  incorporation_date date,
  last_updated timestamptz,
  meta_json jsonb
);

-- report table
create table reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  company_id uuid references company_profiles(id) on delete cascade,
  report_json jsonb,
  generated_at timestamptz default now()
);

-- audit_logs table
create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  action text,
  target_id uuid,
  timestamp timestamptz default now(),
  metadata jsonb
);

Task 2: API Integration Layer (Companies House, GLEIF, Sanctions, Charity Commission, Land Registry)
// src/services/companyApis.ts
// CRITICAL: Use node-fetch or axios with retries & rate limiting

async function fetchCompaniesHouse(companyNumber: string) {
  validateCompanyNumber(companyNumber); // throws error if invalid

  const url = `https://api.company-information.service.gov.uk/company/${companyNumber}`;
  const headers = {
    Authorization: `Basic ${Buffer.from(process.env.COMPANIES_HOUSE_API_KEY + ':').toString('base64')}`
  };

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`CH API error ${res.status}`);
    return await res.json();
  } catch (err) {
    logError('companies_house', err);
    throw err;
  }
}


Gotchas:

Companies House API has 600 requests/5 min limit per API key.

GLEIF LEI API is free but requires correct filtering (?filter[lei]=...).

UK Sanctions list is downloaded as CSV, must parse & cache locally.

Land Registry APIs require API key from data.gov.uk, free but needs registration.

Task 3: Report Aggregator
// src/services/reportAggregator.ts

async function generateReport(companyNumber: string, userId: string) {
  // 1. Fetch data from all APIs in parallel
  const [chData, gleifData, sanctionsData, charityData, landData] = await Promise.allSettled([
    fetchCompaniesHouse(companyNumber),
    fetchGLEIF(companyNumber),
    fetchSanctions(companyNumber),
    fetchCharityCommission(companyNumber),
    fetchLandRegistry(companyNumber)
  ]);

  // 2. Merge into single JSON
  const report = {
    companies_house: chData.status === 'fulfilled' ? chData.value : null,
    gleif: gleifData.status === 'fulfilled' ? gleifData.value : null,
    sanctions: sanctionsData.status === 'fulfilled' ? sanctionsData.value : null,
    charity_commission: charityData.status === 'fulfilled' ? charityData.value : null,
    land_registry: landData.status === 'fulfilled' ? landData.value : null,
    generated_at: new Date().toISOString()
  };

  // 3. Save to Supabase
  await supabase.from('reports').insert({ user_id: userId, report_json: report });

  return report;
}

Task 4: Subscription-based Access Control
// src/middleware/checkSubscription.ts
export async function checkAccess(userId: string, feature: string) {
  const { data: sub } = await supabase.from('subscriptions')
    .select('*').eq('user_id', userId).single();

  if (!sub || sub.status !== 'active') throw new Error('No active subscription');

  // Example: limit API calls for free tier
  if (sub.plan === 'free' && feature === 'report' && exceededFreeTierLimit(userId)) {
    throw new Error('Free tier limit exceeded');
  }
}


Gotchas:

Free tier → Max 10 company searches/month

Beginner → Max 100 searches/month + CSV export

Pro → Unlimited + PDF reports + API access

Integration Points
DATABASE:
  - migration: "Add column 'feature_enabled' to users table"
  - migration_command: "ALTER TABLE users ADD COLUMN feature_enabled BOOLEAN DEFAULT true;"
  - index: "CREATE INDEX idx_feature_lookup ON users(role, feature_enabled);"

CONFIG:
  - add_to: config/settings.ts
  - pattern_1: "export const FEATURE_TIMEOUT = Number(process.env.FEATURE_TIMEOUT ?? '30');"
  - pattern_2: "export const FREE_TIER_LIMIT = Number(process.env.FREE_TIER_LIMIT ?? '10');"
  - validation_loop: |
      if (FEATURE_TIMEOUT < 5 || FEATURE_TIMEOUT > 300) {
        throw new Error('FEATURE_TIMEOUT must be between 5 and 300 seconds');
      }

ROUTES:
  - add_to: src/api/routes/index.ts
  - pattern: "router.use('/feature', featureRouter);"
  - ensure_import: "import { featureRouter } from './feature';"

Level 2: Unit Tests (Next.js + Supabase)

We follow Jest for backend logic and React Testing Library for Next.js components.
Naming convention: __tests__/<file>.test.ts

Database layer (Supabase queries)

fetchCompaniesHouse()

✅ Should return valid JSON for a known company number

❌ Should throw error for invalid company number

insertReport()

✅ Should store report with correct user_id and company_id

❌ Should reject if required fields missing

Business logic

generateReport()

✅ Should merge API responses into correct structure

✅ Should insert into reports table

❌ Should handle partial API failure gracefully

Middleware

checkAccess()

✅ Allows user with active subscription

❌ Blocks free user exceeding tier limit

Frontend components

CompanySearchForm

✅ Renders input and submit button

✅ Calls onSubmit with correct company number

❌ Shows error message for invalid format

Level 3: Integration Tests

We use Playwright for E2E flow simulation + supertest for API.

E2E Browser Flows
# Run all tests
npx playwright test

# Test: User searches company and sees report
npx playwright test --grep "@search-report"

# Test: Subscription restrictions
npx playwright test --grep "@subscription-limits"


Test cases:

Free Tier — Search 10 times, verify 11th fails with "limit exceeded"

Beginner Tier — Search and export CSV works

Pro Tier — Search and export PDF works, unlimited

API Integration Tests
# Run integration API tests
npx jest --testPathPattern=integration


Tests:

POST /api/reports with valid company number returns merged JSON

GET /api/reports/:id returns correct data for authenticated user

Unauthorized user gets 401

Final Validation Checklist
Database

 All migrations applied successfully in dev/staging

 RLS policies enabled for all user-related tables

 Indexes created for frequently queried columns

Config

 .env.example updated with all new variables

 Default values tested for all config entries

API

 All routes covered by unit + integration tests

 Error handling returns consistent JSON format

Frontend

 Forms have validation & user-friendly error messages

 Mobile + desktop layouts tested

Subscriptions

 Limits enforced per tier

 Upgrade/downgrade flow tested

Security

 API keys stored in env vars only

 No sensitive data logged in console

## Final validation Checklist
Final Validation Checklist
Core Quality

 All tests pass – run:

npm run test


 No linting errors – run:

npm run lint


 No type errors – run:

npm run type-check


 Manual test successful – verify end-to-end search flow:

curl -X POST https://api.nexusai.co/api/reports \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"companyNumber": "01234567"}'


✅ Should return merged JSON containing company profile, directors, relationships, compliance status

Error Handling

 Invalid company number returns HTTP 400 with {"error":"Invalid company number"}

 API rate limit breach returns HTTP 429 with descriptive message

 Subscription limit exceeded returns HTTP 403 with tier upgrade suggestion

 Partial API failure handled with fallback data and "warning" key in response

Logging

 Informational logs for successful API calls and report generation

 Error logs include stack trace and correlation ID

 No sensitive data (tokens, PII) in logs

Documentation

 API docs updated (/docs/api.md)

 .env.example updated with new variables

 README contains updated quick-start instructions

 Version changelog updated

Security

 API keys stored in .env and not in repo

 Supabase RLS policies tested for all tables

 HTTPS enforced in production

 All third-party dependencies audited:

npm audit

## Anti-Patterns to Avoid
- ❌ Don't create new patterns when existing ones work
- ❌ Don't skip validation because "it should work"  
- ❌ Don't ignore failing tests - fix them
- ❌ Don't use sync functions in async context
- ❌ Don't hardcode values that should be config
- ❌ Don't catch all exceptions - be specific