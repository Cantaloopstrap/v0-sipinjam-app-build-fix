"use client"

import { useEffect, useState } from "react"
import { Users, Calendar, TrendingUp, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getUsers, getBookings } from "@/lib/data-manager"

export function AdminHeroSection() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalBookings: 0,
    pendingBookings: 0,
  })

  useEffect(() => {
    const users = getUsers()
    const bookings = getBookings()

    setStats({
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.role === "user").length,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === "pending").length,
    })
  }, [])

  return (
    <section className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <img src="/modern-office-workspace-with-computers.jpg" alt="Admin Dashboard" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-500/85 to-amber-500/80" />
      </div>

      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 container">
        <div className="text-white mb-8">
          <h1 className="mb-3 text-4xl font-bold leading-tight md:text-5xl text-balance">Portal Admin SIPINJAM</h1>
          <p className="text-lg md:text-xl text-orange-50 leading-relaxed max-w-2xl">
            Kelola sistem peminjaman dengan efisien. Monitor aktivitas user, persetujuan peminjaman, dan statistik
            sistem secara real-time.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 max-w-5xl">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/80">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/80">Active Users</p>
                  <p className="text-2xl font-bold">{stats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/80">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/30">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/80">Pending</p>
                  <p className="text-2xl font-bold">{stats.pendingBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
