"use client"

import type React from "react"

import { Head, useForm } from "@inertiajs/react"
import AdminLayout from "@/Layouts/AdminLayout"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { useState } from "react"
import type { Boete } from "./types"

interface EditProps {
  boete: Boete
  categorieën: string[]
}

export default function Edit({ boete, categorieën }: EditProps) {
  const { data, setData, put, processing, errors } = useForm({
    artikel_nummer: boete.artikel_nummer,
    titel: boete.titel,
    beschrijving: boete.beschrijving || "",
    categorie: boete.categorie,
    bedrag: boete.bedrag.toString(),
    veroordeling: boete.veroordeling,
  })

  const isBestaandeCategorie = categorieën.includes(data.categorie)

  const [isNieuweCategorie, setIsNieuweCategorie] = useState<boolean>(!isBestaandeCategorie)
  const [customCategorie, setCustomCategorie] = useState<string>(isBestaandeCategorie ? "" : data.categorie)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/admin/boetes/${boete.id}`)
  }

  const selectValue = isNieuweCategorie ? "nieuw" : data.categorie

  return (
    <AdminLayout>
      <Head title="Boete Bewerken" />
      <div className="container mx-auto py-6 space-y-6 bg-zinc-950 text-white min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Boete Bewerken</h1>
            <p className="text-zinc-400">Bewerk de gegevens van deze boete</p>
          </div>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Boete Gegevens</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="artikel_nummer" className="text-zinc-300">
                    Artikel Nummer
                  </Label>
                  <Input
                    id="artikel_nummer"
                    value={data.artikel_nummer}
                    onChange={(e) => setData("artikel_nummer", e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Bijv. I-1"
                  />
                  {errors.artikel_nummer && <p className="text-red-500 text-sm">{errors.artikel_nummer}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="titel" className="text-zinc-300">
                    Titel
                  </Label>
                  <Input
                    id="titel"
                    value={data.titel}
                    onChange={(e) => setData("titel", e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="Titel van de boete"
                  />
                  {errors.titel && <p className="text-red-500 text-sm">{errors.titel}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="beschrijving" className="text-zinc-300">
                    Beschrijving
                  </Label>
                  <Textarea
                    id="beschrijving"
                    value={data.beschrijving}
                    onChange={(e) => setData("beschrijving", e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                    placeholder="Beschrijving van de boete"
                  />
                  {errors.beschrijving && <p className="text-red-500 text-sm">{errors.beschrijving}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categorie" className="text-zinc-300">
                    Categorie
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={selectValue}
                      onValueChange={(value) => {
                        if (value === "nieuw") {
                          // Schakel naar nieuwe categorie modus
                          setIsNieuweCategorie(true)
                          // Behoud de huidige waarde in het input veld als het een aangepaste categorie was
                          if (!isBestaandeCategorie) {
                            setCustomCategorie(data.categorie)
                          }
                        } else {
                          // Schakel naar bestaande categorie modus
                          setIsNieuweCategorie(false)
                          setData("categorie", value)
                        }
                      }}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Selecteer een categorie" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                        {categorieën.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                        <SelectItem value="nieuw">Nieuwe categorie</SelectItem>
                      </SelectContent>
                    </Select>
                    {isNieuweCategorie && (
                      <Input
                        value={customCategorie}
                        onChange={(e) => {
                          const newValue = e.target.value
                          setCustomCategorie(newValue)
                          setData("categorie", newValue)
                        }}
                        className="bg-zinc-800 border-zinc-700 text-white"
                        placeholder="Nieuwe categorie"
                        autoFocus
                      />
                    )}
                  </div>
                  {errors.categorie && <p className="text-red-500 text-sm">{errors.categorie}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bedrag" className="text-zinc-300">
                    Bedrag (€)
                  </Label>
                  <Input
                    id="bedrag"
                    type="number"
                    step="0.01"
                    min="0"
                    value={data.bedrag}
                    onChange={(e) => setData("bedrag", e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="0.00"
                  />
                  {errors.bedrag && <p className="text-red-500 text-sm">{errors.bedrag}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="veroordeling" className="text-zinc-300">
                    Veroordeling
                  </Label>
                  <Select value={data.veroordeling} onValueChange={(value) => setData("veroordeling", value)}>
                    <SelectTrigger id="veroordeling" className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectValue placeholder="Selecteer een veroordeling" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="Eerste Veroordeling">Eerste Veroordeling</SelectItem>
                      <SelectItem value="Tweede Veroordeling">Tweede Veroordeling</SelectItem>
                      <SelectItem value="Meerdere Veroordelingen">Meerdere Veroordelingen</SelectItem>
                      <SelectItem value="Algemeen">Algemeen</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.veroordeling && <p className="text-red-500 text-sm">{errors.veroordeling}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white"
                  onClick={() => window.history.back()}
                >
                  Annuleren
                </Button>
                <Button type="submit" disabled={processing} className="bg-red-500 hover:bg-red-600 text-white">
                  {processing ? "Bezig met opslaan..." : "Boete opslaan"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
