// API Route: /api/search - Company Search Endpoint
import { NextRequest, NextResponse } from 'next/server'
import { CompaniesHouseAPI } from '@/lib/companies-house'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters' },
        { status: 400 }
      )
    }

    // Initialize Companies House API
    const companiesHouseAPI = new CompaniesHouseAPI()
    
    // Search companies
    const results = await companiesHouseAPI.searchCompanies(query.trim(), limit)

    // Format results for frontend
    const formattedResults = results.items.map(item => ({
      company_number: item.company_number,
      title: item.title,
      company_status: item.company_status,
      company_type: item.company_type,
      address_snippet: item.address_snippet,
      date_of_creation: item.date_of_creation,
      // Add helper for display
      display_title: `${item.title} (${item.company_number})`,
      display_status: item.company_status.charAt(0).toUpperCase() + item.company_status.slice(1),
      display_age: item.date_of_creation ? 
        Math.floor((Date.now() - new Date(item.date_of_creation).getTime()) / (1000 * 60 * 60 * 24 * 365)) + ' years' : 
        'Unknown'
    }))

    return NextResponse.json({
      query,
      total_results: results.total_results,
      items: formattedResults,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Search API Error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes('Rate limit') ? 429 : 500 }
      )
    }

    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}