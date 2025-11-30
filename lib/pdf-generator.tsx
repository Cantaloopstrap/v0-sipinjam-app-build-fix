import type { Booking, Room, Equipment } from "./types"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"

export interface BookingPDFData {
  booking: Booking
  item: Room | Equipment
}

// Generate PDF as downloadable file
export function generateBookingPDF(data: BookingPDFData): void {
  const { booking, item } = data

  // Create PDF content as HTML string
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Bukti Peminjaman - ${booking.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #3b82f6;
            margin: 0 0 10px 0;
          }
          .header p {
            margin: 5px 0;
            color: #666;
          }
          .section {
            margin: 20px 0;
          }
          .section h2 {
            color: #333;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 10px;
          }
          .info-row {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #f3f4f6;
          }
          .info-label {
            font-weight: bold;
            width: 200px;
            color: #555;
          }
          .info-value {
            color: #333;
          }
          .status {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .status-approved {
            background-color: #dcfce7;
            color: #16a34a;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>SIPINJAM</h1>
          <p>Sistem Informasi Peminjaman Ruangan dan Barang</p>
          <p>Universitas XYZ</p>
        </div>
        
        <div class="section">
          <h2>Bukti Peminjaman</h2>
          <div class="info-row">
            <div class="info-label">ID Peminjaman:</div>
            <div class="info-value">${booking.id}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Status:</div>
            <div class="info-value">
              <span class="status status-approved">${getStatusLabel(booking.status)}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Data Peminjam</h2>
          <div class="info-row">
            <div class="info-label">Nama:</div>
            <div class="info-value">${booking.userName}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Tanggal Pengajuan:</div>
            <div class="info-value">${format(new Date(booking.createdAt), "dd MMMM yyyy, HH:mm", { locale: localeId })} WIB</div>
          </div>
        </div>

        <div class="section">
          <h2>Detail ${booking.type === "room" ? "Ruangan" : "Barang"}</h2>
          <div class="info-row">
            <div class="info-label">Nama ${booking.type === "room" ? "Ruangan" : "Barang"}:</div>
            <div class="info-value">${booking.itemName}</div>
          </div>
          ${
            booking.type === "room" && "building" in item
              ? `
            <div class="info-row">
              <div class="info-label">Lokasi:</div>
              <div class="info-value">${item.building}, Lantai ${item.floor}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Kapasitas:</div>
              <div class="info-value">${item.capacity} orang</div>
            </div>
          `
              : ""
          }
          ${
            booking.type === "equipment" && "category" in item
              ? `
            <div class="info-row">
              <div class="info-label">Kategori:</div>
              <div class="info-value">${item.category}</div>
            </div>
          `
              : ""
          }
          <div class="info-row">
            <div class="info-label">Waktu Mulai:</div>
            <div class="info-value">${format(new Date(booking.startDate), "dd MMMM yyyy, HH:mm", { locale: localeId })} WIB</div>
          </div>
          <div class="info-row">
            <div class="info-label">Waktu Selesai:</div>
            <div class="info-value">${format(new Date(booking.endDate), "dd MMMM yyyy, HH:mm", { locale: localeId })} WIB</div>
          </div>
          <div class="info-row">
            <div class="info-label">Tujuan:</div>
            <div class="info-value">${booking.purpose}</div>
          </div>
          ${
            booking.notes
              ? `
            <div class="info-row">
              <div class="info-label">Catatan:</div>
              <div class="info-value">${booking.notes}</div>
            </div>
          `
              : ""
          }
        </div>

        ${
          booking.status === "approved" && booking.approvedBy
            ? `
          <div class="section">
            <h2>Persetujuan</h2>
            <div class="info-row">
              <div class="info-label">Disetujui Oleh:</div>
              <div class="info-value">Admin SIPINJAM</div>
            </div>
            <div class="info-row">
              <div class="info-label">Tanggal Persetujuan:</div>
              <div class="info-value">${booking.approvedAt ? format(new Date(booking.approvedAt), "dd MMMM yyyy, HH:mm", { locale: localeId }) : "-"} WIB</div>
            </div>
          </div>
        `
            : ""
        }

        <div class="footer">
          <p>Dokumen ini dicetak secara otomatis dari sistem SIPINJAM</p>
          <p>Dicetak pada: ${format(new Date(), "dd MMMM yyyy, HH:mm", { locale: localeId })} WIB</p>
        </div>
      </body>
    </html>
  `

  // Create a blob and download
  const blob = new Blob([content], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `Bukti-Peminjaman-${booking.id}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Menunggu",
    approved: "Disetujui",
    rejected: "Ditolak",
    active: "Aktif",
    completed: "Selesai",
    cancelled: "Dibatalkan",
  }
  return labels[status] || status
}
