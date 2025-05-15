"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const comparisonData = [
  {
    name: "Goals",
    teamA: 68,
    teamB: 54,
  },
  {
    name: "Possession",
    teamA: 58,
    teamB: 52,
  },
  {
    name: "Shots",
    teamA: 423,
    teamB: 389,
  },
  {
    name: "Passes",
    teamA: 12458,
    teamB: 11023,
  },
  {
    name: "Tackles",
    teamA: 315,
    teamB: 342,
  },
  {
    name: "Saves",
    teamA: 98,
    teamB: 112,
  },
]

export function TeamComparison() {
  const [teamA, setTeamA] = useState("arsenal")
  const [teamB, setTeamB] = useState("chelsea")

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Team Comparison</CardTitle>
          <CardDescription>Compare performance metrics between teams</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Team A</label>
            <Select value={teamA} onValueChange={setTeamA}>
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arsenal">Arsenal</SelectItem>
                <SelectItem value="chelsea">Chelsea</SelectItem>
                <SelectItem value="liverpool">Liverpool</SelectItem>
                <SelectItem value="mancity">Manchester City</SelectItem>
                <SelectItem value="manutd">Manchester United</SelectItem>
                <SelectItem value="tottenham">Tottenham</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Team B</label>
            <Select value={teamB} onValueChange={setTeamB}>
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arsenal">Arsenal</SelectItem>
                <SelectItem value="chelsea">Chelsea</SelectItem>
                <SelectItem value="liverpool">Liverpool</SelectItem>
                <SelectItem value="mancity">Manchester City</SelectItem>
                <SelectItem value="manutd">Manchester United</SelectItem>
                <SelectItem value="tottenham">Tottenham</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="h-[300px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="teamA" name="Arsenal" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="teamB" name="Chelsea" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            Head-to-Head: <span className="font-medium text-foreground">Arsenal 3 - 2 Chelsea</span> (Last 5 matches)
          </p>
          <p>
            Form: <span className="font-medium text-foreground">Arsenal W-W-L-W-D | Chelsea W-L-W-L-W</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
