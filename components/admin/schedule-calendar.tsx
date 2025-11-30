"use client"

import { useState } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns"
import { id } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Booking } from "@/lib/types"

interface ScheduleCalendarProps {
  bookings: Booking[]
  itemId: string
  itemName: string
}

export function ScheduleCalendar({ bookings, itemId, itemName }: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getBookingsForDate = (date: Date) => {
    return bookings.filter((booking) => {
      const bookingStart = new Date(booking.startDate)
      const bookingEnd = new Date(booking.endDate)
      return (
        booking.itemId === itemId &&
        (booking.status === "approved" || booking.status === "active") &&
        date >= bookingStart &&
        date <= bookingEnd
      )
    })
  }

  const selectedDateBookings = selectedDate ? getBookingsForDate(selectedDate) : []

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Jadwal Peminjaman - {itemName}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-[150px] text-center font-semibold">
              {format(currentDate, "MMMM yyyy", { locale: id })}
            </div>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
            {daysInMonth.map((day) => {
              const dayBookings = getBookingsForDate(day)
              const hasBookings = dayBookings.length > 0
              const isSelected = selectedDate && isSameDay(day, selectedDate)

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "relative aspect-square rounded-md border p-2 text-sm transition-colors",
                    !isSameMonth(day, currentDate) && "text-muted-foreground opacity-50",
                    isToday(day) && "border-primary font-semibold",
                    hasBookings && "bg-orange-50 dark:bg-orange-950",
                    isSelected && "ring-2 ring-primary",
                    "hover:bg-accent",
                  )}
                >
                  <div className="flex h-full flex-col items-center justify-center">
                    <span>{format(day, "d")}</span>
                    {hasBookings && (
                      <div className="mt-1 flex gap-0.5">
                        {dayBookings.slice(0, 3).map((_, i) => (
                          <div key={i} className="h-1 w-1 rounded-full bg-orange-500" />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Date Details */}
          {selectedDate && (
            <div className="rounded-md border p-4">
              <h4 className="mb-3 font-semibold">{format(selectedDate, "dd MMMM yyyy", { locale: id })}</h4>
              {selectedDateBookings.length === 0 ? (
                <p className="text-sm text-muted-foreground">Tidak ada peminjaman pada tanggal ini</p>
              ) : (
                <div className="space-y-2">
                  {selectedDateBookings.map((booking) => (
                    <div key={booking.id} className="rounded-md bg-muted p-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="font-medium">{booking.userName}</p>
                          <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(booking.startDate), "HH:mm")} -{" "}
                            {format(new Date(booking.endDate), "HH:mm")}
                          </p>
                        </div>
                        <Badge
                          variant={booking.status === "active" ? "default" : "secondary"}
                          className="bg-orange-500"
                        >
                          {booking.status === "active" ? "Aktif" : "Disetujui"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
