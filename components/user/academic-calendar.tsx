"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockAcademicCalendar } from "@/lib/mock-data"
import { Download } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek } from "date-fns"
import { id } from "date-fns/locale"

const MONTHS = [
  "September 2025",
  "Oktober 2025",
  "November 2025",
  "Desember 2025",
  "Januari 2026",
  "Februari 2026",
  "Maret 2026",
  "April 2026",
  "Mei 2026",
  "Juni 2026",
  "Juli 2026",
  "Agustus 2026",
]

const DAYS = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUM'AT", "SABTU"]

export function AcademicCalendar() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)

  const getEventForDate = (date: Date) => {
    return mockAcademicCalendar.find((event) => isSameDay(event.date, date))
  }

  const getColorClass = (type: string) => {
    switch (type) {
      case "holiday":
        return "bg-red-100 text-red-900 font-semibold"
      case "exam":
        return "bg-orange-100 text-orange-900 font-semibold"
      case "event":
        return "bg-blue-100 text-blue-900 font-semibold"
      default:
        return ""
    }
  }

  const renderMonth = (monthStr: string) => {
    const [monthName, year] = monthStr.split(" ")
    const monthMap: { [key: string]: number } = {
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
    }

    const month = new Date(Number.parseInt(year), monthMap[monthName], 1)
    const start = startOfMonth(month)
    const end = endOfMonth(month)

    // Get the start of the week for the first day of the month
    const calendarStart = startOfWeek(start, { weekStartsOn: 0 })
    // Get the end of the week for the last day of the month
    const calendarEnd = endOfWeek(end, { weekStartsOn: 0 })

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

    return (
      <Card key={monthStr} className="p-4">
        <h3 className="text-center font-bold text-lg mb-3 uppercase">{monthStr}</h3>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs font-bold py-1 bg-muted">
              {day}
            </div>
          ))}
          {days.map((day, idx) => {
            const event = getEventForDate(day)
            const isCurrentMonth = day.getMonth() === start.getMonth()

            return (
              <div
                key={idx}
                className={`
                  aspect-square flex items-center justify-center text-sm border
                  ${!isCurrentMonth ? "text-muted-foreground/30" : ""}
                  ${event ? getColorClass(event.type) : "hover:bg-accent"}
                `}
                title={event ? event.title : ""}
              >
                {format(day, "d")}
              </div>
            )
          })}
        </div>
      </Card>
    )
  }

  const handleDownloadCalendar = () => {
    const calendarText = mockAcademicCalendar
      .map((event) => `${format(event.date, "dd/MM/yyyy", { locale: id })} - ${event.title} (${event.type})`)
      .join("\n")

    const blob = new Blob([calendarText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `kalender-akademik-2025-2026.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">KALENDER AKADEMIK TA. 2025/2026</h2>
          <p className="text-sm text-muted-foreground mt-1">Sekolah Tinggi Teknologi Bontang</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleDownloadCalendar}>
          <Download className="mr-2 h-4 w-4" />
          Unduh Kalender
        </Button>
      </div>

      {/* Legend */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Keterangan:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-red-100 border border-red-300" />
            <span className="text-sm">Libur/Hari Besar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-orange-100 border border-orange-300" />
            <span className="text-sm">Periode Ujian</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-blue-100 border border-blue-300" />
            <span className="text-sm">Acara Kampus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-100 border border-green-300" />
            <span className="text-sm">Periode Kuliah</span>
          </div>
        </div>
      </Card>

      {/* Calendar Grid - Show all 12 months */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{MONTHS.map(renderMonth)}</div>

      {/* Semester Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">SEMESTER GANJIL 2025/2026</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Her Registrasi Mala:</span>
              <span className="font-medium">1 – 4 Sept 2025</span>
            </div>
            <div className="flex justify-between">
              <span>Basic Study Skills MaBa:</span>
              <span className="font-medium">4 – 6 Sept 2025</span>
            </div>
            <div className="flex justify-between">
              <span>Perkuliahan:</span>
              <span className="font-medium">15 Sept – 26 Des 2025</span>
            </div>
            <div className="flex justify-between">
              <span>UTS:</span>
              <span className="font-medium">3 – 7 Nov 2025</span>
            </div>
            <div className="flex justify-between">
              <span>UAS:</span>
              <span className="font-medium">5 – 9 Jan 2026</span>
            </div>
            <div className="flex justify-between">
              <span>Wisuda:</span>
              <span className="font-medium">November 2025</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">SEMESTER GENAP 2025/2026</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Her Registrasi:</span>
              <span className="font-medium">2 Feb – 6 Feb 2026</span>
            </div>
            <div className="flex justify-between">
              <span>Perkuliahan Tahap 1:</span>
              <span className="font-medium">9 Feb – 13 Feb 2026</span>
            </div>
            <div className="flex justify-between">
              <span>Libur Ramadhan:</span>
              <span className="font-medium">16 Feb – 3 Apr 2026</span>
            </div>
            <div className="flex justify-between">
              <span>Perkuliahan Tahap 2:</span>
              <span className="font-medium">6 Apr – 10 Jul 2026</span>
            </div>
            <div className="flex justify-between">
              <span>UTS:</span>
              <span className="font-medium">18 – 22 Mei 2026</span>
            </div>
            <div className="flex justify-between">
              <span>UAS:</span>
              <span className="font-medium">20 – 24 Jul 2026</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
