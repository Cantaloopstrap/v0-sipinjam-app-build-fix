"use client"

import { Grid3x3, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GridListToggleProps {
  view: "grid" | "list"
  onViewChange: (view: "grid" | "list") => void
}

export function GridListToggle({ view, onViewChange }: GridListToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Button
        variant={view === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        className="h-8 w-8 p-0"
      >
        <Grid3x3 className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className="h-8 w-8 p-0"
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  )
}
