"use client"

import type React from "react"

import { useState } from "react"
import { BarChart, LineChart, PieChart } from "lucide-react"

type ChartType = "accuracy" | "distribution" | "performance"

export function StatisticsCharts() {
  const [activeChart, setActiveChart] = useState<ChartType>("accuracy")

  return (
    <div
      className="animate-fade-in bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="flex items-center gap-1 p-4 border-b border-white/5">
        <ChartButton
          icon={<LineChart className="h-4 w-4" />}
          label="Előrejelzési pontosság"
          isActive={activeChart === "accuracy"}
          onClick={() => setActiveChart("accuracy")}
        />
        <ChartButton
          icon={<PieChart className="h-4 w-4" />}
          label="Tipp eloszlás"
          isActive={activeChart === "distribution"}
          onClick={() => setActiveChart("distribution")}
        />
        <ChartButton
          icon={<BarChart className="h-4 w-4" />}
          label="Teljesítmény"
          isActive={activeChart === "performance"}
          onClick={() => setActiveChart("performance")}
        />
      </div>

      <div className="p-4">
        <div className="h-[350px] flex items-center justify-center">
          <div className="w-full max-w-3xl h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white">Előrejelzési pontosság</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                  <span className="text-sm text-gray-400">Pontosság</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-purple-500"></span>
                  <span className="text-sm text-gray-400">Átlag</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-end">
              <div className="w-full flex items-end justify-between gap-2 h-[250px]">
                {Array.from({ length: 12 }).map((_, index) => {
                  // Generate random heights between 145px and 225px
                  const height = 145 + Math.floor(Math.random() * 80)

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative">
                        {index === 5 && (
                          <div className="absolute top-[25%] left-0 right-0 h-0.5 bg-purple-500/50 z-10"></div>
                        )}
                        <div
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm hover:from-blue-500 hover:to-blue-300 transition-all duration-300"
                          style={{ height: `${height}px` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">H{index + 1}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ChartButtonProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function ChartButton({ icon, label, isActive, onClick }: ChartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition ${
        isActive ? "bg-blue-500/20 text-blue-300" : "text-gray-400 hover:bg-white/5"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
