"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"
import { Activity, Clock, Laptop, LogIn, LogOut, Monitor, Smartphone, Trash2, Shield } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { router } from "@inertiajs/react"
import { Badge } from "@/Components/ui/badge"

interface LoginSession {
  id: number
  user_id: number
  session_id: string | null
  ip_adres: string
  user_agent: string | null
  apparaat_type: string | null
  browser: string | null
  locatie: string | null
  laatste_activiteit: string
  is_actief: boolean
  is_huidige_sessie?: boolean
  created_at: string
  updated_at: string
}

interface ActivityItem {
  id: number
  gebruiker: string
  actie_type: string
  beschrijving: string
  data?: string
  created_at: string
  updated_at: string
}

interface ActivityLogProps {
  activiteiten: ActivityItem[]
  actieveSessies?: LoginSession[]
}

export default function ActivityLog({ activiteiten, actieveSessies = [] }: ActivityLogProps) {
  const beeindigSessie = (id: number, isHuidigeSessie = false) => {
    if (isHuidigeSessie) {
      if (confirm("Weet je zeker dat je je huidige sessie wilt beëindigen? Je wordt uitgelogd.")) {
        router.delete(`/profiel/sessies/${id}`)
      }
    } else {
      if (confirm("Weet je zeker dat je deze sessie wilt beëindigen?")) {
        router.delete(`/profiel/sessies/${id}`)
      }
    }
  }

  const beeindigAlleSessies = () => {
    if (confirm("Weet je zeker dat je alle andere sessies wilt beëindigen?")) {
      router.delete("/profiel/sessies")
    }
  }

  const getApparaatIcon = (apparaatType: string | null) => {
    switch (apparaatType?.toLowerCase()) {
      case "mobiel":
        return <Smartphone className="h-5 w-5 text-blue-500" />
      case "tablet":
        return <Laptop className="h-5 w-5 text-green-500" />
      default:
        return <Monitor className="h-5 w-5 text-purple-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Actieve sessies */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Sessiebeheer
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Bekijk en beheer je actieve sessies op verschillende apparaten
            </CardDescription>
          </div>

          {actieveSessies.length > 1 && (
            <Button
              variant="outline"
              onClick={beeindigAlleSessies}
              className="border-zinc-700 bg-zinc-800 hover:bg-blue-600 text-white"
            >
              Beëindig alle andere sessies
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {actieveSessies.length > 0 ? (
            <div className="space-y-4">
              {actieveSessies.map((sessie) => (
                <div
                  key={sessie.id}
                  className={`flex items-start justify-between space-x-4 p-4 rounded-md ${
                    sessie.is_huidige_sessie
                      ? "bg-blue-900/20 border border-blue-800"
                      : "bg-zinc-800 border border-zinc-700"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${sessie.is_huidige_sessie ? "bg-blue-800" : "bg-zinc-700"} p-2 rounded-full`}>
                      {getApparaatIcon(sessie.apparaat_type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-zinc-300">
                          {sessie.browser} op {sessie.apparaat_type || "Onbekend apparaat"}
                        </p>
                        {sessie.is_huidige_sessie && (
                          <Badge variant="secondary" className="bg-blue-600 text-white">
                            Huidige sessie
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-zinc-500">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>
                          Laatste activiteit:{" "}
                          {formatDistanceToNow(new Date(sessie.laatste_activiteit), {
                            addSuffix: true,
                            locale: nl,
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500">IP: {sessie.ip_adres}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => beeindigSessie(sessie.id, sessie.is_huidige_sessie)}
                    className={`hover:bg-red-900/20 hover:text-red-500 ${sessie.is_huidige_sessie ? "text-blue-400" : ""}`}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Beëindig sessie</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Monitor className="mx-auto h-8 w-8 text-zinc-500 mb-2" />
              <h3 className="text-sm font-medium text-zinc-300">Geen actieve sessies</h3>
              <p className="text-xs text-zinc-500 mt-1">Er zijn momenteel geen actieve sessies op andere apparaten.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recente activiteiten */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Recente inlogactiviteiten
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Bekijk je recente inlogactiviteiten en andere acties
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activiteiten.length > 0 ? (
            <div className="space-y-4">
              {activiteiten.map((activiteit) => {
                let icon = <Activity className="h-5 w-5 text-blue-500" />

                if (activiteit.actie_type === "login") {
                  icon = <LogIn className="h-5 w-5 text-green-500" />
                } else if (activiteit.actie_type === "logout") {
                  icon = <LogOut className="h-5 w-5 text-red-500" />
                }

                let apparaatInfo = ""
                if (activiteit.data) {
                  try {
                    const data = JSON.parse(activiteit.data)
                    if (data.apparaat_type && data.browser) {
                      apparaatInfo = ` vanaf ${data.apparaat_type} met ${data.browser}`
                    }
                  } catch (e) {
                    console.log("Fout bij het parseren van activiteit data:", e)
                  }
                }

                return (
                  <div key={activiteit.id} className="flex items-start space-x-4">
                    <div className="bg-zinc-800 p-2 rounded-full">{icon}</div>
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
                      {activiteit.data && (
                        <div className="mt-2">
                          <details className="text-xs">
                            <summary className="text-blue-400 cursor-pointer">Details bekijken</summary>
                            <pre className="mt-2 p-2 bg-zinc-800 rounded-md overflow-x-auto text-zinc-300">
                              {JSON.stringify(JSON.parse(activiteit.data), null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
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
    </div>
  )
}
