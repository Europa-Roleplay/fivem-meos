import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import { Activity, Clock } from "lucide-react"
import type { LogboekItem } from "@/Pages/Admin/Logboek/types"

interface ActivityLogProps {
  activiteiten: LogboekItem[]
}

export default function ActivityLog({ activiteiten }: ActivityLogProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Recente activiteiten</CardTitle>
        <CardDescription className="text-zinc-400">
          Bekijk je recente inlogactiviteiten en andere acties
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activiteiten.length > 0 ? (
          <div className="space-y-4">
            {activiteiten.map((activiteit) => (
              <div key={activiteit.id} className="flex items-start space-x-4">
                <div className="bg-zinc-800 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-zinc-300">{activiteit.beschrijving}</p>
                  <div className="flex items-center text-xs text-zinc-500">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>
                      {formatDistanceToNow(new Date(activiteit.created_at), {
                        addSuffix: true,
                        locale: nl,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Activity className="mx-auto h-8 w-8 text-zinc-500 mb-2" />
            <h3 className="text-sm font-medium text-zinc-300">Geen recente activiteiten</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Er zijn nog geen recente inlogactiviteiten geregistreerd voor je account.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
