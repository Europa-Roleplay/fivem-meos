"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { router } from "@inertiajs/react"
import { useState } from "react"
import Paginator from "@/assets/Paginator"
import type { LogboekPagination } from "../types"

interface LogboekTabelProps {
  logboek: LogboekPagination
}

type SortField = "created_at" | "gebruiker" | "actie_type" | "beschrijving"
type SortDirection = "asc" | "desc"

export default function LogboekTabel({ logboek }: LogboekTabelProps) {
  const [sortField, setSortField] = useState<SortField>("created_at")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const getBadgeVariant = (
    type: string,
  ): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" => {
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

  const handleSort = (field: SortField) => {
    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    router.get(
      "/admin/logboek",
      {
        sort_field: field,
        sort_direction: newDirection,
        page: logboek.current_page,
      },
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

  const formatJsonData = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString)
      return JSON.stringify(data, null, 2)
    } catch (e) {
      return jsonString
    }
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
                <TableCell className="font-medium text-zinc-300">
                  {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                    locale: nl,
                  })}
                </TableCell>
                <TableCell className="text-zinc-300">{item.gebruiker}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(item.actie_type)}>{getActieLabel(item.actie_type)}</Badge>
                </TableCell>
                <TableCell className="max-w-[300px] truncate text-zinc-300">{item.beschrijving}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                        <Info className="h-4 w-4 text-white" />
                        <span className="sr-only">Details</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md bg-zinc-900 border-zinc-800">
                      <DialogHeader>
                        <DialogTitle className="text-white">Logboek Details</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-[60vh]">
                        <div className="space-y-4 p-4">
                          <div>
                            <h3 className="font-semibold text-zinc-300">Tijdstip</h3>
                            <p className="text-zinc-300">{new Date(item.created_at).toLocaleString("nl-NL")}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-zinc-300">Gebruiker</h3>
                            <p className="text-zinc-300">{item.gebruiker}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-zinc-300">Actie</h3>
                            <Badge variant={getBadgeVariant(item.actie_type)}>{getActieLabel(item.actie_type)}</Badge>
                          </div>
                          <div>
                            <h3 className="font-semibold text-zinc-300">Beschrijving</h3>
                            <p className="text-zinc-300">{item.beschrijving}</p>
                          </div>
                          {item.data && (
                            <div>
                              <h3 className="font-semibold text-zinc-300">Gegevens</h3>
                              <pre className="mt-2 w-full rounded-md bg-zinc-950 p-4 overflow-x-auto text-zinc-300 text-sm">
                                <code>{formatJsonData(item.data)}</code>
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
        <Paginator data={logboek} />
      </div>
    </div>
  )
}
