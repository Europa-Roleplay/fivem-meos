"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Button } from "@/Components/ui/button"
import { ChevronDown, ChevronUp, Edit, Info, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { router } from "@inertiajs/react"
import { useState } from "react"
import Paginator from "@/assets/Paginator"
import type { BoetePagination } from "../types"
import { Link } from "@inertiajs/react"
import { formatCurrency } from "@/lib/utils"

interface BoeteTabelProps {
  boetes: BoetePagination
}

type SortField = "artikel_nummer" | "titel" | "categorie" | "bedrag" | "veroordeling"
type SortDirection = "asc" | "desc"

export default function BoeteTabel({ boetes }: BoeteTabelProps) {
  const [sortField, setSortField] = useState<SortField>("artikel_nummer")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleSort = (field: SortField) => {
    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    router.get(
      "/admin/boetes",
      {
        sort_field: field,
        sort_direction: newDirection,
        page: boetes.current_page,
      },
      {
        preserveState: true,
        replace: true,
        only: ["boetes"],
      },
    )
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return <ChevronDown className="h-4 w-4 opacity-50" />
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  const handleDelete = (id: number) => {
    if (confirm("Weet je zeker dat je deze boete wilt verwijderen?")) {
      router.delete(`/admin/boetes/${id}`)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-zinc-800">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800 hover:bg-zinc-800">
              <TableHead
                className="w-[100px] text-zinc-400 cursor-pointer"
                onClick={() => handleSort("artikel_nummer")}
              >
                <div className="flex items-center">
                  Artikel
                  <SortIcon field="artikel_nummer" />
                </div>
              </TableHead>
              <TableHead className="text-zinc-400 cursor-pointer" onClick={() => handleSort("titel")}>
                <div className="flex items-center">
                  Titel
                  <SortIcon field="titel" />
                </div>
              </TableHead>
              <TableHead className="text-zinc-400 cursor-pointer" onClick={() => handleSort("categorie")}>
                <div className="flex items-center">
                  Categorie
                  <SortIcon field="categorie" />
                </div>
              </TableHead>
              <TableHead className="text-zinc-400 cursor-pointer" onClick={() => handleSort("bedrag")}>
                <div className="flex items-center">
                  Bedrag
                  <SortIcon field="bedrag" />
                </div>
              </TableHead>
              <TableHead className="text-zinc-400 cursor-pointer" onClick={() => handleSort("veroordeling")}>
                <div className="flex items-center">
                  Veroordeling
                  <SortIcon field="veroordeling" />
                </div>
              </TableHead>
              <TableHead className="w-[120px] text-zinc-400"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boetes.data.map((boete) => (
              <TableRow key={boete.id} className="border-zinc-800 hover:bg-zinc-900">
                <TableCell className="font-medium text-zinc-300">{boete.artikel_nummer}</TableCell>
                <TableCell className="text-zinc-300 max-w-[300px] truncate">{boete.titel}</TableCell>
                <TableCell className="text-zinc-300">{boete.categorie}</TableCell>
                <TableCell className="text-zinc-300">{formatCurrency(boete.bedrag)}</TableCell>
                <TableCell className="text-zinc-300">{boete.veroordeling}</TableCell>
                <TableCell>
                  <div className="flex gap-2 justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                          <Info className="h-4 w-4" />
                          <span className="sr-only">Details</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                          <DialogTitle className="text-white">Boete Details</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="max-h-[60vh]">
                          <div className="space-y-4 p-4">
                            <div>
                              <h3 className="font-semibold text-zinc-300">Artikel</h3>
                              <p className="text-zinc-300">{boete.artikel_nummer}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-zinc-300">Titel</h3>
                              <p className="text-zinc-300">{boete.titel}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-zinc-300">Beschrijving</h3>
                              <p className="text-zinc-300">{boete.beschrijving || "Geen beschrijving"}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-zinc-300">Categorie</h3>
                              <p className="text-zinc-300">{boete.categorie}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-zinc-300">Bedrag</h3>
                              <p className="text-zinc-300">{formatCurrency(boete.bedrag)}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-zinc-300">Veroordeling</h3>
                              <p className="text-zinc-300">{boete.veroordeling}</p>
                            </div>
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>

                    <Button variant="ghost" size="icon" className="hover:bg-zinc-800" asChild>
                      <Link href={`/admin/boetes/${boete.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Bewerken</span>
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-zinc-800 hover:text-red-500"
                      onClick={() => handleDelete(boete.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Verwijderen</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">
          Pagina {boetes.current_page} van {boetes.last_page} ({boetes.total} items)
        </div>
        <Paginator data={boetes} />
      </div>
    </div>
  )
}
