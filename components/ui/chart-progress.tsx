"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface ChartItemData {
  label: string
  value: number
  color: string
}

interface ChartProgressProps {
  items: ChartItemData[]
  total: number
  className?: string
  height?: string
}

export function ChartProgress({ items, total, className, height = "h-3" }: ChartProgressProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  return (
    <div className={cn("flex gap-0.5", className)}>
      {items.map((item, index) => {
        const percentage = (item.value / total) * 100

        return (
          <div
            key={index}
            className={cn("group/tooltip relative cursor-pointer", height)}
            style={{
              width: `${percentage}%`,
              backgroundColor: item.color,
            }}
            onMouseEnter={() => setActiveTooltip(`tooltip-${index}`)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity group-hover/tooltip:opacity-20"
              style={{ backgroundColor: "#CCFF00" }}
            />
            <div
              className={cn(
                "chart-tooltip-up absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 invisible opacity-0 text-caption transition-all",
                activeTooltip === `tooltip-${index}` ? "visible opacity-100" : "",
              )}
            >
              <div className="mb-0.5 whitespace-nowrap opacity-80 text-xs">{item.label}</div>
              <div className="text-xs font-medium">{item.value.toLocaleString()}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
