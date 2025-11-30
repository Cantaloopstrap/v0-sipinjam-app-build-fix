"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserSession, setUserSession } from "@/lib/auth"
import { AccountSettings } from "@/components/settings/account-settings"
import type { User } from "@/lib/types"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getUserSession()
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/login")
      return
    }
    setUser(currentUser)
  }, [router])

  const handleUpdateUser = (updatedUser: User) => {
    setUserSession(updatedUser)
    setUser(updatedUser)
  }

  if (!user) {
    return null
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">Kelola informasi akun dan preferensi Anda</p>

        <AccountSettings user={user} onUpdate={handleUpdateUser} />
      </div>
    </div>
  )
}
