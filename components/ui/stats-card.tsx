import type React from "react"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  icon?: React.ReactNode
  change?: string
  isPositive?: boolean
  bgColor?: string
  textColor?: string
  className?: string
}

export function StatsCard({
  title,
  value,
  icon,
  change,
  isPositive,
  bgColor = "bg-white/5",
  textColor = "text-blue-400",
  className,
}: StatsCardProps) {
  return (
    <div className={cn("rounded-lg border border-[#222224] p-5", bgColor, className)}>
      <div className="flex items-center justify-between mb-3">
        <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", bgColor)}>{icon}</div>
        {change && (
          <div
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
              isPositive ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400",
            )}
          >
            {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className={cn("text-2xl font-bold", textColor)}>{value}</p>
      </div>
    </div>
  )
}
