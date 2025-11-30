"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset?: () => void }) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="rounded-full bg-destructive/10 p-6">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <div className="space-y-3 max-w-md">
        <h1 className="text-2xl font-bold">Terjadi Kesalahan</h1>
        <p className="text-muted-foreground">
          Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberi tahu dan akan segera memperbaikinya.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => (reset ? reset() : window.location.reload())} variant="default">
          Coba Lagi
        </Button>
        <Button onClick={() => (window.location.href = "/login")} variant="outline">
          Kembali ke Login
        </Button>
      </div>
    </div>
  )
}
