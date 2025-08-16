# Code Structure

## Directory Layout
```
companyhouseai/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (auth)/            # Auth route group
│   │   ├── (dashboard)/       # Dashboard route group
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── billing/           # Payment/subscription components
│   │   ├── charts/            # Data visualization
│   │   ├── company/           # Company-related components
│   │   ├── layout/            # Layout components
│   │   ├── monitoring/        # Monitoring/analytics
│   │   ├── reports/           # Report generation
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   │   ├── auth/              # Authentication configuration
│   │   ├── supabase/          # Database clients
│   │   ├── services/          # External service integrations
│   │   └── utils/             # General utilities
│   ├── stores/                # Zustand state stores
│   ├── styles/                # Global styles
│   └── types/                 # TypeScript type definitions
├── supabase/                  # Database schema and migrations
├── tests/                     # Test files
└── config files               # Various configuration files
```

## Key Configuration Files
- `next.config.js`: Next.js configuration with CORS, image domains
- `tsconfig.json`: TypeScript configuration with path aliases
- `tailwind.config.js`: TailwindCSS configuration
- `vitest.config.ts`: Testing configuration
- `.eslintrc.json`: Linting rules