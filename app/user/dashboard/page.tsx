"use client"

import { useState } from "react"
import { HeroSection } from "@/components/user/hero-section"
import { RulesSection } from "@/components/user/rules-section"
import { RoomCarousel } from "@/components/user/room-carousel"
import { EquipmentCarousel } from "@/components/user/equipment-carousel"
import { NewBookingModal } from "@/components/user/new-booking-modal"
import { createBooking } from "@/lib/data-manager"
import type { BookingFormData } from "@/lib/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function UserDashboard() {
  const router = useRouter()
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<"room" | "equipment" | undefined>()
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const handleOpenBooking = (type: "room" | "equipment", itemId: string) => {
    setSelectedType(type)
    setSelectedItemId(itemId)
    setIsBookingModalOpen(true)
  }

  const handleBookingSubmit = (data: BookingFormData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("sipinjam_current_user") || "{}")

      if (!currentUser.id) {
        toast.error("Silakan login terlebih dahulu")
        router.push("/login")
        return
      }

      createBooking({
        ...data,
        userId: currentUser.id,
        userName: currentUser.name,
      })

      toast.success("Peminjaman berhasil diajukan!")
      setIsBookingModalOpen(false)
      setSelectedType(undefined)
      setSelectedItemId(null)

      // Redirect to bookings page
      router.push("/user/bookings")
    } catch (error) {
      toast.error("Gagal mengajukan peminjaman")
    }
  }

  return (
    <div className="space-y-8 pb-8">
      <HeroSection />

      <div className="container space-y-8">
        <RoomCarousel onBookRoom={(roomId) => handleOpenBooking("room", roomId)} />
        <EquipmentCarousel onBookEquipment={(equipmentId) => handleOpenBooking("equipment", equipmentId)} />
        <RulesSection />
      </div>

      <NewBookingModal
        open={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        onSubmit={handleBookingSubmit}
        preselectedType={selectedType}
        preselectedItemId={selectedItemId}
      />
    </div>
  )
}
