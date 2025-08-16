// API Route: /api/company/[number]
import { NextRequest, NextResponse } from 'next/server'
import { CompaniesHouseAPI } from '@/lib/companies-house'
import { AIAnalysisService } from '@/lib/ai-analysis'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  try {
    const { number } = await params

    if (!number) {
      return NextResponse.json(
        { error: 'Company number is required' },
        { status: 400 }
      )
    }

    // Initialize services
    const companiesHouseAPI = new CompaniesHouseAPI()
    const aiService = new AIAnalysisService()

    // Fetch company data
    const company = await companiesHouseAPI.getCompanyProfile(number)
    
    // Generate AI analysis
    const analysis = await aiService.analyzeCompany(company)

    return NextResponse.json({
      company,
      analysis,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('API Error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes('not found') ? 404 : 500 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}