'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CompanyData {
  company: {
    company_name: string
    company_number: string
    company_status: string
    company_type: string
    date_of_creation: string
  }
  analysis: {
    riskScore: number
    riskFactors: string[]
    businessSummary: string
    keyInsights: string[]
    recommendations: string[]
  }
}

export default function APITestPage() {
  const [companyNumber, setCompanyNumber] = useState('09422519') // Example: Apple UK
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<CompanyData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testAPI = async () => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const response = await fetch(`/api/company/${companyNumber}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'API request failed')
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-600 bg-green-50'
    if (score <= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            API Integration Test
          </h1>
          <p className="text-gray-600">
            Test Companies House API + AI Analysis Integration
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="companyNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Company Number
              </label>
              <input
                id="companyNumber"
                type="text"
                value={companyNumber}
                onChange={(e) => setCompanyNumber(e.target.value)}
                placeholder="e.g., 09422519"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={testAPI}
              disabled={loading || !companyNumber}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
            >
              {loading ? 'Analyzing...' : 'Test API'}
            </button>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Example companies: 09422519 (Apple UK), 00445790 (Tesco), 01024717 (British Airways)</p>
          </div>
        </div>

        {/* Error Section */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 text-sm">
                <strong>Error:</strong> {error}
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {data && (
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Company Name</div>
                  <div className="text-lg font-medium text-gray-900">{data.company.company_name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Company Number</div>
                  <div className="text-lg font-medium text-gray-900">{data.company.company_number}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Status</div>
                  <div className="text-lg font-medium text-gray-900">{data.company.company_status}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Type</div>
                  <div className="text-lg font-medium text-gray-900">{data.company.company_type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Incorporated</div>
                  <div className="text-lg font-medium text-gray-900">
                    {new Date(data.company.date_of_creation).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Risk Analysis</h2>
              
              {/* Risk Score */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Risk Score</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(data.analysis.riskScore)}`}>
                    {data.analysis.riskScore}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      data.analysis.riskScore <= 30 ? 'bg-green-500' :
                      data.analysis.riskScore <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${data.analysis.riskScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Business Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Business Summary</h3>
                <p className="text-gray-700">{data.analysis.businessSummary}</p>
              </div>

              {/* Key Insights */}
              {data.analysis.keyInsights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Key Insights</h3>
                  <ul className="space-y-2">
                    {data.analysis.keyInsights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Risk Factors */}
              {data.analysis.riskFactors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Risk Factors</h3>
                  <ul className="space-y-2">
                    {data.analysis.riskFactors.map((factor, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">⚠</span>
                        <span className="text-gray-700">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {data.analysis.recommendations.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Recommendations</h3>
                  <ul className="space-y-2">
                    {data.analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">→</span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}