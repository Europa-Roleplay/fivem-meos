"use client"

import { Button } from "@/Components/ui/button"
import { Download } from "lucide-react"
import { useRef } from "react"

export default function LogboekHeader() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleExport = () => {
    if (formRef.current) {
      formRef.current.submit()
    }
  }

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
        <h1 className="text-2xl font-bold tracking-tight text-white">Logboek</h1>
        <p className="text-zinc-400">Bekijk alle acties die zijn uitgevoerd in het systeem</p>
      </div>

      <form ref={formRef} action="/admin/logboek/export" method="get" target="_blank" className="hidden">
        {Object.entries(currentParams).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
      </form>

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
