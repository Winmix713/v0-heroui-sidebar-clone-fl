// Create a reusable stats grid component
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface StatsGridProps {
  children: ReactNode
  className?: string
  columns?: 2 | 3 | 4
}

export function StatsGrid({ children, className, columns = 3 }: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 md:grid-cols-2",
        columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  )
}
