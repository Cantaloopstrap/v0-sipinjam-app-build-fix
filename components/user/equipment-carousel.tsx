"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CarouselCard } from "./carousel-card"
import { getEquipment, initializeLocalStorage, updateStockAvailability } from "@/lib/data-manager"
import type { Equipment } from "@/lib/types"
import Link from "next/link"

interface EquipmentCarouselProps {
  onBookEquipment?: (equipmentId: string) => void
}

export function EquipmentCarousel({ onBookEquipment }: EquipmentCarouselProps) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    initializeLocalStorage()
    updateStockAvailability()
    const loadedEquipment = getEquipment()
    setEquipment(loadedEquipment)
  }, [])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  const onSelect = () => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    // Auto-scroll every 5 seconds
    const autoScroll = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, 5000)

    return () => {
      clearInterval(autoScroll)
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Ketersediaan Barang</h2>
            <p className="text-muted-foreground text-sm">Lihat status barang yang tersedia untuk dipinjam</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="h-8 w-8 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="h-8 w-8 bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {equipment.map((equip) => (
            <div key={equip.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <CarouselCard
                item={equip}
                type="equipment"
                onBook={onBookEquipment ? () => onBookEquipment(equip.id) : undefined}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline" asChild>
          <Link href="/user/equipment">Lihat Semua Barang</Link>
        </Button>
      </div>
    </section>
  )
}
