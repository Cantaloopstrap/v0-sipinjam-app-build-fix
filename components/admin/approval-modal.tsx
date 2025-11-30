"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Booking } from "@/lib/types"

interface ApprovalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: Booking | null
  onApprove: (bookingId: string, notes?: string) => void
  onReject: (bookingId: string, reason: string) => void
}

export function ApprovalModal({ open, onOpenChange, booking, onApprove, onReject }: ApprovalModalProps) {
  const [action, setAction] = useState<"approve" | "reject" | null>(null)
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!booking || !action) return

    if (action === "reject" && !notes.trim()) {
      alert("Alasan penolakan harus diisi")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (action === "approve") {
      onApprove(booking.id, notes)
    } else {
      onReject(booking.id, notes)
    }

    setIsLoading(false)
    setAction(null)
    setNotes("")
    onOpenChange(false)
  }

  if (!booking) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Proses Peminjaman</DialogTitle>
          <DialogDescription>
            {booking.userName} - {booking.itemName}
          </DialogDescription>
        </DialogHeader>

        {!action ? (
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">Pilih aksi untuk peminjaman ini:</p>
            <div className="grid gap-3">
              <Button variant="default" className="justify-start gap-2" onClick={() => setAction("approve")}>
                <CheckCircle className="h-5 w-5" />
                Setujui Peminjaman
              </Button>
              <Button variant="destructive" className="justify-start gap-2" onClick={() => setAction("reject")}>
                <XCircle className="h-5 w-5" />
                Tolak Peminjaman
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notes">{action === "approve" ? "Catatan (Opsional)" : "Alasan Penolakan *"}</Label>
              <Textarea
                id="notes"
                placeholder={
                  action === "approve" ? "Tambahkan catatan untuk peminjam..." : "Jelaskan alasan penolakan..."
                }
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                required={action === "reject"}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {action ? (
            <>
              <Button variant="outline" onClick={() => setAction(null)} disabled={isLoading}>
                Kembali
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {action === "approve" ? "Setujui" : "Tolak"}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Tutup
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
