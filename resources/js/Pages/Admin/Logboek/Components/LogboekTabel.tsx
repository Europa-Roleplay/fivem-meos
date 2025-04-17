"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsLeft, ChevronsRight, Info } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { router, usePage } from "@inertiajs/react"
import { useState } from "react"
import type { LogboekPagination } from "../types"

interface LogboekTabelProps {
  logboek: LogboekPagination
}

type SortField = "created_at" | "gebruiker" | "actie_type" | "beschrijving"
type SortDirection = "asc" | "desc"

export default function LogboekTabel({ logboek }: LogboekTabelProps) {
  const { route } = usePage().props as { route: (name: string, params?: Record<string, any>) => string }
  const [sortField, setSortField] = useState<SortField>("created_at")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const getBadgeVariant = (
    type: string,
  ): "default" | "success" | "warning" | "destructive" | "outline" | "secondary" => {
    switch (type) {
      case "login":
        return "default"
      case "create":
        return "success"
      case "update":
        return "warning"
      case "delete":
        return "destructive"
      case "export":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getActieLabel = (type: string): string => {
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

  const handlePageChange = (page: number) => {
    router.get(
      route("admin.logboek.index", {
        page,
        sort_field: sortField,
        sort_direction: sortDirection,
      }),
      {},
      {
        preserveState: true,
        replace: true,
        only: ["logboek"],
      },
    )
  }

  const handleSort = (field: SortField) => {
    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    router.get(
      route("admin.logboek.index", {
        sort_field: field,
        sort_direction: newDirection,
        page: logboek.current_page,
      }),
      {},
      {
        preserveState: true,
        replace: true,
        only: ["logboek"],
      },
    )
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return <ChevronDown className="h-4 w-4 opacity-50" />
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-zinc-800">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800 hover:bg-zinc-800">
              <TableHead className="w-[180px] text-zinc-400 cursor-pointer" onClick={() => handleSort("created_at")}>
                <div className="flex items-center">
                  Tijdstip
                  <SortIcon field="created_at" />
                </div>
              </TableHead>
              <TableHead className="text-zinc-400 cursor-pointer" onClick={() => handleSort("gebruiker")}>
                <div className="flex items-center">
                  Gebruiker
                  <SortIcon field="gebruiker" />
                </div>
              </TableHead>
              <TableHead className="text-zinc-400 cursor-pointer" onClick={() => handleSort("actie_type")}>
                <div className="flex items-center">
                  Actie
                  <SortIcon field="actie_type" />
                </div>
              </TableHead>
              <TableHead className="text-zinc-400 cursor-pointer" onClick={() => handleSort("beschrijving")}>
                <div className="flex items-center">
                  Beschrijving
                  <SortIcon field="beschrijving" />
                </div>
              </TableHead>
              <TableHead className="w-[70px] text-zinc-400"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logboek.data.map((item) => (
              <TableRow key={item.id} className="border-zinc-800 hover:bg-zinc-900">
                <TableCell className="font-medium">
                  {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                    locale: nl,
                  })}
                </TableCell>
                <TableCell>{item.gebruiker}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(item.actie_type)}>{getActieLabel(item.actie_type)}</Badge>
                </TableCell>
                <TableCell className="max-w-[300px] truncate">{item.beschrijving}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Details</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-zinc-900 border-zinc-800">
                      <DialogHeader>
                        <DialogTitle>Logboek Details</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <div className="space-y-4 p-4">
                          <div>
                            <h3 className="font-semibold">Tijdstip</h3>
                            <p>{new Date(item.created_at).toLocaleString("nl-NL")}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Gebruiker</h3>
                            <p>{item.gebruiker}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Actie</h3>
                            <Badge variant={getBadgeVariant(item.actie_type)}>{getActieLabel(item.actie_type)}</Badge>
                          </div>
                          <div>
                            <h3 className="font-semibold">Beschrijving</h3>
                            <p>{item.beschrijving}</p>
                          </div>
                          {item.data && (
                            <div>
                              <h3 className="font-semibold">Gegevens</h3>
                              <pre className="mt-2 w-full rounded-md bg-zinc-950 p-4 overflow-x-auto">
                                <code className="text-white">{JSON.stringify(JSON.parse(item.data), null, 2)}</code>
                              </pre>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">
          Pagina {logboek.current_page} van {logboek.last_page} ({logboek.total} items)
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={logboek.current_page === 1}
            className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Eerste pagina</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(logboek.current_page - 1)}
            disabled={logboek.current_page === 1}
            className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Vorige pagina</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(logboek.current_page + 1)}
            disabled={logboek.current_page === logboek.last_page}
            className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Volgende pagina</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(logboek.last_page)}
            disabled={logboek.current_page === logboek.last_page}
            className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Laatste pagina</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
