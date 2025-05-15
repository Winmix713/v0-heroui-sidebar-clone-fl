"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import {
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"

const trendData = [
  {
    name: "Week 1",
    overUnder: 52,
    spread: 48,
    moneyline: 65,
  },
  {
    name: "Week 2",
    overUnder: 58,
    spread: 52,
    moneyline: 62,
  },
  {
    name: "Week 3",
    overUnder: 45,
    spread: 60,
    moneyline: 70,
  },
  {
    name: "Week 4",
    overUnder: 60,
    spread: 65,
    moneyline: 68,
  },
  {
    name: "Week 5",
    overUnder: 65,
    spread: 58,
    moneyline: 72,
  },
  {
    name: "Week 6",
    overUnder: 70,
    spread: 62,
    moneyline: 75,
  },
  {
    name: "Week 7",
    overUnder: 68,
    spread: 70,
    moneyline: 78,
  },
  {
    name: "Week 8",
    overUnder: 72,
    spread: 68,
    moneyline: 80,
  },
]

export function TrendAnalysis() {
  const [betType, setBetType] = useState("all")

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Trend Analysis</CardTitle>
          <CardDescription>Identify patterns and trends in betting performance</CardDescription>
        </div>
        <Select value={betType} onValueChange={setBetType}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="overUnder">Over/Under</SelectItem>
            <SelectItem value="spread">Spread</SelectItem>
            <SelectItem value="moneyline">Moneyline</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={trendData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              {(betType === "all" || betType === "overUnder") && (
                <Radar name="Over/Under" dataKey="overUnder" stroke="#8884d8" fill="#8884d8" fillOpacity={0.1} />
              )}
              {(betType === "all" || betType === "spread") && (
                <Radar name="Spread" dataKey="spread" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
              )}
              {(betType === "all" || betType === "moneyline") && (
                <Radar name="Moneyline" dataKey="moneyline" stroke="#ffc658" fill="#ffc658" fillOpacity={0.1} />
              )}
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-[#8884d8]/10">
              Over/Under: +20%
            </Badge>
            <Badge variant="outline" className="bg-[#82ca9d]/10">
              Spread: +22%
            </Badge>
            <Badge variant="outline" className="bg-[#ffc658]/10">
              Moneyline: +15%
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              Strongest Trend:{" "}
              <span className="font-medium text-foreground">Moneyline bets improving consistently</span>
            </p>
            <p>
              Weakest Area: <span className="font-medium text-foreground">Over/Under volatility</span>
            </p>
            <p>
              Recommendation:{" "}
              <span className="font-medium text-foreground">Focus on Moneyline bets for consistent returns</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
