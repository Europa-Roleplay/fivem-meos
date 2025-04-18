"use client"

import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Switch } from "@/Components/ui/switch"
import { Label } from "@/Components/ui/label"
import { Shield, Smartphone } from "lucide-react"

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionManagementEnabled, setSessionManagementEnabled] = useState(false)

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Beveiligingsinstellingen</CardTitle>
        <CardDescription className="text-zinc-400">Beheer de beveiligingsinstellingen van je account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-zinc-300">Twee-factor authenticatie</Label>
            <p className="text-xs text-zinc-500">
              Voeg een extra beveiligingslaag toe aan je account met twee-factor authenticatie
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
            disabled
            aria-label="Twee-factor authenticatie"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-zinc-300">Sessiebeheer</Label>
            <p className="text-xs text-zinc-500">Beheer en beëindig actieve sessies op andere apparaten</p>
          </div>
          <Switch
            checked={sessionManagementEnabled}
            onCheckedChange={setSessionManagementEnabled}
            disabled
            aria-label="Sessiebeheer"
          />
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white"
            disabled
          >
            <Shield className="mr-2 h-4 w-4" />
            Beveiligingsinstellingen configureren
          </Button>
        </div>

        <div className="rounded-md bg-zinc-800 p-4 border border-zinc-700">
          <div className="flex">
            <Smartphone className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-zinc-300">Twee-factor authenticatie komt binnenkort</h3>
              <p className="mt-1 text-xs text-zinc-500">
                Deze functie is momenteel in ontwikkeling en zal binnenkort beschikbaar zijn voor alle gebruikers.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
