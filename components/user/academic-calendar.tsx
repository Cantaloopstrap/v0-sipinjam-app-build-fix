"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockAcademicCalendar } from "@/lib/mock-data"
import { CalendarDays, GraduationCap, PartyPopper, Download, Filter } from "lucide-react"
import { format, isSameDay, isSameMonth } from "date-fns"
import { id } from "date-fns/locale"

export function AcademicCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date>(new Date())
  const [filterType, setFilterType] = useState<string | null>(null)

  const filteredEvents = filterType
    ? mockAcademicCalendar.filter((event) => event.type === filterType)
    : mockAcademicCalendar

  const eventsOnSelectedDate = selectedDate ? filteredEvents.filter((event) => isSameDay(event.date, selectedDate)) : []

  const eventsInMonth = filteredEvents.filter((event) => isSameMonth(event.date, month))

  const modifiers = {
    holiday: filteredEvents.filter((e) => e.type === "holiday").map((e) => e.date),
    exam: filteredEvents.filter((e) => e.type === "exam").map((e) => e.date),
    event: filteredEvents.filter((e) => e.type === "event").map((e) => e.date),
  }

  const modifiersClassNames = {
    holiday:
      "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 font-semibold hover:bg-red-200 dark:hover:bg-red-900/50",
    exam: "bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-100 font-semibold hover:bg-orange-200 dark:hover:bg-orange-900/50",
    event:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50",
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "holiday":
        return <PartyPopper className="h-4 w-4" />
      case "exam":
        return <GraduationCap className="h-4 w-4" />
      case "event":
        return <CalendarDays className="h-4 w-4" />
      default:
        return <CalendarDays className="h-4 w-4" />
    }
  }

  const getEventBadgeVariant = (type: string) => {
    switch (type) {
      case "holiday":
        return "destructive"
      case "exam":
        return "default"
      case "event":
        return "secondary"
      default:
        return "outline"
    }
  }

  const handleDownloadCalendar = () => {
    const calendarText = eventsInMonth
      .map((event) => `${format(event.date, "dd/MM/yyyy", { locale: id })} - ${event.title} (${event.type})`)
      .join("\n")

    const blob = new Blob([calendarText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `kalender-akademik-${format(month, "MMMM-yyyy", { locale: id })}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant={filterType === null ? "default" : "outline"} size="sm" onClick={() => setFilterType(null)}>
            <Filter className="h-4 w-4" />
            Semua
          </Button>
          <Button
            variant={filterType === "holiday" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("holiday")}
            className={filterType === "holiday" ? "bg-red-600 hover:bg-red-700" : ""}
          >
            <PartyPopper className="h-4 w-4" />
            Libur
          </Button>
          <Button
            variant={filterType === "exam" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("exam")}
            className={filterType === "exam" ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            <GraduationCap className="h-4 w-4" />
            Ujian
          </Button>
          <Button
            variant={filterType === "event" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("event")}
          >
            <CalendarDays className="h-4 w-4" />
            Acara
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownloadCalendar}>
          <Download className="h-4 w-4" />
          Unduh Kalender
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Kalender Akademik</h3>
            <p className="text-sm text-muted-foreground">Pilih tanggal untuk melihat detail acara</p>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={month}
            onMonthChange={setMonth}
            locale={id}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="rounded-md border w-full"
          />

          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm font-semibold mb-3">Keterangan</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-xs">Libur/Hari Besar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500" />
                <span className="text-xs">Periode Ujian</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-xs">Acara Kampus</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale: id }) : "Pilih Tanggal"}
            </h3>

            {eventsOnSelectedDate.length > 0 ? (
              <div className="space-y-3">
                {eventsOnSelectedDate.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border p-3 bg-accent/30 hover:bg-accent/50 transition-colors"
                  >
                    <div className="mt-0.5">{getEventIcon(event.type)}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm leading-relaxed">{event.title}</p>
                      <Badge variant={getEventBadgeVariant(event.type)} className="mt-2">
                        {event.type === "holiday" && "Libur"}
                        {event.type === "exam" && "Ujian"}
                        {event.type === "event" && "Acara"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">Tidak ada acara pada tanggal ini</p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ringkasan {format(month, "MMMM yyyy", { locale: id })}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <div className="flex items-center gap-2">
                  <PartyPopper className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Libur</span>
                </div>
                <Badge variant="secondary">{eventsInMonth.filter((e) => e.type === "holiday").length}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium">Ujian</span>
                </div>
                <Badge variant="secondary">{eventsInMonth.filter((e) => e.type === "exam").length}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Acara</span>
                </div>
                <Badge variant="secondary">{eventsInMonth.filter((e) => e.type === "event").length}</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
