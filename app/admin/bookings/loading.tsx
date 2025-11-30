import { Skeleton } from "@/components/ui/skeleton"

export default function AdminBookingsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-[300px]" />
        <Skeleton className="mt-2 h-5 w-[500px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[120px] rounded-lg" />
        ))}
      </div>

      <Skeleton className="h-[600px] rounded-lg" />
    </div>
  )
}
