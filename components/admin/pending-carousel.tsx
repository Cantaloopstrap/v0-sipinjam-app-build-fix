"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, MapPin } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { getBookings } from "@/lib/data-manager"
import type { Booking } from "@/lib/types"

export function PendingCarousel() {
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([])
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })])

  useEffect(() => {
    loadPendingBookings()
  }, [])

  const loadPendingBookings = () => {
    const bookings = getBookings()
    const pending = bookings
      .filter((b) => b.status === "pending")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    setPendingBookings(pending)
  }

  if (pendingBookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Peminjaman Menunggu Persetujuan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Tidak ada peminjaman yang menunggu persetujuan</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Peminjaman Menunggu Persetujuan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {pendingBookings.map((booking) => (
              <div key={booking.id} className="flex-[0_0_100%] min-w-0 pr-4">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.itemName}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {booking.type === "room" ? "Ruangan" : "Barang"}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="border-amber-500 text-amber-600">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{booking.userName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(booking.startDate, "dd MMMM yyyy, HH:mm", { locale: id })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.purpose}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                      <a href="/admin/bookings">Tinjau Sekarang</a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
