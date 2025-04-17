"use client"

import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { router } from "@inertiajs/react"
import { FilterX, Search } from "lucide-react"
import type { BoeteFilters as FiltersType } from "../types"

interface BoeteFiltersProps {
  filters: FiltersType
  categorieën: string[]
  artikelen: string[]
}

export default function BoeteFilters({ filters, categorieën, artikelen }: BoeteFiltersProps) {
  const [categorie, setCategorie] = useState<string>(filters.categorie || "")
  const [artikel, setArtikel] = useState<string>(filters.artikel || "")
  const [zoekterm, setZoekterm] = useState<string>(filters.zoekterm || "")

  // Haal de huidige sorteervelden op uit de URL
  const urlParams = new URLSearchParams(window.location.search)
  const sortField = urlParams.get("sort_field") || "artikel_nummer"
  const sortDirection = urlParams.get("sort_direction") || "asc"

  const applyFilters = () => {
    router.get(
      "/admin/boetes",
      {
        categorie: categorie || undefined,
        artikel: artikel || undefined,
        zoekterm: zoekterm || undefined,
        sort_field: sortField,
        sort_direction: sortDirection,
      },
      {
        preserveState: true,
        replace: true,
      },
    )
  }

  const resetFilters = () => {
    setCategorie("")
    setArtikel("")
    setZoekterm("")
    router.get(
      "/admin/boetes",
      {
        sort_field: sortField,
        sort_direction: sortDirection,
      },
      {
        preserveState: true,
        replace: true,
      },
    )
  }

  return (
    <Card className="p-4 bg-zinc-900 border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 text-white">
          <Label htmlFor="categorie">Categorie</Label>
          <Select value={categorie} onValueChange={setCategorie}>
            <SelectTrigger id="categorie" className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Alle categorieën" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 max-h-[300px] text-white">
              <SelectItem value="alle">Alle categorieën</SelectItem>
              {categorieën.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 text-white">
          <Label htmlFor="artikel">Artikel</Label>
          <Select value={artikel} onValueChange={setArtikel}>
            <SelectTrigger id="artikel" className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Alle artikelen" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 max-h-[300px] text-white">
              <SelectItem value="alle">Alle artikelen</SelectItem>
              {artikelen.map((art) => (
                <SelectItem key={art} value={art}>
                  Artikel {art}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 text-white">
          <Label htmlFor="zoekterm">Zoekterm</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
            <Input
              id="zoekterm"
              placeholder="Zoek in boetes"
              className="pl-8 bg-zinc-800 border-zinc-700"
              value={zoekterm}
              onChange={(e) => setZoekterm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={resetFilters} className="border-zinc-700 hover:bg-zinc-800">
          <FilterX className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={applyFilters} className="bg-red-500 hover:bg-red-600 text-white">
          Filters toepassen
        </Button>
      </div>
    </Card>
  )
}
