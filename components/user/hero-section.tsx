import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative h-[500px] overflow-hidden rounded-xl">
      <div className="absolute inset-0">
        <img src="/modern-university-building.png" alt="Campus" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-500/80 to-blue-400/70" />
      </div>

      <div className="relative flex h-full items-center px-8 md:px-16">
        <div className="max-w-2xl text-white">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-balance">
            Sistem Informasi Peminjaman
          </h1>
          <p className="mb-8 text-lg md:text-xl text-blue-50 leading-relaxed">
            Kelola peminjaman ruangan dan barang dengan mudah, cepat, dan terorganisir. Tersedia 24/7 untuk kebutuhan
            akademik Anda.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" asChild className="group">
              <Link href="/user/bookings">
                Ajukan Peminjaman
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href="/user/rules">Lihat Tata Tertib</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
