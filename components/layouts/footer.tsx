export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} SIPINJAM - Sistem Informasi Peminjaman Ruangan dan Barang
        </p>
        <p className="text-sm text-muted-foreground">Built with Next.js</p>
      </div>
    </footer>
  )
}
