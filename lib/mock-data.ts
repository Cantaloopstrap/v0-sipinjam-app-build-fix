import type { User, Room, Equipment, Booking, Rule, AcademicCalendarEntry } from "./types"

// Mock users for authentication
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "user@sipinjam.ac.id",
    role: "user",
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "admin-1",
    name: "Admin SIPINJAM",
    email: "admin@sipinjam.ac.id",
    role: "admin",
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@sipinjam.ac.id",
    role: "user",
    isActive: true,
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "user-3",
    name: "Michael Johnson",
    email: "michael.j@sipinjam.ac.id",
    role: "user",
    isActive: false,
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "user-4",
    name: "Sarah Williams",
    email: "sarah.w@sipinjam.ac.id",
    role: "user",
    isActive: true,
    createdAt: new Date("2024-04-20"),
  },
  {
    id: "admin-2",
    name: "Admin Support",
    email: "support@sipinjam.ac.id",
    role: "admin",
    isActive: true,
    createdAt: new Date("2024-01-15"),
  },
]

// Mock password for demo: "password123"
export const MOCK_PASSWORD = "password123"

// Mock rooms data
export const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Ruang Kuliah 301",
    capacity: 50,
    facilities: ["Proyektor", "AC", "Papan Tulis", "Sound System"],
    status: "available",
    imageUrl: "/modern-university-classroom-with-projector.jpg",
    building: "Gedung A",
    floor: 3,
  },
  {
    id: "room-2",
    name: "Ruang Seminar",
    capacity: 100,
    facilities: ["Proyektor", "AC", "Microphone", "Kursi Auditorium"],
    status: "booked",
    imageUrl: "/seminar-hall-with-auditorium-seating.jpg",
    building: "Gedung B",
    floor: 2,
  },
  {
    id: "room-3",
    name: "Lab Komputer 1",
    capacity: 40,
    facilities: ["40 Unit PC", "AC", "Proyektor", "Whiteboard"],
    status: "in-use",
    imageUrl: "/computer-lab-with-workstations.jpg",
    building: "Gedung C",
    floor: 1,
  },
  {
    id: "room-4",
    name: "Ruang Meeting",
    capacity: 20,
    facilities: ["TV LED", "AC", "Meja Oval", "Whiteboard"],
    status: "available",
    imageUrl: "/modern-meeting-room-with-oval-table.jpg",
    building: "Gedung A",
    floor: 2,
  },
  {
    id: "room-5",
    name: "Aula Besar",
    capacity: 300,
    facilities: ["Sound System", "Proyektor", "Panggung", "AC Central"],
    status: "available",
    imageUrl: "/large-auditorium-hall-with-stage.jpg",
    building: "Gedung D",
    floor: 1,
  },
]

// Mock equipment data
export const mockEquipment: Equipment[] = [
  {
    id: "eq-1",
    name: "Proyektor",
    category: "Elektronik",
    quantity: 10,
    available: 7,
    status: "available",
    imageUrl: "/modern-projector-device.jpg",
    description: "Proyektor HD untuk presentasi",
  },
  {
    id: "eq-2",
    name: "Laptop",
    category: "Elektronik",
    quantity: 5,
    available: 2,
    status: "available",
    imageUrl: "/modern-laptop-computer.jpg",
    description: "Laptop untuk presentasi dan demo",
  },
  {
    id: "eq-3",
    name: "Microphone Wireless",
    category: "Audio",
    quantity: 8,
    available: 0,
    status: "booked",
    imageUrl: "/wireless-microphone.png",
    description: "Microphone wireless untuk acara",
  },
  {
    id: "eq-4",
    name: "Kamera DSLR",
    category: "Elektronik",
    quantity: 3,
    available: 3,
    status: "available",
    imageUrl: "/professional-dslr-camera.jpg",
    description: "Kamera DSLR untuk dokumentasi",
  },
  {
    id: "eq-5",
    name: "Sound System Portable",
    category: "Audio",
    quantity: 4,
    available: 1,
    status: "available",
    imageUrl: "/portable-sound-system-speaker.jpg",
    description: "Sound system untuk acara outdoor/indoor",
  },
]

