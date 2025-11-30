import { StatsCards } from "@/components/admin/stats-cards"
import { PendingCarousel } from "@/components/admin/pending-carousel"
import { QuickActions } from "@/components/admin/quick-actions"
import { AdminHeroSection } from "@/components/admin/admin-hero-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, BookOpen, Package } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-8">
      <AdminHeroSection />

      <div className="container space-y-8">
        <StatsCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <PendingCarousel />
          <QuickActions />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[var(--admin-primary)]" />
              Statistik Sistem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Peminjaman</p>
                  <p className="text-2xl font-bold">128</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total User</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900">
                  <Package className="h-6 w-6 text-orange-600 dark:text-orange-300" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Item</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
