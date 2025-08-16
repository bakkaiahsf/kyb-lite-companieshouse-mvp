'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const handleSignIn = () => {
    // No authentication - direct navigation to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg"></div>
            <span className="text-white font-bold text-xl">Nexus AI</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          </div>
          <button
            onClick={handleSignIn}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          {/* Main Title with Gradient */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Nexus AI
            </span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your UK Corporate Truth Serum!
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Tired of playing detective with company ownership? Nexus AI serves up the real owners and hidden links, fast.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={handleSignIn}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-12 py-4 rounded-xl text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started Now
            </button>
            
            <Link 
              href="/search"
              className="bg-white/10 backdrop-blur-sm text-white font-semibold px-12 py-4 rounded-xl text-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              Try Demo
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-black text-sm">⚡</span>
              </div>
              <span className="text-white font-medium">Fast</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📊</span>
              </div>
              <span className="text-white font-medium">Easy</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔍</span>
              </div>
              <span className="text-white font-medium">Accurate</span>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">See It In Action</h3>
              <p className="text-gray-300">Real-time company intelligence at your fingertips</p>
            </div>
            
            {/* Mock Dashboard Preview */}
            <div className="bg-gray-900/50 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-white font-semibold">Recent Analysis</h4>
                <span className="text-green-400 text-sm">● Live</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-500/20 p-4 rounded-lg">
                  <div className="text-blue-400 text-sm">Risk Score</div>
                  <div className="text-white text-2xl font-bold">25/100</div>
                  <div className="text-green-400 text-xs">Low Risk</div>
                </div>
                <div className="bg-purple-500/20 p-4 rounded-lg">
                  <div className="text-purple-400 text-sm">Companies</div>
                  <div className="text-white text-2xl font-bold">1,247</div>
                  <div className="text-gray-400 text-xs">Analyzed</div>
                </div>
                <div className="bg-green-500/20 p-4 rounded-lg">
                  <div className="text-green-400 text-sm">Active</div>
                  <div className="text-white text-2xl font-bold">98.2%</div>
                  <div className="text-gray-400 text-xs">Status</div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={handleSignIn}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  Access Full Dashboard →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-4">Why Choose Nexus AI?</h3>
          <p className="text-xl text-gray-300">Powerful features for modern business intelligence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Lightning Fast</h4>
            <p className="text-gray-300">Get instant company insights in seconds, not hours. Real-time data processing powered by AI.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Precision Analytics</h4>
            <p className="text-gray-300">AI-powered risk assessment and ownership mapping with 99% accuracy from official UK data.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-4">Bank-Grade Security</h4>
            <p className="text-gray-300">Enterprise-level security with encrypted data transmission and compliance monitoring.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg"></div>
              <span className="text-white font-bold text-xl">Nexus AI</span>
            </div>
            <p className="text-gray-400 mb-6">Your UK Corporate Truth Serum - Fast, Easy, Accurate</p>
            <div className="flex justify-center space-x-6">
              <Link href="/search" className="text-gray-400 hover:text-white transition-colors">Search Demo</Link>
              <Link href="/api-test" className="text-gray-400 hover:text-white transition-colors">API Test</Link>
              <button onClick={handleSignIn} className="text-gray-400 hover:text-white transition-colors">Dashboard</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}