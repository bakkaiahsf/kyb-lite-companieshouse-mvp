# Code Style and Conventions

## TypeScript Configuration
- **Target**: ES2022 with DOM libraries
- **Strict Mode**: Enabled with `forceConsistentCasingInFileNames`
- **Module System**: ESNext with bundler resolution
- **Path Aliases**: Configured for clean imports
  - `@/*` → `./src/*`
  - `@/components/*` → `./src/components/*`
  - `@/lib/*` → `./src/lib/*`
  - etc.

## ESLint Rules
- Extends Next.js core web vitals and TypeScript configs
- **Enforced Rules**:
  - `prefer-const`: Error level
  - `no-var`: Error level  
  - `@typescript-eslint/no-unused-vars`: Error level
  - `@typescript-eslint/no-explicit-any`: Warning level
- **Disabled Rules**:
  - `react/no-unescaped-entities`: Off
  - `react/display-name`: Off

## Code Organization
- **Components**: Organized by domain (auth, billing, company, etc.)
- **Lib Functions**: Separated by concern (auth, supabase, services)
- **Types**: Centralized in `/types` directory
- **Styles**: Global styles in `/styles` with TailwindCSS

## Naming Conventions
- **Files**: kebab-case for components, camelCase for utilities
- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

## Environment Variable Validation
- All environment variables validated using Zod schemas
- Clear error messages for missing/invalid configurations
- Separation of public vs private environment variables