"use client"

import Image from "next/image"
import { MapPin, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Room } from "@/lib/types"
import { cn } from "@/lib/utils"

interface RoomCardProps {
  room: Room
  view: "grid" | "list"
  onBook?: (roomId: string) => void
}

export function RoomCard({ room, view, onBook }: RoomCardProps) {
  const statusConfig = {
    available: { label: "Tersedia", className: "bg-green-500" },
    booked: { label: "Booking", className: "bg-yellow-500" },
    "in-use": { label: "Digunakan", className: "bg-red-500" },
  }

  const status = statusConfig[room.status]

  if (view === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-48 w-full md:h-auto md:w-64">
            <Image src={room.imageUrl || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
            <Badge className={cn("absolute right-2 top-2", status.className)}>{status.label}</Badge>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {room.building}, Lantai {room.floor}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Kapasitas {room.capacity} orang
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {room.facilities.map((facility) => (
                  <Badge key={facility} variant="secondary" className="text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
            {onBook && (
              <div className="mt-4">
                <Button
                  onClick={() => onBook(room.id)}
                  disabled={room.status !== "available"}
                  className="w-full md:w-auto"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {room.status === "available" ? "Ajukan Peminjaman" : "Tidak Tersedia"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={room.imageUrl || "/placeholder.svg"}
            alt={room.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <Badge className={cn("absolute right-2 top-2", status.className)}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{room.name}</h3>
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {room.building}, Lantai {room.floor}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Kapasitas {room.capacity} orang
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {room.facilities.slice(0, 3).map((facility) => (
            <Badge key={facility} variant="secondary" className="text-xs">
              {facility}
            </Badge>
          ))}
          {room.facilities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{room.facilities.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      {onBook && (
        <CardFooter className="p-4 pt-0">
          <Button onClick={() => onBook(room.id)} disabled={room.status !== "available"} className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            {room.status === "available" ? "Pinjam" : "Tidak Tersedia"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
