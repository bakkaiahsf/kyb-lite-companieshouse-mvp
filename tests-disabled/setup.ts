import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { config } from 'dotenv'
import path from 'path'

// Set NODE_ENV for testing before loading anything
if (!process.env.NODE_ENV) {
  (process.env as any).NODE_ENV = 'test'
}

// Load environment variables before tests
config({ path: path.resolve(process.cwd(), '.env.local') })
config({ path: path.resolve(process.cwd(), '.env') })

// Setup for testing
beforeAll(() => {
  // Ensure environment variables are loaded
  console.log('Environment loaded:', {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    COMPANIES_HOUSE_API_KEY: process.env.COMPANIES_HOUSE_API_KEY ? 'SET' : 'NOT SET'
  })
})

afterEach(() => {
  // Cleanup after each test
})

afterAll(() => {
  // Cleanup after all tests
})

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }
  },
  useSearchParams() {
    return {
      get: vi.fn(),
    }
  },
  usePathname() {
    return ''
  },
}))

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))