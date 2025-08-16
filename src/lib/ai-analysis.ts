// AI Analysis Service for Company Intelligence
import { CompanyProfile } from './companies-house'

export interface CompanyAnalysis {
  riskScore: number // 0-100
  riskFactors: string[]
  businessSummary: string
  keyInsights: string[]
  recommendations: string[]
}

export class AIAnalysisService {
  private apiKey: string

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required')
    }
  }

  async analyzeCompany(company: CompanyProfile): Promise<CompanyAnalysis> {
    const prompt = this.buildAnalysisPrompt(company)

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a financial analyst specializing in UK company risk assessment. Analyze company data and provide structured insights in JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      const analysisText = data.choices[0]?.message?.content

      if (!analysisText) {
        throw new Error('No analysis generated')
      }

      return this.parseAnalysis(analysisText, company)
    } catch (error) {
      console.error('AI Analysis error:', error)
      return this.getFallbackAnalysis(company)
    }
  }

  private buildAnalysisPrompt(company: CompanyProfile): string {
    return `
Analyze this UK company and provide a risk assessment:

Company: ${company.company_name}
Number: ${company.company_number}
Status: ${company.company_status}
Type: ${company.company_type}
Incorporated: ${company.date_of_creation}
SIC Codes: ${company.sic_codes?.join(', ') || 'Not specified'}

Please provide analysis in this JSON format:
{
  "riskScore": number (0-100, where 0 is lowest risk),
  "riskFactors": ["factor1", "factor2"],
  "businessSummary": "brief summary",
  "keyInsights": ["insight1", "insight2"],
  "recommendations": ["rec1", "rec2"]
}

Consider factors like:
- Company status and type
- Age of company
- Industry sector (SIC codes)
- Any red flags in the data
`
  }

  private parseAnalysis(analysisText: string, company: CompanyProfile): CompanyAnalysis {
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          riskScore: parsed.riskScore || 50,
          riskFactors: parsed.riskFactors || [],
          businessSummary: parsed.businessSummary || 'Analysis not available',
          keyInsights: parsed.keyInsights || [],
          recommendations: parsed.recommendations || []
        }
      }
    } catch (error) {
      console.error('Failed to parse AI analysis:', error)
    }

    return this.getFallbackAnalysis(company)
  }

  private getFallbackAnalysis(company: CompanyProfile): CompanyAnalysis {
    const age = this.calculateCompanyAge(company.date_of_creation)
    const isActive = company.company_status.toLowerCase() === 'active'
    
    return {
      riskScore: isActive ? (age > 2 ? 25 : 45) : 75,
      riskFactors: isActive ? [] : ['Company not active'],
      businessSummary: `UK ${company.company_type} established in ${new Date(company.date_of_creation).getFullYear()}`,
      keyInsights: [
        `Company age: ${age} years`,
        `Status: ${company.company_status}`,
        `Type: ${company.company_type}`
      ],
      recommendations: isActive 
        ? ['Review recent filings', 'Monitor compliance status']
        : ['Investigate company status', 'Verify current operations']
    }
  }

  private calculateCompanyAge(dateOfCreation: string): number {
    const created = new Date(dateOfCreation)
    const now = new Date()
    return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 365))
  }
}