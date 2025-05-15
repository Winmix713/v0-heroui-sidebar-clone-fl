"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

const data = [
  { name: "London Ágyúk", value: 24, color: "#ef4444" },
  { name: "Liverpool", value: 22, color: "#f97316" },
  { name: "Manchester Kék", value: 18, color: "#3b82f6" },
  { name: "Vörös Ördögök", value: 16, color: "#8b5cf6" },
  { name: "Egyéb", value: 20, color: "#64748b" },
]

export function TeamInsightsCard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Card
      className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none animate-fade-in"
      style={{ animationDelay: "0.3s" }}
    >
      <CardContent className="p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Csapat elemzések</h3>

        <div className="h-[240px]">
          {mounted ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div
                    className="absolute"
                    style={{ top: 0, right: 0, bottom: 0, left: "50%", backgroundColor: "#3b82f6" }}
                  ></div>
                  <div
                    className="absolute"
                    style={{ top: 0, right: "50%", bottom: "50%", left: 0, backgroundColor: "#ef4444" }}
                  ></div>
                  <div
                    className="absolute"
                    style={{ top: "50%", right: "50%", bottom: 0, left: 0, backgroundColor: "#f97316" }}
                  ></div>
                  <div
                    className="absolute"
                    style={{ top: "75%", right: 0, bottom: 0, left: "75%", backgroundColor: "#8b5cf6" }}
                  ></div>
                  <div
                    className="absolute"
                    style={{ top: "50%", right: "25%", bottom: "25%", left: "50%", backgroundColor: "#64748b" }}
                  ></div>
                </div>
                <div className="absolute inset-[15%] rounded-full bg-gray-900/90 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Team Insights</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse w-64 h-64 rounded-full bg-gray-700/50"></div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs text-gray-300 truncate">{item.name}</span>
              <span className="text-xs font-medium text-white ml-auto">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/5">
          <p className="text-xs text-gray-400">Az ábra a legtöbb pontot hozó csapatokat mutatja.</p>
        </div>
      </CardContent>
    </Card>
  )
}
