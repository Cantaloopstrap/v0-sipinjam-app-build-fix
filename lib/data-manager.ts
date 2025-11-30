import type { Room, Equipment, Booking, User, BookingFormData } from "./types"
import { mockRooms, mockEquipment, mockBookings, mockUsers } from "./mock-data"
import { getFromLocalStorage, saveToLocalStorage, deserializeDates } from "./utils"

export const STORAGE_KEYS = {
  USERS: "sipinjam_users",
  ROOMS: "sipinjam_rooms",
  EQUIPMENT: "sipinjam_equipment",
  BOOKINGS: "sipinjam_bookings",
} as const

export function initializeLocalStorage() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    saveToLocalStorage(STORAGE_KEYS.USERS, mockUsers)
  }

  // Initialize rooms
  if (!localStorage.getItem(STORAGE_KEYS.ROOMS)) {
    saveToLocalStorage(STORAGE_KEYS.ROOMS, mockRooms)
  }

  // Initialize equipment
  if (!localStorage.getItem(STORAGE_KEYS.EQUIPMENT)) {
    saveToLocalStorage(STORAGE_KEYS.EQUIPMENT, mockEquipment)
  }

  // Initialize bookings
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    saveToLocalStorage(STORAGE_KEYS.BOOKINGS, mockBookings)
  }
}

export function getUsers(): User[] {
  const users = getFromLocalStorage<User[]>(STORAGE_KEYS.USERS, mockUsers)
  return users
}

export function getRooms(): Room[] {
  const rooms = getFromLocalStorage<Room[]>(STORAGE_KEYS.ROOMS, mockRooms)
  return rooms
}

export function getEquipment(): Equipment[] {
  const equipment = getFromLocalStorage<Equipment[]>(STORAGE_KEYS.EQUIPMENT, mockEquipment)
  return equipment
}

export function getBookings(): Booking[] {
  const bookings = getFromLocalStorage<Booking[]>(STORAGE_KEYS.BOOKINGS, mockBookings)
  return deserializeDates(bookings)
}

export function saveUsers(users: User[]): void {
  saveToLocalStorage(STORAGE_KEYS.USERS, users)
}

export function saveRooms(rooms: Room[]): void {
  saveToLocalStorage(STORAGE_KEYS.ROOMS, rooms)
}

export function saveEquipment(equipment: Equipment[]): void {
  saveToLocalStorage(STORAGE_KEYS.EQUIPMENT, equipment)
}

export function saveBookings(bookings: Booking[]): void {
  saveToLocalStorage(STORAGE_KEYS.BOOKINGS, bookings)
}

export function updateStockAvailability(): void {
  const equipment = getEquipment()
  const bookings = getBookings()

  const now = new Date()

  // Reset all equipment to full quantity first
  equipment.forEach((eq) => {
    eq.available = eq.quantity
  })

  // Reduce availability for active/approved bookings
  bookings.forEach((booking) => {
    if (booking.type === "equipment" && (booking.status === "approved" || booking.status === "active")) {
      const startDate = new Date(booking.startDate)
      const endDate = new Date(booking.endDate)

      // Check if booking is currently active
      if (now >= startDate && now <= endDate) {
        const equipment_item = equipment.find((eq) => eq.id === booking.itemId)
        if (equipment_item && equipment_item.available > 0) {
          equipment_item.available -= 1
        }
      }
    }
  })

  // Update status based on availability
  equipment.forEach((eq) => {
    if (eq.available === 0) {
      eq.status = "in-use"
    } else if (eq.available < eq.quantity) {
      eq.status = "booked"
    } else {
      eq.status = "available"
    }
  })

  saveEquipment(equipment)
}

export function createBooking(data: BookingFormData & { userId: string; userName: string }): Booking {
  const bookings = getBookings()

  // Get the item name based on type
  let itemName = ""
  if (data.type === "room") {
    const rooms = getRooms()
    const room = rooms.find((r) => r.id === data.itemId)
    itemName = room?.name || "Unknown Room"
  } else {
    const equipment = getEquipment()
    const equip = equipment.find((e) => e.id === data.itemId)
    itemName = equip?.name || "Unknown Equipment"
  }

  // Create new booking
  const newBooking: Booking = {
    id: `booking-${Date.now()}`,
    userId: data.userId,
    userName: data.userName,
    type: data.type,
    itemId: data.itemId,
    itemName: itemName,
    startDate: data.startDate,
    endDate: data.endDate,
    purpose: data.purpose,
    notes: data.notes || "",
    status: "pending",
    createdAt: new Date(),
  }

  // Save to localStorage
  const updatedBookings = [...bookings, newBooking]
  saveBookings(updatedBookings)

  // Update stock availability if equipment
  if (data.type === "equipment") {
    updateStockAvailability()
  }

  return newBooking
}
