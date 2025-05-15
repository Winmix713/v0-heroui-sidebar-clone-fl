"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

const performanceData = [
  { date: "Jan", win: 65, loss: 35, accuracy: 65 },
  { date: "Feb", win: 59, loss: 41, accuracy: 59 },
  { date: "Mar", win: 80, loss: 20, accuracy: 80 },
  { date: "Apr", win: 81, loss: 19, accuracy: 81 },
  { date: "May", win: 56, loss: 44, accuracy: 56 },
  { date: "Jun", win: 55, loss: 45, accuracy: 55 },
  { date: "Jul", win: 40, loss: 60, accuracy: 40 },
  { date: "Aug", win: 72, loss: 28, accuracy: 72 },
  { date: "Sep", win: 90, loss: 10, accuracy: 90 },
  { date: "Oct", win: 75, loss: 25, accuracy: 75 },
  { date: "Nov", win: 68, loss: 32, accuracy: 68 },
  { date: "Dec", win: 82, loss: 18, accuracy: 82 },
]

export function PerformanceAnalysis() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Performance Analysis</CardTitle>
          <CardDescription>Track your prediction performance over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="quarter">Quarter</SelectItem>
            <SelectItem value="year">Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accuracy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
            <TabsTrigger value="wins">Wins</TabsTrigger>
            <TabsTrigger value="losses">Losses</TabsTrigger>
          </TabsList>
          <TabsContent value="accuracy" className="space-y-4">
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Accuracy %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                Average Accuracy: <span className="font-medium text-foreground">68.58%</span>
              </p>
              <p>
                Best Month: <span className="font-medium text-foreground">September (90%)</span>
              </p>
              <p>
                Worst Month: <span className="font-medium text-foreground">July (40%)</span>
              </p>
            </div>
          </TabsContent>
          <TabsContent value="wins" className="space-y-4">
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="win" stackId="1" stroke="#4ade80" fill="#4ade80" name="Wins %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                Total Wins: <span className="font-medium text-foreground">823</span>
              </p>
              <p>
                Best Month: <span className="font-medium text-foreground">September (90 wins)</span>
              </p>
              <p>
                Worst Month: <span className="font-medium text-foreground">July (40 wins)</span>
              </p>
            </div>
          </TabsContent>
          <TabsContent value="losses" className="space-y-4">
            <div className="h-[300px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="loss" stackId="1" stroke="#f43f5e" fill="#f43f5e" name="Losses %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                Total Losses: <span className="font-medium text-foreground">377</span>
              </p>
              <p>
                Best Month: <span className="font-medium text-foreground">September (10 losses)</span>
              </p>
              <p>
                Worst Month: <span className="font-medium text-foreground">July (60 losses)</span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
