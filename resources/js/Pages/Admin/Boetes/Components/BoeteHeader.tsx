"use client"

import { Button } from "@/Components/ui/button"
import { Download, Plus } from "lucide-react"
import { useRef } from "react"
import { Link } from "@inertiajs/react"

export default function BoeteHeader() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleExport = () => {
    if (formRef.current) {
      formRef.current.submit()
    }
  }

  // Haal de huidige URL parameters op
  const getCurrentParams = () => {
    const params: Record<string, string> = {}
    const searchParams = new URLSearchParams(window.location.search)

    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }

    return params
  }

  const currentParams = getCurrentParams()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Boetes</h1>
        <p className="text-zinc-400">Beheer alle boetes uit het wetboek</p>
      </div>

      <div className="flex gap-2">
        {/* Verborgen formulier voor export */}
        <form ref={formRef} action="/admin/boetes/export" method="get" target="_blank" className="hidden">
          {Object.entries(currentParams).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
        </form>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Exporteer
        </Button>

        <Button variant="default" size="sm" className="bg-red-500 hover:bg-red-600 text-white" asChild>
          <Link href="/admin/boetes/create">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Boete
          </Link>
        </Button>
      </div>
    </div>
  )
}