// Mock bookings data
export const mockBookings: Booking[] = [
  {
    id: "booking-1",
    userId: "user-1",
    userName: "John Doe",
    type: "room",
    itemId: "room-1",
    itemName: "Ruang Kuliah 301",
    startDate: new Date("2024-12-25T09:00:00"),
    endDate: new Date("2024-12-25T11:00:00"),
    purpose: "Presentasi Tugas Akhir",
    status: "pending",
    createdAt: new Date("2024-12-20"),
  },
  {
    id: "booking-2",
    userId: "user-1",
    userName: "John Doe",
    type: "equipment",
    itemId: "eq-1",
    itemName: "Proyektor",
    startDate: new Date("2024-12-26T13:00:00"),
    endDate: new Date("2024-12-26T15:00:00"),
    purpose: "Workshop Mahasiswa",
    status: "approved",
    approvedBy: "admin-1",
    approvedAt: new Date("2024-12-21"),
    createdAt: new Date("2024-12-20"),
  },
  {
    id: "booking-3",
    userId: "user-1",
    userName: "John Doe",
    type: "room",
    itemId: "room-4",
    itemName: "Ruang Meeting",
    startDate: new Date("2024-12-15T10:00:00"),
    endDate: new Date("2024-12-15T12:00:00"),
    purpose: "Rapat Koordinasi Proyek",
    status: "completed",
    approvedBy: "admin-1",
    approvedAt: new Date("2024-12-10"),
    createdAt: new Date("2024-12-08"),
  },
  {
    id: "booking-4",
    userId: "user-1",
    userName: "John Doe",
    type: "equipment",
    itemId: "eq-4",
    itemName: "Kamera DSLR",
    startDate: new Date("2024-12-18T09:00:00"),
    endDate: new Date("2024-12-18T17:00:00"),
    purpose: "Dokumentasi Event Kampus",
    status: "rejected",
    rejectionReason: "Kamera sudah dibooking untuk acara resmi kampus",
    createdAt: new Date("2024-12-16"),
  },
]

// Mock rules data
export const mockRules: Rule[] = [
  {
    id: 1,
    title: "Waktu Peminjaman",
    content:
      "Peminjaman ruangan dan barang harus dilakukan minimal 3 hari sebelum tanggal penggunaan. Peminjaman maksimal 14 hari ke depan.",
  },
  {
    id: 2,
    title: "Syarat Peminjaman",
    content:
      "Peminjam harus mahasiswa/staff aktif dengan KTM/ID Card yang masih berlaku. Satu peminjam maksimal 2 item aktif bersamaan.",
  },
  {
    id: 3,
    title: "Persetujuan Admin",
    content:
      "Semua peminjaman memerlukan persetujuan admin. Notifikasi persetujuan akan dikirim via email maksimal 2x24 jam.",
  },
  {
    id: 4,
    title: "Tanggung Jawab Peminjam",
    content:
      "Peminjam bertanggung jawab penuh atas kondisi barang/ruangan. Kerusakan atau kehilangan akan dikenakan sanksi sesuai ketentuan.",
  },
  {
    id: 5,
    title: "Pembatalan Peminjaman",
    content:
      "Pembatalan dapat dilakukan maksimal 1 hari sebelum waktu peminjaman. Pembatalan mendadak tanpa alasan akan dicatat dalam sistem.",
  },
  {
    id: 6,
    title: "Sanksi Pelanggaran",
    content:
      "Pelanggaran akan dikenakan sanksi berupa: (1) Teguran tertulis, (2) Suspend akun 1-3 bulan, (3) Blacklist permanen untuk pelanggaran berat.",
  },
]

// Mock academic calendar data with important dates
export const mockAcademicCalendar: AcademicCalendarEntry[] = [
  {
    date: new Date("2024-12-24"),
    title: "Libur Natal",
    type: "holiday",
  },
  {
    date: new Date("2024-12-25"),
    title: "Libur Natal",
    type: "holiday",
  },
  {
    date: new Date("2024-12-31"),
    title: "Libur Tahun Baru",
    type: "holiday",
  },
  {
    date: new Date("2025-01-01"),
    title: "Tahun Baru 2025",
    type: "holiday",
  },
  {
    date: new Date("2025-01-15"),
    title: "Ujian Tengah Semester",
    type: "exam",
  },
  {
    date: new Date("2025-01-16"),
    title: "Ujian Tengah Semester",
    type: "exam",
  },
  {
    date: new Date("2025-01-17"),
    title: "Ujian Tengah Semester",
    type: "exam",
  },
  {
    date: new Date("2025-02-14"),
    title: "Hari Valentine - Event Kampus",
    type: "event",
  },
  {
    date: new Date("2025-03-01"),
    title: "Wisuda Semester Genap",
    type: "event",
  },
  {
    date: new Date("2025-03-15"),
    title: "Ujian Akhir Semester",
    type: "exam",
  },
  {
    date: new Date("2025-03-16"),
    title: "Ujian Akhir Semester",
    type: "exam",
  },
  {
    date: new Date("2025-03-17"),
    title: "Ujian Akhir Semester",
    type: "exam",
  },
]
