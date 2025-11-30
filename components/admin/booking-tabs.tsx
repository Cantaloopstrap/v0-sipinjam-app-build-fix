"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookingTable } from "./booking-table"
import type { Booking } from "@/lib/types"

interface BookingTabsProps {
  bookings: Booking[]
  onApprove: (bookingId: string) => void
  onReject: (bookingId: string, reason: string) => void
  onViewDetails: (booking: Booking) => void
}

export function BookingTabs({ bookings, onApprove, onReject, onViewDetails }: BookingTabsProps) {
  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const activeBookings = bookings.filter((b) => b.status === "approved" || b.status === "active")
  const historyBookings = bookings.filter(
    (b) => b.status === "completed" || b.status === "rejected" || b.status === "cancelled",
  )

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pending" className="relative">
          Menunggu Persetujuan
          {pendingBookings.length > 0 && (
            <Badge variant="destructive" className="ml-2 h-5 min-w-[20px] rounded-full px-1.5">
              {pendingBookings.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="active">
          Aktif
          {activeBookings.length > 0 && (
            <Badge variant="default" className="ml-2 h-5 min-w-[20px] rounded-full px-1.5">
              {activeBookings.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="history">Riwayat</TabsTrigger>
      </TabsList>

      <TabsContent value="pending" className="mt-6">
        <BookingTable
          bookings={pendingBookings}
          onApprove={onApprove}
          onReject={onReject}
          onViewDetails={onViewDetails}
          showActions
        />
      </TabsContent>

      <TabsContent value="active" className="mt-6">
        <BookingTable bookings={activeBookings} onViewDetails={onViewDetails} showActions={false} />
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <BookingTable bookings={historyBookings} onViewDetails={onViewDetails} showActions={false} />
      </TabsContent>
    </Tabs>
  )
}
