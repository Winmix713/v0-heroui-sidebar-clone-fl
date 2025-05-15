import type React from "react"
import { cn } from "@/lib/utils"

interface VideoGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function VideoGrid({ children, columns = 2, className }: VideoGridProps) {
  const columnsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return <div className={cn(`grid gap-4 ${columnsClass[columns]}`, className)}>{children}</div>
}
