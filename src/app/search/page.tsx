'use client'

import Link from 'next/link'
import CompanySearch from '@/components/CompanySearch'

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Nexus AI</h1>
              <span className="ml-2 text-sm text-gray-500">Company Search</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/api-test" 
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                API Test
              </Link>
              <span className="text-sm text-green-600 font-medium">✅ Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Company Intelligence Search
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Search UK companies and get AI-powered risk analysis and insights
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Find Any UK Company
            </h3>
            <p className="text-gray-600">
              Type a company name, registration number, or keyword to get started
            </p>
          </div>

          <CompanySearch 
            placeholder="Search companies (e.g., Apple, Tesco, British Airways...)"
            showAnalyzeButton={true}
          />

          {/* Search Examples */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Searches:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Apple UK',
                'Tesco PLC', 
                'British Airways',
                'Barclays Bank',
                'Vodafone',
                'HSBC',
                'Shell UK'
              ].map((example) => (
                <button
                  key={example}
                  className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => {
                    const input = document.querySelector('input') as HTMLInputElement
                    if (input) {
                      input.value = example
                      input.dispatchEvent(new Event('input', { bubbles: true }))
                      input.focus()
                    }
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features - Now Clickable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement
              if (input) {
                input.focus()
                input.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Search</h3>
            <p className="text-gray-600 text-sm">
              Auto-complete search with real-time suggestions from Companies House database
            </p>
            <div className="mt-3 text-blue-600 text-sm font-medium">Click to search</div>
          </button>
          
          <Link href="/api-test" className="block">
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer h-full">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Get instant risk assessments and business insights powered by AI
              </p>
              <div className="mt-3 text-green-600 text-sm font-medium">Try API test →</div>
            </div>
          </Link>
          
          <button
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement
              if (input) {
                input.value = 'Apple UK'
                input.dispatchEvent(new Event('input', { bubbles: true }))
                input.focus()
                input.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Reports</h3>
            <p className="text-gray-600 text-sm">
              Comprehensive company profiles with officers, ownership, and compliance data
            </p>
            <div className="mt-3 text-purple-600 text-sm font-medium">Demo with Apple UK →</div>
          </button>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Homepage
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Nexus AI - Intelligent Company Search & Analysis</p>
          </div>
        </div>
      </footer>
    </div>
  )
}