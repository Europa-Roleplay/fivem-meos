"use client"

import { Button } from "@/Components/ui/button"
import { Download } from "lucide-react"
import { router, usePage } from "@inertiajs/react"

export default function LogboekHeader() {
  const { route } = usePage().props as { route: (name: string, params?: Record<string, any>) => string }

  const handleExport = () => {
    router.get(route("admin.logboek.export"))
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Logboek</h1>
        <p className="text-zinc-400">Bekijk alle acties die zijn uitgevoerd in het systeem</p>
      </div>
      {/*}
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
      >
        <Download className="mr-2 h-4 w-4" />
        Exporteer
      </Button>*/}
    </div>
  )
}
