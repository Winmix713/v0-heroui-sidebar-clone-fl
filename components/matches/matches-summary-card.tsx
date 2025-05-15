"use client"

import type React from "react"

import { Trophy, Clock, Check } from "lucide-react"

interface MatchesSummaryCardProps {
  className?: string
}

export function MatchesSummaryCard({ className }: MatchesSummaryCardProps) {
  return (
    <div
      className={`bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-5 animate-fade-in ${className || ""}`}
      style={{ animationDelay: "0.1s" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Trophy className="h-4 w-4 text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Mérkőzés statisztikák</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Mérkőzések"
          value="124"
          icon={<Calendar className="h-4 w-4 text-blue-400" />}
          bgColor="from-blue-500/10"
          borderColor="border-blue-500/10"
        />
        <StatCard
          label="Élő"
          value="3"
          icon={<Clock className="h-4 w-4 text-green-400" />}
          bgColor="from-green-500/10"
          borderColor="border-green-500/10"
        />
        <StatCard
          label="Teljesítmény"
          value="76%"
          icon={<Check className="h-4 w-4 text-purple-400" />}
          bgColor="from-purple-500/10"
          borderColor="border-purple-500/10"
        />
        <StatCard
          label="Tippek"
          value="82"
          icon={<Trophy className="h-4 w-4 text-amber-400" />}
          bgColor="from-amber-500/10"
          borderColor="border-amber-500/10"
        />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  icon,
  bgColor,
  borderColor,
}: {
  label: string
  value: string
  icon: React.ReactNode
  bgColor: string
  borderColor: string
}) {
  return (
    <div
      className={`bg-gradient-to-br ${bgColor} to-transparent backdrop-blur-sm rounded-lg p-4 border ${borderColor}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`h-8 w-8 rounded-full bg-${bgColor.split("-")[1]}/10 flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
      <line x1="16" x2="16" y1="2" y2="6"></line>
      <line x1="8" x2="8" y1="2" y2="6"></line>
      <line x1="3" x2="21" y1="10" y2="10"></line>
    </svg>
  )
}
