// Type definitions for SIPINJAM application

export type UserRole = "user" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  role: UserRole
}

export interface Room {
  id: string
  name: string
  capacity: number
  facilities: string[]
  status: "available" | "booked" | "in-use"
  imageUrl: string
  building: string
  floor: number
}

export interface Equipment {
  id: string
  name: string
  category: string
  quantity: number
  available: number
  status: "available" | "booked" | "maintenance"
  imageUrl: string
  description: string
}

export interface Booking {
  id: string
  userId: string
  userName: string
  type: "room" | "equipment"
  itemId: string
  itemName: string
  startDate: Date
  endDate: Date
  purpose: string
  status: "pending" | "approved" | "rejected" | "active" | "completed" | "cancelled"
  notes?: string
  approvedBy?: string
  approvedAt?: Date
  rejectionReason?: string
  createdAt: Date
}

export interface BookingStatusTimeline {
  status: Booking["status"]
  timestamp: Date
  by?: string
  notes?: string
}

export interface BookingWithTimeline extends Booking {
  timeline?: BookingStatusTimeline[]
}

export interface Rule {
  id: number
  title: string
  content: string
}

export interface BookingFormData {
  type: "room" | "equipment"
  itemId: string
  startDate: Date
  endDate: Date
  purpose: string
  notes?: string
}

export interface UserDeactivation {
  userId: string
  reason: string
  deactivatedBy: string
  deactivatedAt: Date
  reactivateAt?: Date
  duration?: number
}

export interface AcademicCalendarEntry {
  date: Date
  title: string
  type: "holiday" | "exam" | "event"
}
