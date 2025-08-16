// Companies House API Client
// Official API docs: https://developer.company-information.service.gov.uk/

export interface CompanyProfile {
  company_number: string
  company_name: string
  company_status: string
  company_type: string
  date_of_creation: string
  registered_office_address: {
    address_line_1?: string
    address_line_2?: string
    locality?: string
    postal_code?: string
    country?: string
  }
  sic_codes?: string[]
  accounts?: {
    next_due?: string
    last_accounts?: {
      made_up_to?: string
      type?: string
    }
  }
}

export interface CompanySearchResult {
  items: {
    company_number: string
    title: string
    company_status: string
    company_type: string
    address_snippet: string
    date_of_creation: string
  }[]
  total_results: number
}

export class CompaniesHouseAPI {
  private baseUrl = 'https://api.company-information.service.gov.uk'
  private apiKey: string

  constructor() {
    this.apiKey = process.env.COMPANIES_HOUSE_API_KEY || ''
    if (!this.apiKey) {
      throw new Error('COMPANIES_HOUSE_API_KEY environment variable is required')
    }
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}`,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Company not found')
        }
        if (response.status === 401) {
          throw new Error('Invalid API key')
        }
        if (response.status === 429) {
          throw new Error('Rate limit exceeded')
        }
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error occurred')
    }
  }

  async searchCompanies(query: string, itemsPerPage = 20): Promise<CompanySearchResult> {
    const encodedQuery = encodeURIComponent(query)
    return this.makeRequest<CompanySearchResult>(
      `/search/companies?q=${encodedQuery}&items_per_page=${itemsPerPage}`
    )
  }

  async getCompanyProfile(companyNumber: string): Promise<CompanyProfile> {
    return this.makeRequest<CompanyProfile>(`/company/${companyNumber}`)
  }

  async getCompanyOfficers(companyNumber: string) {
    return this.makeRequest(`/company/${companyNumber}/officers`)
  }

  async getCompanyPSCs(companyNumber: string) {
    return this.makeRequest(`/company/${companyNumber}/persons-with-significant-control`)
  }
}