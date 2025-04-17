export interface LogboekItem {
    id: number
    gebruiker: string
    actie_type: string
    beschrijving: string
    data?: string
    created_at: string
    updated_at: string
  }
  
  export interface LogboekPagination {
    data: LogboekItem[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
  }
  
  export interface LogboekFilters {
    gebruiker?: string
    actieType?: string
    zoekterm?: string
    sort_field?: string
    sort_direction?: string
  }
  