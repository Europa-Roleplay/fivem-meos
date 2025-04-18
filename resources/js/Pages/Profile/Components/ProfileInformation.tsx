"use client"

import type React from "react"

import { useForm } from "@inertiajs/react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import type { User } from "@/types"
import { router } from "@inertiajs/react"

interface ProfileInformationProps {
  user: User
}

export default function ProfileInformation({ user }: ProfileInformationProps) {
  const { data, setData, processing, errors } = useForm({
    name: user.name,
    email: user.email,
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    router.put("/profiel/update", data)
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Profielinformatie</CardTitle>
        <CardDescription className="text-zinc-400">
          Werk je persoonlijke gegevens bij zoals je naam en e-mailadres
        </CardDescription>
      </CardHeader>
      <form onSubmit={submit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300">
              Naam
            </Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.name && <p className="text-blue-500 text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              E-mailadres
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            {errors.email && <p className="text-blue-500 text-sm">{errors.email}</p>}
            <p className="text-xs text-zinc-500">
              Bij het wijzigen van je e-mailadres kan een verificatie e-mail worden verzonden.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={processing} className="bg-blue-500 hover:bg-blue-600 text-white">
            {processing ? "Bezig met opslaan..." : "Opslaan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
