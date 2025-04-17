import { Head } from "@inertiajs/react"
import LogboekFilters from "./Components/LogboekFilters"
import LogboekTabel from "./Components/LogboekTabel"
import LogboekHeader from "./Components/LogboekHeader"
import AdminLayout from "@/Layouts/AdminLayout"
import type { LogboekPagination, LogboekFilters as FiltersType } from "./types"

interface IndexProps {
  logboek: LogboekPagination
  filters: FiltersType
}

export default function Index({ logboek, filters }: IndexProps) {
  return (
    <AdminLayout>
      <Head title="Logboek" />
      <div className="container mx-auto py-6 space-y-6 dark">
        <LogboekHeader />
        <LogboekFilters filters={filters} />
        <LogboekTabel logboek={logboek} />
      </div>
    </AdminLayout>
  )
}
