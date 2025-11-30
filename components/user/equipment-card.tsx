"use client"

import Image from "next/image"
import { Package, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Equipment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface EquipmentCardProps {
  equipment: Equipment
  view: "grid" | "list"
  onBook?: (equipmentId: string) => void
}

export function EquipmentCard({ equipment, view, onBook }: EquipmentCardProps) {
  const statusConfig = {
    available: { label: "Tersedia", className: "bg-green-500" },
    booked: { label: "Booking", className: "bg-yellow-500" },
    "in-use": { label: "Digunakan", className: "bg-red-500" },
  }

  const status = statusConfig[equipment.status]
  const isAvailable = equipment.available > 0

  if (view === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-48 w-full md:h-auto md:w-64">
            <Image src={equipment.imageUrl || "/placeholder.svg"} alt={equipment.name} fill className="object-cover" />
            <Badge className={cn("absolute right-2 top-2", status.className)}>{status.label}</Badge>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="text-xl font-semibold">{equipment.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{equipment.description}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {equipment.category}
                </div>
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  {equipment.available}/{equipment.quantity} tersedia
                </div>
              </div>
            </div>
            {onBook && (
              <div className="mt-4">
                <Button onClick={() => onBook(equipment.id)} disabled={!isAvailable} className="w-full md:w-auto">
                  <Calendar className="mr-2 h-4 w-4" />
                  {isAvailable ? "Ajukan Peminjaman" : "Tidak Tersedia"}
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
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={equipment.imageUrl || "/placeholder.svg"}
            alt={equipment.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <Badge className={cn("absolute right-2 top-2", status.className)}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{equipment.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{equipment.description}</p>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" />
            {equipment.category}
          </div>
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            {equipment.available}/{equipment.quantity} tersedia
          </div>
        </div>
      </CardContent>
      {onBook && (
        <CardFooter className="p-4 pt-0">
          <Button onClick={() => onBook(equipment.id)} disabled={!isAvailable} className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            {isAvailable ? "Pinjam" : "Tidak Tersedia"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
