"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Package, CheckCircle, Clock, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { getUsers, getRooms, getEquipment, getBookings } from "@/lib/data-manager"

interface StatsData {
  totalUsers: number
  totalBookings: number
  totalItems: number
  pendingApprovals: number
  approvedBookings: number
  rejectedBookings: number
}

export function StatsCards() {
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalBookings: 0,
    totalItems: 0,
    pendingApprovals: 0,
    approvedBookings: 0,
    rejectedBookings: 0,
  })

  useEffect(() => {
    const bookings = getBookings()
    const users = getUsers()
    const rooms = getRooms()
    const equipment = getEquipment()

    setStats({
      totalUsers: users.length,
      totalBookings: bookings.length,
      totalItems: rooms.length + equipment.length,
      pendingApprovals: bookings.filter((b) => b.status === "pending").length,
      approvedBookings: bookings.filter((b) => b.status === "approved").length,
      rejectedBookings: bookings.filter((b) => b.status === "rejected").length,
    })
  }, [])

  const statsConfig = [
    {
      title: "Total Pengguna",
      value: stats.totalUsers,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      title: "Total Peminjaman",
      value: stats.totalBookings,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      title: "Total Item",
      value: stats.totalItems,
      icon: Package,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      title: "Menunggu Persetujuan",
      value: stats.pendingApprovals,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      title: "Disetujui",
      value: stats.approvedBookings,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      title: "Ditolak",
      value: stats.rejectedBookings,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statsConfig.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
