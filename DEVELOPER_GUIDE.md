# Nexus AI - Developer Guide

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher  
- **Git**: Latest version
- **Code Editor**: VS Code recommended with TypeScript extension

### Initial Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/bakkaiahsf/kyb-lite-companieshouse-mvp
   cd companyhouseai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your API keys:
   ```bash
   COMPANIES_HOUSE_API_KEY=your_companies_house_api_key
   OPEN_API_KEY=sk-your_openai_api_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open http://localhost:3000
   - Test company search functionality
   - Verify API integration

### API Key Setup

#### Companies House API Key
1. Visit [Companies House Developer Hub](https://developer.company-information.service.gov.uk/)
2. Register for a developer account
3. Create a new application
4. Copy the API key to your `.env.local`

#### OpenAI API Key  
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account and add billing information
3. Navigate to API keys section
4. Create a new API key
5. Copy to your `.env.local`

## Project Structure

### Directory Overview
```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API route handlers
│   │   ├── search/            # Search page
│   │   ├── api-test/          # API testing interface
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Homepage component
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utility libraries and services
│   └── styles/                # Global CSS styles
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── next.config.js            # Next.js configuration
```

### Key Files and Their Purpose

#### Core Application Files
- **`src/app/layout.tsx`**: Root layout with global HTML structure
- **`src/app/page.tsx`**: Homepage with project overview and navigation
- **`src/app/search/page.tsx`**: Company search interface
- **`src/app/api-test/page.tsx`**: API testing and analysis display

#### API Route Handlers
- **`src/app/api/company/[number]/route.ts`**: Company analysis endpoint
- **`src/app/api/search/route.ts`**: Company search endpoint

#### Service Layer
- **`src/lib/companies-house.ts`**: Companies House API client
- **`src/lib/ai-analysis.ts`**: OpenAI integration for company analysis

#### Components
- **`src/components/CompanySearch.tsx`**: Reusable search component with autocomplete

## Development Workflow

### Code Style and Standards

#### TypeScript Configuration
The project uses strict TypeScript configuration:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

#### ESLint Configuration
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

#### Code Formatting with Prettier
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Development Scripts

#### Available Commands
```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

#### Development Best Practices
1. **Type Safety**: Always use TypeScript interfaces
2. **Error Handling**: Implement comprehensive error boundaries
3. **Performance**: Use React.memo for expensive components
4. **Accessibility**: Include proper ARIA labels and semantic HTML
5. **Testing**: Write tests for critical business logic

## API Development

### Adding New API Routes

#### 1. Create Route Handler
Create a new file in `src/app/api/[route-name]/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ data: 'response' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // POST handler implementation
}
```

#### 2. Add Type Definitions
Define interfaces for request/response types:

```typescript
interface ApiRequest {
  field: string
}

interface ApiResponse {
  data: any
  error?: string
}
```

#### 3. Implement Error Handling
```typescript
try {
  // API logic
} catch (error) {
  console.error('API Error:', error)
  
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
  
  return NextResponse.json(
    { error: 'Unknown error' },
    { status: 500 }
  )
}
```

### External API Integration

#### Companies House API Client Usage
```typescript
import { CompaniesHouseAPI } from '@/lib/companies-house'

const api = new CompaniesHouseAPI()

// Search companies
const searchResults = await api.searchCompanies('apple')

// Get company profile
const company = await api.getCompanyProfile('09422519')

// Get company officers
const officers = await api.getCompanyOfficers('09422519')
```

#### AI Analysis Service Usage
```typescript
import { AIAnalysisService } from '@/lib/ai-analysis'

const aiService = new AIAnalysisService()

// Analyze company
const analysis = await aiService.analyzeCompany(companyProfile)
```

## Frontend Development

### Component Development

#### Creating New Components
1. **Create Component File**
   ```typescript
   // src/components/MyComponent.tsx
   interface MyComponentProps {
     title: string
     onAction?: () => void
   }
   
   export default function MyComponent({ title, onAction }: MyComponentProps) {
     return (
       <div className="bg-white p-4 rounded-lg">
         <h2 className="text-xl font-bold">{title}</h2>
         {onAction && (
           <button onClick={onAction} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
             Action
           </button>
         )}
       </div>
     )
   }
   ```

