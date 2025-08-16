// Simple test to check if the Next.js app can start
console.log('Testing basic Next.js startup...')

try {
  // Test environment variables
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
  
  // Test if we can import key modules
  console.log('Testing imports...')
  
  const path = require('path')
  console.log('✓ Path module loaded')
  
  // Don't import the env module yet - it might be causing the hang
  // const { env } = require('./src/lib/env')
  // console.log('✓ Environment module loaded')
  
  console.log('Basic imports successful. The issue might be in the environment validation.')
} catch (error) {
  console.error('Error during startup test:', error)
}