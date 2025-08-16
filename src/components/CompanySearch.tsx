'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  company_number: string
  title: string
  company_status: string
  company_type: string
  address_snippet: string
  date_of_creation: string
  display_title: string
  display_status: string
  display_age: string
}

interface CompanySearchProps {
  onCompanySelect?: (companyNumber: string) => void
  placeholder?: string
  showAnalyzeButton?: boolean
}

export default function CompanySearch({ 
  onCompanySelect, 
  placeholder = "Search for a company...",
  showAnalyzeButton = true 
}: CompanySearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [selectedCompany, setSelectedCompany] = useState<SearchResult | null>(null)
  
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setShowDropdown(false)
      return
    }

    const timeoutId = setTimeout(async () => {
      await searchCompanies(query)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const searchCompanies = async (searchQuery: string) => {
    if (searchQuery.length < 2) return

    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`)
      
      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.items || [])
      setShowDropdown(true)
      setSelectedIndex(-1)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedCompany(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          selectCompany(results[selectedIndex])
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
    }
  }

  const selectCompany = (company: SearchResult) => {
    setSelectedCompany(company)
    setQuery(company.display_title)
    setShowDropdown(false)
    setSelectedIndex(-1)
    
    if (onCompanySelect) {
      onCompanySelect(company.company_number)
    }
  }

  const handleAnalyze = () => {
    if (selectedCompany) {
      // For now, redirect to API test with the company number
      router.push(`/api-test?company=${selectedCompany.company_number}`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'dissolved': return 'text-red-600 bg-red-50'
      case 'liquidation': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Search Icon */}
        {!loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((company, index) => (
            <div
              key={company.company_number}
              onClick={() => selectCompany(company)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {company.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {company.company_number} • {company.display_age} • {company.company_type}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {company.address_snippet}
                  </p>
                </div>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(company.company_status)}`}>
                  {company.display_status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {showDropdown && !loading && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <p className="text-gray-500 text-center">No companies found for &quot;{query}&quot;</p>
        </div>
      )}

      {/* Analyze Button */}
      {showAnalyzeButton && selectedCompany && (
        <div className="mt-4 text-center">
          <button
            onClick={handleAnalyze}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            🔍 Analyze {selectedCompany.title}
          </button>
        </div>
      )}

      {/* Search Tips */}
      {query.length > 0 && query.length < 2 && (
        <p className="mt-2 text-sm text-gray-500">
          Type at least 2 characters to search...
        </p>
      )}
    </div>
  )
}