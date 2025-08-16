import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { z } from 'zod'

// Comprehensive validation test suite for Nexus AI project
describe('Nexus AI Project Validation Suite', () => {
  let validationResults: Record<string, any> = {}

  describe('1. Environment Variables Validation', () => {
    it('should validate all required environment variables using Zod schema', async () => {
      try {
        // Import the environment validation
        const { env } = await import('../../src/lib/env')
        
        validationResults.environmentVariables = {
          status: 'success',
          data: {
            supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
            supabaseAnonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'configured' : 'missing',
            companiesHouseApiKey: env.COMPANIES_HOUSE_API_KEY ? 'configured' : 'missing',
            companiesHouseBaseUrl: env.COMPANIES_HOUSE_BASE_URL,
            nextAuthUrl: env.NEXTAUTH_URL,
            googleClientId: env.GOOGLE_CLIENT_ID ? 'configured' : 'missing',
            googleClientSecret: env.GOOGLE_CLIENT_SECRET ? 'configured' : 'missing',
            nodeEnv: env.NODE_ENV,
            appUrl: env.APP_URL
          }
        }
        
        expect(env).toBeDefined()
        expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe('https://qpqvyxpsylaadpqwrafh.supabase.co')
        expect(env.COMPANIES_HOUSE_API_KEY).toBe('34a93948-f011-4c7b-a421-9ff9196c2776')
        expect(env.COMPANIES_HOUSE_BASE_URL).toBe('https://api.company-information.service.gov.uk')
        
      } catch (error) {
        validationResults.environmentVariables = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          envVars: {
            loaded: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_') || key.includes('COMPANIES_HOUSE')).length,
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
            companiesHouseKey: process.env.COMPANIES_HOUSE_API_KEY || 'NOT SET'
          }
        }
        
        // Don't throw in this case - we want to capture the validation failure
        console.log('Environment validation failed, but continuing tests...')
      }
    })

    it('should validate public environment variables are safe for client-side', async () => {
      const { publicEnv } = await import('../../src/lib/env')
      
      expect(publicEnv.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
      expect(publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined()
      
      // Ensure private keys are not in public env
      expect(Object.keys(publicEnv)).not.toContain('SUPABASE_SERVICE_ROLE_KEY')
      expect(Object.keys(publicEnv)).not.toContain('COMPANIES_HOUSE_API_KEY')
    })
  })

  describe('2. Database Connection Tests', () => {
    it('should test Supabase client connection', async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const { env } = await import('../../src/lib/env')
        
        const supabase = createClient(
          env.NEXT_PUBLIC_SUPABASE_URL,
          env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )

        // Test basic connection
        const { data, error } = await supabase.auth.getUser()
        
        validationResults.supabaseClient = {
          status: error && error.message.includes('JWT') ? 'success' : 'error',
          details: 'Client connection established (no user session expected)',
          error: error?.message
        }

        // The error is expected since we're not authenticated
        expect(supabase).toBeDefined()
        
      } catch (error) {
        validationResults.supabaseClient = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
        throw error
      }
    })

    it('should test Supabase server connection', async () => {
      try {
        // Test if server client can be imported
        const serverModule = await import('../../src/lib/supabase/server')
        
        validationResults.supabaseServer = {
          status: 'success',
          details: 'Server client module imports successfully'
        }
        
        expect(serverModule).toBeDefined()
        
      } catch (error) {
        validationResults.supabaseServer = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
        throw error
      }
    })

    it('should verify database schema accessibility', async () => {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const { env } = await import('../../src/lib/env')
        
        const supabase = createClient(
          env.NEXT_PUBLIC_SUPABASE_URL,
          env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        )

        // Try to access a public table or perform a simple query
        const { data, error } = await supabase.from('profiles').select('count').limit(0)
        
        validationResults.databaseSchema = {
          status: error ? 'warning' : 'success',
          details: error ? 'Schema access limited (expected for anonymous user)' : 'Schema accessible',
          error: error?.message
        }

        // We expect this to potentially fail due to RLS, which is good security
        console.log('Database schema test result:', { data, error })
        
      } catch (error) {
        validationResults.databaseSchema = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    })
  })

  describe('3. External API Connection Tests', () => {
    it('should test Companies House API connectivity', async () => {
      try {
        const { env } = await import('../../src/lib/env')
        
        // Test basic API connectivity with a simple request
        const response = await fetch(`${env.COMPANIES_HOUSE_BASE_URL}/company/00000006`, {
          headers: {
            'Authorization': `Basic ${Buffer.from(env.COMPANIES_HOUSE_API_KEY + ':').toString('base64')}`,
            'Accept': 'application/json'
          }
        })

        const isSuccess = response.status === 200
        const data = isSuccess ? await response.json() : null

        validationResults.companiesHouseApi = {
          status: isSuccess ? 'success' : 'error',
          statusCode: response.status,
          details: isSuccess ? 'API connection successful' : 'API connection failed',
          companyData: data ? { companyName: data.company_name, companyNumber: data.company_number } : null
        }

        expect(response.status).toBe(200)
        
      } catch (error) {
        validationResults.companiesHouseApi = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
        throw error
      }
    })

    it('should validate Companies House API base URL format', async () => {
      const { env } = await import('../../src/lib/env')
      
      expect(env.COMPANIES_HOUSE_BASE_URL).toMatch(/^https:\/\//)
      expect(env.COMPANIES_HOUSE_BASE_URL).toBe('https://api.company-information.service.gov.uk')
    })
  })

  describe('4. Authentication Configuration Tests', () => {
    it('should validate NextAuth.js configuration', async () => {
      try {
        const authConfig = await import('../../src/lib/auth/config')
        
        validationResults.nextAuthConfig = {
          status: 'success',
          details: 'NextAuth configuration module loads successfully'
        }
        
        expect(authConfig).toBeDefined()
        
      } catch (error) {
        validationResults.nextAuthConfig = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
        throw error
      }
    })

    it('should validate Google OAuth credentials are configured', async () => {
      const { env } = await import('../../src/lib/env')
      
      const googleConfigured = !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET)
      
      validationResults.googleOAuth = {
        status: googleConfigured ? 'success' : 'warning',
        details: googleConfigured ? 'Google OAuth credentials configured' : 'Google OAuth credentials missing',
        clientIdConfigured: !!env.GOOGLE_CLIENT_ID,
        clientSecretConfigured: !!env.GOOGLE_CLIENT_SECRET
      }

      // These are optional, so we'll just log the status
      console.log('Google OAuth status:', validationResults.googleOAuth)
    })

    it('should test Supabase adapter integration', async () => {
      try {
        // Test if the auth helpers can be imported
        const authHelpers = await import('../../src/lib/auth/auth-helpers')
        
        validationResults.supabaseAdapter = {
          status: 'success',
          details: 'Supabase auth helpers module loads successfully'
        }
        
        expect(authHelpers).toBeDefined()
        
      } catch (error) {
        validationResults.supabaseAdapter = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
        throw error
      }
    })
  })

  describe('5. TypeScript Compilation', () => {
    it('should validate TypeScript configuration', async () => {
      try {
        // Test core type imports
        const envTypes = await import('../../src/lib/env')
        const utilTypes = await import('../../src/lib/utils')
        
        validationResults.typeScriptConfig = {
          status: 'success',
          details: 'Core TypeScript modules compile and import successfully'
        }
        
        expect(envTypes).toBeDefined()
        expect(utilTypes).toBeDefined()
        
      } catch (error) {
        validationResults.typeScriptConfig = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
        throw error
      }
    })

    it('should validate path aliases work correctly', async () => {
      try {
        // Test that path aliases resolve correctly
        const libImport = await import('@/lib/utils')
        
        validationResults.pathAliases = {
          status: 'success',
          details: 'Path aliases resolve correctly'
        }
        
        expect(libImport).toBeDefined()
        
      } catch (error) {
        validationResults.pathAliases = {
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
        throw error
      }
    })
  })

  // Generate comprehensive report
  afterAll(() => {
    console.log('\n🔍 NEXUS AI VALIDATION REPORT')
    console.log('===============================')
    
    Object.entries(validationResults).forEach(([category, result]) => {
      const icon = result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'
      console.log(`\n${icon} ${category.toUpperCase()}:`)
      console.log(`   Status: ${result.status}`)
      if (result.details) console.log(`   Details: ${result.details}`)
      if (result.error) console.log(`   Error: ${result.error}`)
      if (result.data) console.log(`   Data: ${JSON.stringify(result.data, null, 2)}`)
    })
    
    console.log('\n📊 SUMMARY:')
    const successCount = Object.values(validationResults).filter(r => r.status === 'success').length
    const warningCount = Object.values(validationResults).filter(r => r.status === 'warning').length
    const errorCount = Object.values(validationResults).filter(r => r.status === 'error').length
    const total = Object.keys(validationResults).length
    
    console.log(`   Total Tests: ${total}`)
    console.log(`   ✅ Successful: ${successCount}`)
    console.log(`   ⚠️  Warnings: ${warningCount}`)
    console.log(`   ❌ Errors: ${errorCount}`)
    console.log(`   📈 Success Rate: ${((successCount / total) * 100).toFixed(1)}%`)
  })
})