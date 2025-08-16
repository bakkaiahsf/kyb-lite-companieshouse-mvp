# Nexus AI Project Overview

## Purpose
Nexus AI is an AI-powered company intelligence platform designed for uncovering ownership structures and risk analysis. It provides compliance and due diligence capabilities for businesses.

## Tech Stack
- **Frontend Framework**: Next.js 15.4.6 with React 19
- **Language**: TypeScript with strict configuration
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **Authentication**: NextAuth.js v4 with Supabase adapter
- **Styling**: TailwindCSS v4 with PostCSS
- **State Management**: Zustand for client state
- **Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Validation**: Zod for schema validation
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Linting**: ESLint with Next.js configuration
- **Code Formatting**: Prettier with Tailwind plugin

## External Services
- **Companies House API**: For UK company data
- **Stripe**: Payment processing and subscriptions
- **Google OAuth**: Authentication provider
- **Resend**: Email service
- **Analytics**: Google Analytics, Mixpanel (optional)
- **Monitoring**: Sentry (optional)
- **Rate Limiting**: Redis/Upstash (optional)

## Key Features
- Company intelligence and risk analysis
- Ownership structure visualization
- Compliance monitoring
- Due diligence reporting
- Subscription-based pricing (Beginner/Pro tiers)