"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Users, Package } from "lucide-react"
import type { Room, Equipment } from "@/lib/types"

interface CarouselCardProps {
  item: Room | Equipment
  type: "room" | "equipment"
  onBook?: () => void
}

export function CarouselCard({ item, type, onBook }: CarouselCardProps) {
  const isRoom = type === "room"
  const statusColors = {
    available: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    booked: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    "in-use": "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  }

  const statusLabels = {
    available: "Tersedia",
    booked: "Booking",
    "in-use": "Digunakan",
  }

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors h-full">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <Badge className={`absolute right-3 top-3 border ${statusColors[item.status]}`}>
          {statusLabels[item.status]}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3 line-clamp-1">{item.name}</h3>

        {isRoom ? (
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">
                {(item as Room).building} - Lantai {(item as Room).floor}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              <span>Kapasitas: {(item as Room).capacity} orang</span>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{(item as Room).facilities.join(", ")}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 shrink-0" />
              <span>Kategori: {(item as Equipment).category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              <span>
                Tersedia: {(item as Equipment).available}/{(item as Equipment).quantity} unit
              </span>
            </div>
            <p className="line-clamp-2">{(item as Equipment).description}</p>
          </div>
        )}

        <Button
          className="w-full"
          variant={item.status === "available" ? "default" : "secondary"}
          disabled={item.status !== "available"}
          onClick={onBook}
        >
          {item.status === "available" ? "Ajukan Peminjaman" : "Tidak Tersedia"}
        </Button>
      </CardContent>
    </Card>
  )
}
