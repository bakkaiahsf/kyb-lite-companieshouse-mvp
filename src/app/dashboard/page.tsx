'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days')

  // Mock data for visualizations
  const riskScoreData = {
    current: 25,
    trend: -5,
    status: 'Low Risk'
  }

  const companiesAnalyzed = {
    total: 1247,
    thisMonth: 156,
    active: 98.2
  }

  const recentSearches = [
    { company: 'Apple UK Ltd', number: '09422519', risk: 25, status: 'Active', date: '2 hrs ago' },
    { company: 'Tesco PLC', number: '00445790', risk: 45, status: 'Active', date: '5 hrs ago' },
    { company: 'British Airways', number: '01024717', risk: 35, status: 'Active', date: '1 day ago' },
    { company: 'Barclays Bank', number: '01026167', risk: 15, status: 'Active', date: '2 days ago' }
  ]

  const riskDistribution = [
    { range: '0-20', count: 65, color: 'bg-green-500' },
    { range: '21-40', count: 25, color: 'bg-yellow-500' },
    { range: '41-60', count: 8, color: 'bg-orange-500' },
    { range: '61-80', count: 2, color: 'bg-red-500' },
    { range: '81-100', count: 0, color: 'bg-red-700' }
  ]

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-500 bg-green-50'
    if (score <= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/landing" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
                <span className="text-xl font-bold text-gray-900">Nexus AI</span>
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-lg font-semibold text-gray-700">Banking Intelligence Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
              
              <Link 
                href="/search"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                + New Search
              </Link>
              
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Here&apos;s your company intelligence overview for the last {selectedPeriod === '30days' ? '30 days' : selectedPeriod === '7days' ? '7 days' : '90 days'}.</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Risk Score Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Average Risk Score</h3>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">{riskScoreData.current}</span>
              <span className="text-green-500 text-sm font-medium">
                {riskScoreData.trend > 0 ? '+' : ''}{riskScoreData.trend}%
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{riskScoreData.status}</p>
          </div>

          {/* Companies Analyzed */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Companies Analyzed</h3>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">{companiesAnalyzed.total.toLocaleString()}</span>
              <span className="text-blue-500 text-sm font-medium">+{companiesAnalyzed.thisMonth}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">This month</p>
          </div>

          {/* Active Status */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Active Companies</h3>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">{companiesAnalyzed.active}%</span>
              <span className="text-green-500 text-sm font-medium">+2.1%</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Status rate</p>
          </div>

          {/* Total Searches */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Searches</h3>
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">2,847</span>
              <span className="text-green-500 text-sm font-medium">+12%</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">API calls</p>
          </div>
        </div>

        {/* Charts and Data Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Risk Score Distribution</h3>
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
            
            <div className="space-y-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 text-sm text-gray-600">{item.range}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${item.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${(item.count / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-sm text-gray-600 text-right">{item.count}%</div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-green-600">65%</span> of companies analyzed show low risk (0-20)
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
              <span className="text-sm text-gray-500">Real-time</span>
            </div>

            <div className="space-y-6">
              {/* Mock timeline data */}
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Risk analysis completed</p>
                  <p className="text-xs text-gray-500">Apple UK Ltd - Risk Score: 25</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">New company search</p>
                  <p className="text-xs text-gray-500">Tesco PLC - Analysis initiated</p>
                  <p className="text-xs text-gray-400">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Compliance check</p>
                  <p className="text-xs text-gray-500">British Airways - Filing status verified</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">Risk alert resolved</p>
                  <p className="text-xs text-gray-500">Barclays Bank - Status updated</p>
                  <p className="text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Searches Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Company Searches</h3>
              <Link 
                href="/search"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all searches →
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Analyzed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSearches.map((search, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{search.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{search.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(search.risk)}`}>
                        {search.risk}/100
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {search.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {search.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        href={`/api-test?company=${search.number}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/search" className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg transition-colors text-center group">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold mb-2">New Company Search</h3>
            <p className="text-blue-100 text-sm">Search and analyze any UK company</p>
          </Link>

          <Link href="/api-test" className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg transition-colors text-center group">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Quick Analysis</h3>
            <p className="text-green-100 text-sm">Get instant AI-powered insights</p>
          </Link>

          <div className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg transition-colors text-center group cursor-pointer">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold mb-2">Generate Report</h3>
            <p className="text-purple-100 text-sm">Create comprehensive analysis report</p>
          </div>
        </div>
      </main>
    </div>
  )
}