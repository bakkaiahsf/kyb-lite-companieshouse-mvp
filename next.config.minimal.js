/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal configuration for basic functionality
  reactStrictMode: true,
  
  // Remove experimental features for stability
  // experimental: {
  //   typedRoutes: true,
  // },
  
  // Basic image configuration
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
}

module.exports = nextConfig