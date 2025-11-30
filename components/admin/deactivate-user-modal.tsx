"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, AlertTriangle } from "lucide-react"

interface DeactivateUserModalProps {
  open: boolean
  onClose: () => void
  user: User | null
  onConfirm: (reason: string, duration?: number) => void
}

export function DeactivateUserModal({ open, onClose, user, onConfirm }: DeactivateUserModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState<string>("permanent")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!reason.trim()) {
      setError("Alasan nonaktif wajib diisi")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const durationDays = duration === "permanent" ? undefined : Number.parseInt(duration)
    onConfirm(reason, durationDays)

    toast.success("User berhasil dinonaktifkan")
    setIsLoading(false)
    setReason("")
    setDuration("permanent")
    setError("")
    onClose()
  }

  const handleClose = () => {
    setReason("")
    setDuration("permanent")
    setError("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Nonaktifkan User</DialogTitle>
              <DialogDescription>
                Nonaktifkan akses untuk: <span className="font-semibold">{user?.name}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Durasi Nonaktif</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih durasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Hari</SelectItem>
                  <SelectItem value="30">30 Hari (1 Bulan)</SelectItem>
                  <SelectItem value="90">90 Hari (3 Bulan)</SelectItem>
                  <SelectItem value="180">180 Hari (6 Bulan)</SelectItem>
                  <SelectItem value="permanent">Permanen</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {duration === "permanent"
                  ? "User tidak akan bisa login hingga diaktifkan kembali"
                  : `User akan otomatis aktif kembali setelah ${duration} hari`}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Alasan Nonaktif</Label>
              <Textarea
                id="reason"
                placeholder="Jelaskan alasan menonaktifkan user ini..."
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value)
                  setError("")
                }}
                rows={4}
                className={error ? "border-destructive" : ""}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Dampak:</strong> User tidak dapat login dan semua peminjaman aktif akan dibatalkan otomatis.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Batal
            </Button>
            <Button type="submit" variant="destructive" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Nonaktifkan User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
