import { Head } from "@inertiajs/react"
import BoeteFilters from "./Components/BoeteFilters"
import BoeteTabel from "./Components/BoeteTabel"
import BoeteHeader from "./Components/BoeteHeader"
import AdminLayout from "@/Layouts/AdminLayout"
import type { BoetePagination, BoeteFilters as FiltersType } from "./types"

interface IndexProps {
  boetes: BoetePagination
  filters: FiltersType
  categorieën: string[]
  artikelen: string[]
}

export default function Index({ boetes, filters, categorieën, artikelen }: IndexProps) {
  return (
    <AdminLayout>
      <Head title="Boetes" />
      <div className="container mx-auto py-6 space-y-6 bg-zinc-950 text-white min-h-screen">
        <BoeteHeader />
        <BoeteFilters filters={filters} categorieën={categorieën} artikelen={artikelen} />
        <BoeteTabel boetes={boetes} />
      </div>
    </AdminLayout>
  )
}
