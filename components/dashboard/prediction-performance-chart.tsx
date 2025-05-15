"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// We'll create a simplified version that doesn't depend on recharts initially
const weeklyData = [
  { name: "H", accuracy: 70, points: 120 },
  { name: "K", accuracy: 68, points: 110 },
  { name: "Sze", accuracy: 78, points: 140 },
  { name: "Cs", accuracy: 76, points: 135 },
  { name: "P", accuracy: 82, points: 150 },
  { name: "Szo", accuracy: 84, points: 160 },
  { name: "V", accuracy: 80, points: 145 },
]

export function PredictionPerformanceChart() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState("weekly")

  // Using useEffect to ensure the component is mounted before trying to render charts
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Card
      className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none h-full animate-fade-in"
      style={{ animationDelay: "0.1s" }}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-white">Predikciós teljesítmény</h3>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-black/20">
              <TabsTrigger className="data-[state=active]:bg-blue-500/20" value="weekly">
                Heti
              </TabsTrigger>
              <TabsTrigger className="data-[state=active]:bg-blue-500/20" value="monthly">
                Havi
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="h-[300px] w-full">
          {mounted ? (
            <div className="w-full h-full">
              <div className="w-full h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">Performance Graph</h3>
                  <div className="text-xs text-gray-400">Last 7 days</div>
                </div>
                <div className="flex-1 grid grid-cols-7 gap-2">
                  {weeklyData.map((entry, index) => (
                    <div key={index} className="flex flex-col h-full justify-end">
                      {/* Accuracy bar */}
                      <div className="relative h-full pt-6">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t"
                          style={{ height: `${entry.accuracy}%` }}
                        ></div>
                      </div>
                      <div className="text-center text-xs text-gray-400 mt-2">{entry.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse w-full h-5/6 rounded-lg bg-gray-700/50"></div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 mt-5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-gray-300">Pontosság</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-300">Pontszám</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
