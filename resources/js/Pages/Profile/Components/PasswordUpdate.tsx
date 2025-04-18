"use client"

import type React from "react"

import { useForm } from "@inertiajs/react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Separator } from "@/Components/ui/separator"
import { Mail } from "lucide-react"
import { router } from "@inertiajs/react"

export default function PasswordUpdate() {
  const { data, setData, processing, errors, reset } = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    router.put("/profiel/password", data, {
      onSuccess: () => {
        reset()
      },
    })
  }

  const sendResetLink = () => {
    router.post("/profiel/password-reset")
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Wachtwoord wijzigen</CardTitle>
        <CardDescription className="text-zinc-400">
          Zorg ervoor dat je een sterk wachtwoord gebruikt voor je account
        </CardDescription>
      </CardHeader>
      <form onSubmit={submit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current_password" className="text-zinc-300">
              Huidig wachtwoord
            </Label>
            <Input
              id="current_password"
              type="password"
              value={data.current_password}
              onChange={(e) => setData("current_password", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.current_password && <p className="text-red-500 text-sm">{errors.current_password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">
              Nieuw wachtwoord
            </Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation" className="text-zinc-300">
              Bevestig nieuw wachtwoord
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <Separator className="my-4 bg-zinc-800" />

          <div className="text-sm text-zinc-400">
            <p>Wachtwoord vergeten of wil je het op een andere manier wijzigen?</p>
            <Button
              type="button"
              variant="outline"
              onClick={sendResetLink}
              className="mt-2 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Stuur wachtwoord reset link
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={processing} className="bg-blue-500 hover:bg-blue-600 text-white">
            {processing ? "Bezig met opslaan..." : "Wachtwoord wijzigen"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
