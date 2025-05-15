import type React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
}

export function MetricCard({ title, value, change, icon }: MetricCardProps) {
  const isPositive = change > 0

  return (
    <div className="bg-[#09090b] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium flex items-center gap-2">
          {icon}
          {title}
        </h3>
      </div>

      <div className="flex items-end justify-between">
        <div className="text-4xl font-bold text-white">{value}</div>
        <div className={`flex items-center text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
          {Math.abs(change)}%<span className="text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
    </div>
  )
}
