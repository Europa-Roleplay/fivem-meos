"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { AlertTriangle, Trash2 } from "lucide-react"
import { router } from "@inertiajs/react"

export default function AccountDeletion() {
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { data, setData, processing, errors, reset } = useForm({
    password: "",
    confirm_deletion: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      confirm("Weet je ABSOLUUT ZEKER dat je je account wilt verwijderen? Deze actie kan NIET ongedaan worden gemaakt!")
    ) {
      router.delete(route("profile.destroy"), {
        data,
        onSuccess: () => {
          reset()
        },
      })
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800 border-red-500">
      <CardHeader className="bg-red-900/20">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <CardTitle className="text-red-500">Gevaarlijke zone</CardTitle>
        </div>
        <CardDescription className="text-zinc-400">
          Eenmaal verwijderd, kunnen al je gegevens en activiteiten niet meer worden hersteld
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {!showConfirmation ? (
          <div className="space-y-4">
            <div className="rounded-md bg-red-900/20 p-4 border border-red-800">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-500">Waarschuwing: Onomkeerbare actie</h3>
                  <div className="mt-2 text-sm text-zinc-400">
                    <p>Het verwijderen van je account heeft de volgende gevolgen:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Al je persoonlijke gegevens worden permanent verwijderd</li>
                      <li>Je hebt geen toegang meer tot het systeem</li>
                      <li>Alle gekoppelde gegevens en activiteiten worden ontkoppeld</li>
                      <li>Deze actie kan niet ongedaan worden gemaakt</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="destructive"
              onClick={() => setShowConfirmation(true)}
              className="w-full bg-red-700 hover:bg-red-800"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Ik begrijp de gevolgen, ga door met account verwijderen
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">
                Huidig wachtwoord
              </Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm_deletion" className="text-zinc-300">
                Typ "DELETE" om te bevestigen
              </Label>
              <Input
                id="confirm_deletion"
                value={data.confirm_deletion}
                onChange={(e) => setData("confirm_deletion", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
                placeholder="DELETE"
                required
              />
              {errors.confirm_deletion && <p className="text-red-500 text-sm">{errors.confirm_deletion}</p>}
            </div>

            <div className="rounded-md bg-red-900/20 p-4 border border-red-800">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-500">Laatste waarschuwing</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Je staat op het punt je account permanent te verwijderen. Deze actie kan NIET ongedaan worden
                    gemaakt. Alle gegevens worden permanent verwijderd.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="flex-1 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                Annuleren
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={processing || data.confirm_deletion !== "DELETE"}
                className="flex-1 bg-red-700 hover:bg-red-800"
              >
                {processing ? "Bezig met verwijderen..." : "Account permanent verwijderen"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
