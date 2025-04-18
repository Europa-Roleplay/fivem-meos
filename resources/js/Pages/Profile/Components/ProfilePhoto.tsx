"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Camera, Trash2, Upload } from "lucide-react"
import type { User } from "@/types"

interface ProfilePhotoProps {
  user: User & {
    profile_photo_path: string | null
  }
  hasProfilePhoto: boolean
}

export default function ProfilePhoto({ user, hasProfilePhoto }: ProfilePhotoProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    data,
    setData,
    post,
    delete: destroy,
    processing,
    errors,
    progress,
    reset,
  } = useForm({
    photo: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData("photo", file)

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data.photo) {
      post(route("profile.photo.update"), {
        forceFormData: true,
        onSuccess: () => {
          setPreviewUrl(null)
          reset()
        },
      })
    }
  }

  const deletePhoto = () => {
    if (confirm("Weet je zeker dat je je profielfoto wilt verwijderen?")) {
      destroy(route("profile.photo.delete"))
    }
  }

  const getPhotoUrl = () => {
    if (previewUrl) return previewUrl
    if (user.profile_photo_path) return `/storage/${user.profile_photo_path}`
    return null
  }

  const photoUrl = getPhotoUrl()

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Profielfoto</CardTitle>
        <CardDescription className="text-zinc-400">Upload een profielfoto voor je account</CardDescription>
      </CardHeader>
      <form onSubmit={submit}>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <div
                className={`h-32 w-32 rounded-full flex items-center justify-center overflow-hidden border-2 ${
                  photoUrl ? "border-blue-500" : "border-zinc-700 bg-zinc-800"
                }`}
              >
                {photoUrl ? (
                  <img src={photoUrl || "/placeholder.svg"} alt="Profielfoto" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-12 w-12 text-zinc-500" />
                )}
              </div>
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

            {errors.photo && <p className="text-blue-500 text-sm">{errors.photo}</p>}

            {progress && (
              <div className="w-full bg-zinc-700 rounded-full h-2.5 mb-4">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-white"
            >
              <Upload className="mr-2 h-4 w-4" />
              {hasProfilePhoto ? "Wijzigen" : "Uploaden"}
            </Button>
          </div>

          <div className="flex gap-2">
            {hasProfilePhoto && (
              <Button type="button" variant="destructive" onClick={deletePhoto} className="bg-blue-700 hover:bg-blue-800">
                <Trash2 className="mr-2 h-4 w-4" />
                Verwijderen
              </Button>
            )}

            {data.photo && (
              <Button type="submit" disabled={processing} className="bg-blue-500 hover:bg-blue-600 text-white">
                {processing ? "Bezig met uploaden..." : "Opslaan"}
              </Button>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
