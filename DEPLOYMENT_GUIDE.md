# Nexus AI - Deployment Guide

## Current Production Deployment

### Live Environment
- **Production URL**: https://companyhouseai-16yzjmsgt-bakkaiahs-projects.vercel.app
- **Status**: ✅ Live and Operational
- **Platform**: Vercel
- **Framework**: Next.js 15.4.6
- **Node.js**: Compatible with Vercel's runtime

### Deployment Status
The application is successfully deployed and functional with:
- ✅ Homepage accessible
- ✅ Company search working
- ✅ API endpoints operational
- ✅ AI analysis functional
- ✅ Responsive design working
- ✅ Error handling active

## Deployment Architecture

### Vercel Configuration
The project uses Vercel's optimized Next.js deployment with the following configuration:

```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### Build Process
1. **Source Code**: GitHub repository integration
2. **Dependencies**: NPM package installation
3. **TypeScript Compilation**: Type checking and compilation
4. **Next.js Build**: Static generation and optimization
5. **Deployment**: Vercel edge network distribution

## Environment Configuration

### Required Environment Variables

#### Core Application
```bash
# Required for basic functionality
COMPANIES_HOUSE_API_KEY=your_companies_house_api_key
OPEN_API_KEY=sk-your_openai_api_key

# Application URLs
APP_URL=https://your-domain.com
API_BASE_URL=https://your-domain.com/api
```

#### Companies House API
```bash
COMPANIES_HOUSE_API_KEY=your_api_key_here
COMPANIES_HOUSE_BASE_URL=https://api.company-information.service.gov.uk
```
- **How to obtain**: Register at [Companies House Developer Hub](https://developer.company-information.service.gov.uk/)
- **Rate limits**: 600 requests per 5 minutes per API key
- **Cost**: Free for basic usage

#### OpenAI API
```bash
OPEN_API_KEY=sk-your_openai_api_key_here
```
- **How to obtain**: Register at [OpenAI Platform](https://platform.openai.com/)
- **Model used**: GPT-4 Mini (gpt-4o-mini)
- **Cost**: Pay-per-use, approximately $0.15 per 1M input tokens

### Optional Environment Variables

#### Database (Prepared for future use)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Authentication (Configured but not active)
```bash
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Payment Processing (Ready for implementation)
```bash
STRIPE_PUBLIC_KEY=pk_live_or_test_key
STRIPE_SECRET_KEY=sk_live_or_test_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Deployment Steps

### Initial Deployment to Vercel

1. **Repository Setup**
   ```bash
   git clone https://github.com/bakkaiahsf/kyb-lite-companieshouse-mvp
   cd companyhouseai
   ```

2. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables**
   - Access Vercel dashboard
   - Navigate to project settings
   - Add environment variables
   - Redeploy if needed

### Environment Variable Configuration in Vercel

1. **Access Project Settings**
   - Go to Vercel dashboard
   - Select your project
   - Navigate to "Settings" → "Environment Variables"

2. **Add Required Variables**
   ```
   COMPANIES_HOUSE_API_KEY = [your_api_key]
   OPEN_API_KEY = [your_openai_key]
   APP_URL = https://your-domain.vercel.app
   ```

3. **Redeploy**
   - Trigger new deployment to apply variables
   - Verify functionality after deployment

### Custom Domain Setup (Optional)

1. **Add Custom Domain**
   - In Vercel dashboard, go to "Settings" → "Domains"
   - Add your custom domain
   - Configure DNS records as instructed

2. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - HTTPS is enforced by default

## Development Deployment

### Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/bakkaiahsf/kyb-lite-companieshouse-mvp
   cd companyhouseai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open http://localhost:3000
   - Test all functionality locally

### Development Environment Variables
Create `.env.local` with:
```bash
COMPANIES_HOUSE_API_KEY=your_test_api_key
OPEN_API_KEY=your_openai_key
NEXTAUTH_URL=http://localhost:3000
APP_URL=http://localhost:3000
```

## CI/CD Pipeline

### Automatic Deployment
- **Trigger**: Push to main branch
- **Process**: Vercel automatically builds and deploys
- **Rollback**: Previous deployments available for instant rollback
- **Environment**: Production environment variables applied

### Build Optimization
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### Build Verification
- ✅ TypeScript compilation
- ✅ ESLint code quality checks
- ✅ Next.js build optimization
- ✅ Bundle size analysis

## Performance Monitoring

### Vercel Analytics
- **Automatic**: Performance metrics collection
- **Core Web Vitals**: LCP, FID, CLS monitoring
- **Real User Monitoring**: Actual user performance data
- **Dashboard**: Available in Vercel dashboard

### Application Monitoring
- **Error Tracking**: Console errors logged
- **API Performance**: Response time monitoring
- **User Experience**: Loading state feedback
- **System Health**: API status indicators

## Backup and Recovery

### Source Code
- **Primary**: GitHub repository
- **Versioning**: Git version control
- **Branches**: Main branch for production
- **Rollback**: Git revert capabilities

### Deployments
- **History**: Vercel maintains deployment history
- **Instant Rollback**: One-click rollback to previous versions
- **Preview Deployments**: Branch deployments for testing

### Data Backup (Future)
- **Database**: Supabase automated backups
- **User Data**: Point-in-time recovery
- **Configuration**: Environment variable backup

## Security Configuration

### HTTPS Enforcement
- **SSL**: Automatic SSL certificate provisioning
- **Redirect**: HTTP to HTTPS redirection
- **HSTS**: HTTP Strict Transport Security headers

### API Security
- **Rate Limiting**: Companies House API rate limits respected
- **Key Security**: Environment variables secured
- **Error Handling**: No sensitive data in error responses

### Content Security
- **XSS Protection**: Next.js built-in protections
- **CSRF**: Next.js automatic CSRF protection
- **Headers**: Security headers configured

## Troubleshooting

### Common Deployment Issues

#### Environment Variables Not Working
```bash
# Check if variables are set in Vercel dashboard
# Verify variable names match exactly
# Redeploy after adding variables
```

#### API Key Issues
```bash
# Verify Companies House API key is valid
# Check OpenAI API key has sufficient credits
# Ensure API keys have correct permissions
```

#### Build Failures
```bash
# Check TypeScript compilation errors
# Verify all dependencies are installed
# Review build logs in Vercel dashboard
```

### Performance Issues
- **Slow API Responses**: Check external API status
- **Large Bundle Size**: Review import statements
- **Memory Issues**: Monitor Vercel function limits

### Debugging Steps
1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints individually
4. Review browser console errors
5. Check external service status

## Scaling Considerations

### Current Limits
- **Vercel Function**: 10-second timeout limit
- **Memory**: 1GB per function
- **Bundle Size**: 50MB compressed
- **API Requests**: Limited by external services

### Scaling Options
- **Vercel Pro**: Higher limits and better performance
- **Edge Functions**: Global distribution
- **Database**: Add Supabase for data persistence
- **Caching**: Implement Redis for performance

## Cost Management

### Current Costs
- **Vercel**: Free tier (sufficient for current usage)
- **Companies House API**: Free (up to rate limits)
- **OpenAI API**: Pay-per-use (approximately $0.15/1M tokens)

### Cost Optimization
- **Caching**: Implement response caching
- **Batch Processing**: Optimize AI API calls
- **Rate Limiting**: Implement user rate limiting
- **Monitoring**: Track usage patterns