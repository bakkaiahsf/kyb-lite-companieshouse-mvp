'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SimpleLandingPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg"></div>
            <span className="text-white font-bold text-xl">Nexus AI</span>
          </div>
          <button
            onClick={handleSignIn}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
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
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-12 py-4 rounded-xl text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg"
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

        {/* Quick Access */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Quick Access</h3>
              <p className="text-gray-300">Ready to get started?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleSignIn}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                Access Dashboard →
              </button>
              <Link
                href="/search"
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 text-center"
              >
                Search Companies →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}