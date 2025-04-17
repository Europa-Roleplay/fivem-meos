export interface Boete {
  id: number
  artikel_nummer: string
  titel: string
  beschrijving: string | null
  categorie: string
  bedrag: number
  veroordeling: string
  created_at: string
  updated_at: string
}

export interface BoetePagination {
  data: Boete[]
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

export interface BoeteFilters {
  categorie?: string
  artikel?: string
  zoekterm?: string
  sort_field?: string
  sort_direction?: string
}
