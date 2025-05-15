"use client"

import { Trophy } from "lucide-react"

export function MatchResultsCard() {
  return (
    <div
      className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-5 animate-fade-in"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Trophy className="h-4 w-4 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Predikciós teljesítmény</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <PerformanceBar label="Sikeres predikciók" value={76} color="emerald" />
          <PerformanceBar label="Hazai győzelmek" value={60} color="blue" />
          <PerformanceBar label="Vendég győzelmek" value={42} color="purple" />
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10 relative overflow-hidden">
          <h4 className="text-sm font-medium text-gray-400 mb-4">Predikciók eloszlása</h4>
          <div className="relative h-[180px] flex items-center justify-center">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute top-0 right-0 bottom-0 left-1/2 bg-blue-500"></div>
                <div className="absolute top-0 right-1/2 bottom-1/2 left-0 bg-emerald-500"></div>
                <div className="absolute top-1/2 right-1/2 bottom-0 left-0 bg-amber-500"></div>
              </div>
              <div className="absolute inset-[15%] rounded-full bg-gray-900/90"></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500"></span>
              <span className="text-xs text-gray-400">Hazai (45%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-gray-400">Vendég (30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500"></span>
              <span className="text-xs text-gray-400">Döntetlen (25%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800">
          Részletes elemzések megtekintése
        </button>
      </div>
    </div>
  )
}

function PerformanceBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-300">{label}</p>
        <div className={`bg-${color}-500/20 text-${color}-400 text-xs font-medium py-1 px-2.5 rounded-full`}>
          {value}%
        </div>
      </div>
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full bg-${color}-500 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}
