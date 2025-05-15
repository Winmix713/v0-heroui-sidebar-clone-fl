import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsTrendProps {
  value: number | string
  trend: number
  trendLabel?: string
  className?: string
}

export function StatsTrend({ value, trend, trendLabel, className }: StatsTrendProps) {
  const isPositive = trend > 0
  const isNegative = trend < 0

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="min-w-13 font-medium">
        <span>{value}</span>
      </div>
      {trend !== 0 && (
        <div
          className={cn(
            "inline-flex items-center gap-1 px-1.5 rounded-lg h-7 text-xs font-medium",
            isPositive ? "bg-green-500/20 text-green-400 border border-green-500/30" : "",
            isNegative ? "bg-red-500/20 text-red-400 border border-red-500/30" : "",
          )}
        >
          {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          {Math.abs(trend)}%{trendLabel && ` ${trendLabel}`}
        </div>
      )}
    </div>
  )
}
