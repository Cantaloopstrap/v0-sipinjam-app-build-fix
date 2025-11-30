"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Calendar, Home, Package } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Kelola Pengguna",
      description: "Tambah atau edit pengguna",
      icon: UserPlus,
      href: "/admin/users",
      color: "bg-orange-50 dark:bg-orange-950/20 text-orange-600",
    },
    {
      title: "Kelola Peminjaman",
      description: "Review peminjaman pending",
      icon: Calendar,
      href: "/admin/bookings",
      color: "bg-blue-50 dark:bg-blue-950/20 text-blue-600",
    },
    {
      title: "Kelola Ruangan",
      description: "Tambah atau edit ruangan",
      icon: Home,
      href: "/admin/rooms",
      color: "bg-green-50 dark:bg-green-950/20 text-green-600",
    },
    {
      title: "Kelola Barang",
      description: "Tambah atau edit barang",
      icon: Package,
      href: "/admin/equipment",
      color: "bg-purple-50 dark:bg-purple-950/20 text-purple-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button key={action.title} variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
                <Link href={action.href}>
                  <div className="flex items-start gap-3 w-full">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">{action.title}</p>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Link>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
