"use client"

import { useState } from "react"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { CheckCircle, XCircle, Eye, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Booking } from "@/lib/types"

interface BookingTableProps {
  bookings: Booking[]
  onApprove?: (bookingId: string) => void
  onReject?: (bookingId: string, reason: string) => void
  onViewDetails: (booking: Booking) => void
  showActions?: boolean
}

export function BookingTable({ bookings, onApprove, onReject, onViewDetails, showActions }: BookingTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: Booking["status"]) => {
    const variants: Record<
      Booking["status"],
      { variant: "default" | "secondary" | "destructive" | "outline"; label: string }
    > = {
      pending: { variant: "secondary", label: "Menunggu" },
      approved: { variant: "default", label: "Disetujui" },
      rejected: { variant: "destructive", label: "Ditolak" },
      active: { variant: "default", label: "Aktif" },
      completed: { variant: "outline", label: "Selesai" },
      cancelled: { variant: "outline", label: "Dibatalkan" },
    }
    return variants[status]
  }

  const getTypeBadge = (type: "room" | "equipment") => {
    return type === "room" ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950">
        Ruangan
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-950">
        Barang
      </Badge>
    )
  }

  if (filteredBookings.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan nama, item, atau tujuan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground">Tidak ada data peminjaman</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari berdasarkan nama, item, atau tujuan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Peminjam</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Tujuan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.userName}</TableCell>
                <TableCell>{getTypeBadge(booking.type)}</TableCell>
                <TableCell>{booking.itemName}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {format(new Date(booking.startDate), "dd MMM yyyy", { locale: localeId })}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(booking.startDate), "HH:mm", { locale: localeId })} -{" "}
                      {format(new Date(booking.endDate), "HH:mm", { locale: localeId })}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{booking.purpose}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadge(booking.status).variant}>{getStatusBadge(booking.status).label}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => onViewDetails(booking)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {showActions && booking.status === "pending" && (
                      <>
                        <Button size="sm" variant="default" onClick={() => onApprove?.(booking.id)}>
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            const reason = prompt("Masukkan alasan penolakan:")
                            if (reason) onReject?.(booking.id, reason)
                          }}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
