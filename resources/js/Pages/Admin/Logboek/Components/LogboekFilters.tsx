"use client"

import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { router, usePage } from "@inertiajs/react"
import { FilterX, Search } from "lucide-react"
import type { LogboekFilters as FiltersType } from "../types"

interface LogboekFiltersProps {
  filters: FiltersType
  actieTypes: string[]
  gebruikers: string[]
}

export default function LogboekFilters({ filters, actieTypes, gebruikers }: LogboekFiltersProps) {
  const { route } = usePage().props as { route: (name: string, params?: Record<string, any>) => string }
  const [gebruiker, setGebruiker] = useState<string>(filters.gebruiker || "")
  const [actieType, setActieType] = useState<string>(filters.actieType || "")
  const [zoekterm, setZoekterm] = useState<string>(filters.zoekterm || "")

  const urlParams = new URLSearchParams(window.location.search)
  const sortField = urlParams.get("sort_field") || "created_at"
  const sortDirection = urlParams.get("sort_direction") || "desc"

  const applyFilters = () => {
    router.get(
      route("admin.logboek.index"),
      {
        gebruiker: gebruiker || undefined,
        actieType: actieType || undefined,
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
    setGebruiker("")
    setActieType("")
    setZoekterm("")
    router.get(
      route("admin.logboek.index"),
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
        <div className="space-y-2">
          <Label htmlFor="gebruiker">Gebruiker</Label>
          <Select value={gebruiker} onValueChange={setGebruiker}>
            <SelectTrigger id="gebruiker" className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Alle gebruikers" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 max-h-[300px] text-white overflow-y-auto">
              <SelectItem value="alle">Alle gebruikers</SelectItem>
              {gebruikers.map((naam) => (
                <SelectItem key={naam} value={naam}>
                  {naam}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="actieType">Actie Type</Label>
          <Select value={actieType} onValueChange={setActieType}>
            <SelectTrigger id="actieType" className="bg-zinc-800 border-zinc-700">
              <SelectValue placeholder="Alle acties" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
              <SelectItem value="alle">Alle acties</SelectItem>
              {actieTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {getActieLabel(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zoekterm">Zoekterm</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
            <Input
              id="zoekterm"
              placeholder="Zoek in logboek"
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

function getActieLabel(type: string): string {
  switch (type) {
    case "login":
      return "Inloggen"
    case "create":
      return "Aanmaken"
    case "update":
      return "Bijwerken"
    case "delete":
      return "Verwijderen"
    case "export":
      return "Exporteren"
    default:
      return type
  }
}
