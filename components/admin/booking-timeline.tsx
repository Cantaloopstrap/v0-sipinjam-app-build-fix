"use client"

import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { CheckCircle, XCircle, Clock, AlertCircle, CheckCheck, Ban } from "lucide-react"
import type { BookingStatusTimeline } from "@/lib/types"

interface BookingTimelineProps {
  timeline: BookingStatusTimeline[]
}

export function BookingTimeline({ timeline }: BookingTimelineProps) {
  const getStatusIcon = (status: BookingStatusTimeline["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "active":
        return <AlertCircle className="h-5 w-5 text-blue-600" />
      case "completed":
        return <CheckCheck className="h-5 w-5 text-gray-600" />
      case "cancelled":
        return <Ban className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusLabel = (status: BookingStatusTimeline["status"]) => {
    const labels: Record<BookingStatusTimeline["status"], string> = {
      pending: "Menunggu Persetujuan",
      approved: "Disetujui",
      rejected: "Ditolak",
      active: "Sedang Berlangsung",
      completed: "Selesai",
      cancelled: "Dibatalkan",
    }
    return labels[status]
  }

  return (
    <div className="space-y-4">
      {timeline.map((entry, index) => (
        <div key={index} className="relative flex gap-4">
          {/* Timeline line */}
          {index !== timeline.length - 1 && <div className="absolute left-[10px] top-8 h-full w-0.5 bg-border" />}

          {/* Icon */}
          <div className="flex-shrink-0">{getStatusIcon(entry.status)}</div>

          {/* Content */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{getStatusLabel(entry.status)}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(entry.timestamp), "dd MMM yyyy, HH:mm", { locale: localeId })}
              </p>
            </div>
            {entry.by && <p className="text-sm text-muted-foreground">Oleh: {entry.by}</p>}
            {entry.notes && <p className="text-sm text-muted-foreground italic">{entry.notes}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