2. **Use Component**
   ```typescript
   import MyComponent from '@/components/MyComponent'
   
   function Page() {
     return (
       <MyComponent 
         title="Example" 
         onAction={() => console.log('Action clicked')}
       />
     )
   }
   ```

#### State Management Patterns
```typescript
// Local state with useState
const [data, setData] = useState<DataType | null>(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

// Effect for API calls
useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }
  
  fetchData()
}, [dependency])
```

### Styling with Tailwind CSS

#### Common Patterns
```typescript
// Layout classes
<div className="min-h-screen bg-gray-50 py-8">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</div>

// Button styles
<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
  Click me
</button>

// Card components
<div className="bg-white rounded-lg shadow p-6">
  {/* Card content */}
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

#### Custom Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  }
}
```

## Testing

### Unit Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
```

#### Example Component Test
```typescript
// __tests__/components/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

#### API Route Testing
```typescript
// __tests__/api/company.test.ts
import { GET } from '@/app/api/company/[number]/route'
import { NextRequest } from 'next/server'

describe('/api/company/[number]', () => {
  it('returns company data', async () => {
    const request = new NextRequest('http://localhost:3000/api/company/09422519')
    const response = await GET(request, { params: { number: '09422519' } })
    
    expect(response.status).toBe(200)
  })
})
```

### Integration Testing
```typescript
// Test full user workflow
describe('Company Search Flow', () => {
  it('allows user to search and analyze company', async () => {
    // 1. User searches for company
    // 2. Selects company from results
    // 3. Views analysis
    // 4. Verifies correct data displayed
  })
})
```

## Debugging

### Common Issues and Solutions

#### Environment Variables Not Loading
```typescript
// Check if variables are available
console.log('API Key available:', !!process.env.COMPANIES_HOUSE_API_KEY)

// Verify .env.local format (no quotes around values)
COMPANIES_HOUSE_API_KEY=abc123
```

#### API Integration Issues
```typescript
// Add detailed error logging
try {
  const response = await fetch(url, options)
  console.log('Response status:', response.status)
  console.log('Response headers:', response.headers)
} catch (error) {
  console.error('Fetch error:', error)
}
```

#### TypeScript Compilation Errors
```bash
# Run type checking to see all errors
npm run type-check

# Check specific file
npx tsc --noEmit src/components/MyComponent.tsx
```

### Development Tools

#### Browser DevTools
- **Network Tab**: Monitor API requests and responses
- **Console**: Check for JavaScript errors and logs
- **React DevTools**: Inspect component state and props
- **Application Tab**: Check localStorage and cookies

#### VS Code Extensions
- **TypeScript Hero**: Auto-import management
- **ES7+ React Snippets**: React code snippets
- **Tailwind CSS IntelliSense**: Tailwind class suggestions
- **Error Lens**: Inline error display

## Performance Optimization

### Code Optimization
```typescript
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{/* Complex rendering */}</div>
})

// Debounce API calls
import { useMemo, useState, useEffect } from 'react'

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}
```

### Bundle Optimization
```typescript
// Dynamic imports for large dependencies
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})

// Tree-shake unused code
import { specificFunction } from 'large-library'
// Instead of: import * as library from 'large-library'
```

## Deployment

### Build Process
```bash
# Type check before building
npm run type-check

# Build for production
npm run build

# Test production build locally
npm run start
```

### Environment Configuration
```bash
# Production environment variables
COMPANIES_HOUSE_API_KEY=prod_key
OPEN_API_KEY=prod_key
APP_URL=https://your-domain.com
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Contributing

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Tests are written for new functionality
- [ ] Documentation is updated
- [ ] Performance implications considered
- [ ] Accessibility requirements met
- [ ] Security implications reviewed

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Screenshots
(If applicable)
```

## Troubleshooting

### Common Development Issues

#### "Module not found" errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript errors
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Check tsconfig.json for proper paths
```

#### API connection issues
```bash
# Test API endpoints directly
curl -H "Authorization: Basic $(echo -n 'your_api_key:' | base64)" \
  "https://api.company-information.service.gov.uk/company/09422519"
```

### Getting Help
- **Documentation**: Check this guide and inline code comments
- **Issues**: GitHub Issues for bug reports and feature requests
- **Community**: Stack Overflow for general Next.js/React questions
- **API Documentation**: Official Companies House and OpenAI documentation