"use client"

import { Head } from "@inertiajs/react"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import ProfileInformation from "./Components/ProfileInformation"
import ProfilePhoto from "./Components/ProfilePhoto"
import PasswordUpdate from "./Components/PasswordUpdate"
import SecuritySettings from "./Components/SecuritySettings"
import ActivityLog from "./Components/ActivityLog"
import AccountDeletion from "./Components/AccountDeletion"
import MeosLayout from "@/Layouts/MeosLayout"
import type { User } from "@/types"

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

interface ProfileProps {
  user: User & {
    profile_photo_path: string | null
  }
  hasProfilePhoto: boolean
  actieveSessies: LoginSession[]
}

export default function Profile({ user, hasProfilePhoto, actieveSessies }: ProfileProps) {
  const urlParams = new URLSearchParams(window.location.search)
  const tabParam = urlParams.get("tab")

  const [activeTab, setActiveTab] = useState(tabParam || "algemeen")

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    const url = new URL(window.location.href)
    url.searchParams.set("tab", value)
    window.history.pushState({}, "", url)
  }

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const tab = params.get("tab")
      if (tab) {
        setActiveTab(tab)
      } else {
        setActiveTab("algemeen")
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  return (
    <MeosLayout>
      <Head title="Mijn Profiel" />
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Mijn Profiel</h1>
            <p className="text-zinc-400">Beheer je persoonlijke gegevens en instellingen</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="algemeen" className="data-[state=active]:bg-blue-500">
              Algemeen
            </TabsTrigger>
            <TabsTrigger value="beveiliging" className="data-[state=active]:bg-blue-500">
              Beveiliging
            </TabsTrigger>
            <TabsTrigger value="activiteit" className="data-[state=active]:bg-blue-500">
              Activiteit
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-blue-500">
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="algemeen" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProfilePhoto user={user} hasProfilePhoto={hasProfilePhoto} />
              <ProfileInformation user={user} />
            </div>
          </TabsContent>

          <TabsContent value="beveiliging" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PasswordUpdate />
              <SecuritySettings />
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <AccountDeletion />
          </TabsContent>
        </Tabs>
      </div>
    </MeosLayout>
  )
}
