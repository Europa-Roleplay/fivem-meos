"use client"

import { Head } from "@inertiajs/react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import ProfileInformation from "./Components/ProfileInformation"
import ProfilePhoto from "./Components/ProfilePhoto"
import PasswordUpdate from "./Components/PasswordUpdate"
import SecuritySettings from "./Components/SecuritySettings"
import ActivityLog from "./Components/ActivityLog"
import AccountDeletion from "./Components/AccountDeletion"
import AdminLayout from "@/Layouts/AdminLayout"
import type { User } from "@/types"
import type { LogboekItem } from "@/Pages/Admin/Logboek/types"
import MeosLayout from "@/Layouts/MeosLayout"

interface ProfileProps {
  user: User & {
    profile_photo_path: string | null
  }
  hasProfilePhoto: boolean
  recenteActiviteiten: LogboekItem[]
}

export default function Profile({ user, hasProfilePhoto, recenteActiviteiten }: ProfileProps) {
  const [activeTab, setActiveTab] = useState("algemeen")

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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

          <TabsContent value="activiteit" className="space-y-4">
            <ActivityLog activiteiten={recenteActiviteiten} />
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <AccountDeletion />
          </TabsContent>
        </Tabs>
      </div>
    </MeosLayout>
  )
}
