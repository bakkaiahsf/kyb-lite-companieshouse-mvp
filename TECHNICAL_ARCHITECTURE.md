# Nexus AI - Technical Architecture

## Overview

Nexus AI is built as a modern full-stack web application using Next.js with a serverless architecture deployed on Vercel. The system integrates external APIs for data sourcing and AI analysis while maintaining a clean, modular architecture.

## Technology Stack

### Frontend Framework
- **Next.js 15.4.6**: React framework with App Router
- **React 18.3.1**: Modern React with concurrent features
- **TypeScript 5.9.2**: Strong typing throughout the application
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **PostCSS 8.4.49**: CSS processing with Autoprefixer

### Development Tools
- **ESLint 8.57.1**: Code linting with Next.js configuration
- **Next.js ESLint Config**: Optimized linting rules for Next.js
- **Node.js Types**: TypeScript definitions for Node.js

### Deployment & Infrastructure
- **Vercel**: Serverless deployment platform
- **GitHub**: Source code management
- **Edge Functions**: Serverless API endpoints

## Architecture Patterns

### Application Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes     │    │  External APIs  │
│   (Next.js)     │◄──►│   (Serverless)   │◄──►│  Companies House│
│                 │    │                  │    │  OpenAI         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Component Architecture
- **Page Components**: Top-level route components
- **Feature Components**: Reusable business logic components
- **UI Components**: Pure presentation components
- **Service Layer**: External API integration
- **Type Definitions**: Shared TypeScript interfaces

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── company/[number]/route.ts  # Company analysis endpoint
│   │   └── search/route.ts            # Company search endpoint
│   ├── search/page.tsx    # Search page
│   ├── api-test/page.tsx  # API testing interface
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # React components
│   └── CompanySearch.tsx  # Search component
├── lib/                  # Utility libraries
│   ├── companies-house.ts # Companies House API client
│   └── ai-analysis.ts    # AI analysis service
└── styles/               # Global styles
    └── globals.css       # Tailwind imports
```

## API Architecture

### RESTful Endpoints

#### Company Analysis API
- **Endpoint**: `/api/company/[number]`
- **Method**: GET
- **Purpose**: Retrieve company data and AI analysis
- **Parameters**: `number` (company registration number)
- **Response**: Combined company profile and risk analysis
- **Error Handling**: HTTP status codes with descriptive messages

#### Company Search API
- **Endpoint**: `/api/search`
- **Method**: GET
- **Parameters**: 
  - `q` (query string)
  - `limit` (optional, defaults to 20)
- **Purpose**: Search UK companies by name or number
- **Response**: Paginated search results

### API Integration Layer

#### Companies House API Client
```typescript
class CompaniesHouseAPI {
  private baseUrl: string
  private apiKey: string
  
  // Methods:
  searchCompanies(query: string): Promise<CompanySearchResult>
  getCompanyProfile(number: string): Promise<CompanyProfile>
  getCompanyOfficers(number: string): Promise<any>
  getCompanyPSCs(number: string): Promise<any>
}
```

#### AI Analysis Service
```typescript
class AIAnalysisService {
  private apiKey: string
  
  // Methods:
  analyzeCompany(company: CompanyProfile): Promise<CompanyAnalysis>
  buildAnalysisPrompt(company: CompanyProfile): string
  parseAnalysis(text: string): CompanyAnalysis
  getFallbackAnalysis(company: CompanyProfile): CompanyAnalysis
}
```

## Data Models

### Company Profile Interface
```typescript
interface CompanyProfile {
  company_number: string
  company_name: string
  company_status: string
  company_type: string
  date_of_creation: string
  registered_office_address: RegisteredAddress
  sic_codes?: string[]
  accounts?: AccountsInfo
}
```

### Company Analysis Interface
```typescript
interface CompanyAnalysis {
  riskScore: number          // 0-100
  riskFactors: string[]
  businessSummary: string
  keyInsights: string[]
  recommendations: string[]
}
```

### Search Result Interface
```typescript
interface SearchResult {
  company_number: string
  title: string
  company_status: string
  company_type: string
  address_snippet: string
  date_of_creation: string
}
```

## External Service Integration

### Companies House API
- **Authentication**: HTTP Basic Auth with API key
- **Base URL**: `https://api.company-information.service.gov.uk`
- **Rate Limiting**: 600 requests per 5 minutes
- **Error Handling**: Specific handling for 404, 401, 429 responses

### OpenAI API
- **Model**: GPT-4 Mini (gpt-4o-mini)
- **Authentication**: Bearer token
- **Temperature**: 0.3 (for consistent outputs)
- **Max Tokens**: 1500
- **Fallback**: Local analysis when API unavailable

## State Management

### Client State
- **React useState**: Local component state
- **React useEffect**: Side effects and API calls
- **URL State**: Search parameters for deep linking
- **Form State**: Controlled inputs with validation

### Server State
- **API Responses**: Cached in browser memory
- **Error States**: Proper error boundaries
- **Loading States**: Loading indicators throughout UI

## Security Architecture

### API Security
- **Environment Variables**: Secure API key storage
- **Input Validation**: Sanitization of user inputs
- **Error Sanitization**: No sensitive data in error responses
- **HTTPS Only**: Secure connections in production

### Authentication (Prepared)
- **NextAuth.js**: Ready for implementation
- **Multiple Providers**: Google OAuth configured
- **Session Management**: Secure session handling

## Performance Optimization

### Frontend Performance
- **Code Splitting**: Automatic by Next.js App Router
- **Image Optimization**: Next.js Image component ready
- **Bundle Optimization**: Tree-shaking and minification
- **Caching**: Browser caching for static assets

### API Performance
- **Debounced Search**: 300ms delay for search optimization
- **Error Recovery**: Fallback analysis for AI failures
- **Response Compression**: Gzip compression enabled
- **CDN Distribution**: Vercel Edge Network

## Monitoring & Debugging

### Error Handling
- **Comprehensive Logging**: Console errors with context
- **User-Friendly Messages**: Clear error communication
- **Error Boundaries**: React error boundary ready
- **API Error Mapping**: Specific error handling per service

### Development Tools
- **TypeScript**: Compile-time error detection
- **ESLint**: Code quality enforcement
- **Next.js Dev Mode**: Hot reloading and error overlay
- **Browser DevTools**: Full debugging support

## Deployment Architecture

### Vercel Configuration
```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### Environment Configuration
- **Production Variables**: Secure environment variable management
- **Build Optimization**: Optimized production builds
- **Edge Functions**: Serverless API deployment
- **CDN**: Global content distribution

## Scalability Considerations

### Horizontal Scaling
- **Serverless Functions**: Auto-scaling API endpoints
- **Static Generation**: Pre-built pages where possible
- **CDN Caching**: Global edge caching
- **Database Ready**: Architecture supports database integration

### Vertical Scaling
- **Efficient Algorithms**: Optimized search and analysis
- **Memory Management**: Proper cleanup and garbage collection
- **Bundle Size**: Minimized JavaScript bundles
- **Lazy Loading**: Component-level code splitting ready

## Future Architecture Considerations

### Database Integration
- **Supabase Ready**: Configuration prepared for PostgreSQL
- **Data Persistence**: User accounts and search history
- **Real-time Updates**: WebSocket support for live data

### Advanced Features
- **Caching Layer**: Redis integration prepared
- **Background Jobs**: Queue system for heavy processing
- **Analytics**: Tracking and monitoring infrastructure
- **Microservices**: Service decomposition for scale