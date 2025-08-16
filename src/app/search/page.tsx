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
            🏦 Banking Intelligence Portal
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Instant company risk assessment, compliance checks & financial health reports
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>✅ Real-time Companies House data</span>
            <span>✅ AI-powered risk scoring</span>
            <span>✅ Compliance monitoring</span>
          </div>
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

          <div className="space-y-4">
            <CompanySearch 
              placeholder="Enter company name or registration number..."
              showAnalyzeButton={false}
            />
            
            {/* Prominent Search Button */}
            <div className="text-center">
              <button 
                onClick={() => {
                  const input = document.querySelector('input') as HTMLInputElement
                  if (input && input.value.length >= 2) {
                    // Trigger search and navigate to results
                    window.location.href = `/api-test?company=${encodeURIComponent(input.value)}`
                  } else {
                    input?.focus()
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                🔍 SEARCH & ANALYZE
              </button>
              <p className="mt-2 text-sm text-gray-600">Get instant risk assessment and compliance report</p>
            </div>
          </div>

          {/* Search Examples */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-3">💡 Search Examples:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { display: 'Apple UK (09422519)', value: 'Apple UK' },
                { display: 'Tesco PLC (00445790)', value: 'Tesco' }, 
                { display: 'British Airways (01024717)', value: 'British Airways' },
                { display: 'Barclays (01026167)', value: 'Barclays' }
              ].map((example) => (
                <button
                  key={example.value}
                  className="px-3 py-1 text-sm bg-white border border-blue-300 rounded-full hover:bg-blue-100 transition-colors duration-200"
                  onClick={() => {
                    const input = document.querySelector('input') as HTMLInputElement
                    if (input) {
                      input.value = example.value
                      input.dispatchEvent(new Event('input', { bubbles: true }))
                      input.focus()
                    }
                  }}
                >
                  {example.display}
                </button>
              ))}
            </div>
            <p className="text-blue-700 text-xs mt-2">💡 You can search by company name or registration number</p>
          </div>
        </div>

        {/* Banking Actions - Direct Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => {
              window.location.href = '/api-test?company=09422519' // Apple UK
            }}
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border-l-4 border-green-500"
          >
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Risk Check</h3>
            <p className="text-gray-600 text-sm mb-3">
              Instant risk assessment for Apple UK
            </p>
            <div className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full inline-block mb-2">
              Company: 09422519
            </div>
            <div className="text-green-600 text-sm font-bold">→ ANALYZE NOW</div>
          </button>
          
          <button
            onClick={() => {
              window.location.href = '/api-test?company=00445790' // Tesco
            }}
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border-l-4 border-blue-500"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Report</h3>
            <p className="text-gray-600 text-sm mb-3">
              Filing status & compliance for Tesco PLC
            </p>
            <div className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full inline-block mb-2">
              Company: 00445790
            </div>
            <div className="text-blue-600 text-sm font-bold">→ CHECK STATUS</div>
          </button>
          
          <button
            onClick={() => {
              window.location.href = '/api-test?company=01024717' // British Airways
            }}
            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer border-l-4 border-purple-500"
          >
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Health</h3>
            <p className="text-gray-600 text-sm mb-3">
              Business health check for British Airways
            </p>
            <div className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full inline-block mb-2">
              Company: 01024717
            </div>
            <div className="text-purple-600 text-sm font-bold">→ ASSESS HEALTH</div>
          </button>
        </div>

        {/* Quick Access Bar for Common UK Companies */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-white font-semibold mb-4 text-center">🏦 Quick Banking Checks</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Barclays', number: '01026167' },
              { name: 'HSBC UK', number: '00009879' },
              { name: 'Vodafone', number: '01833679' },
              { name: 'Shell UK', number: '00140141' }
            ].map((company) => (
              <button
                key={company.number}
                onClick={() => {
                  window.location.href = `/api-test?company=${company.number}`
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-200 text-sm font-medium"
              >
                {company.name}
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-xs text-center mt-3">Click any company for instant analysis</p>
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