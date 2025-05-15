"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface TeamStatsProps {
  team: any
}

export function TeamStats({ team }: TeamStatsProps) {
  const [statsTab, setStatsTab] = useState("general")

  // Sample general stats data
  const generalStatsData = [
    { name: "Gólok", value: team.goalsFor },
    { name: "Kapott gólok", value: team.goalsAgainst },
    { name: "Tiszta meccs", value: 12 },
    { name: "Szögletek", value: 186 },
    { name: "Sárga lapok", value: 42 },
    { name: "Piros lapok", value: 2 },
    { name: "Lövések", value: 524 },
    { name: "Kaput eltaláló lövések", value: 218 },
  ]

  // Sample home vs away data
  const homeAwayData = [
    { name: "Győzelem", home: 14, away: 10 },
    { name: "Döntetlen", home: 4, away: 4 },
    { name: "Vereség", home: 1, away: 5 },
    { name: "Lőtt gólok", home: 45, away: 33 },
    { name: "Kapott gólok", home: 12, away: 20 },
    { name: "Pontok", home: 46, away: 34 },
  ]

  // Sample form data
  const formData = [
    { name: "Aug", points: 10, position: 3 },
    { name: "Sep", points: 18, position: 2 },
    { name: "Oct", points: 27, position: 2 },
    { name: "Nov", points: 35, position: 2 },
    { name: "Dec", points: 47, position: 1 },
    { name: "Jan", points: 57, position: 1 },
    { name: "Feb", points: 63, position: 2 },
    { name: "Mar", points: 72, position: 2 },
    { name: "Apr", points: 80, position: 2 },
  ]

  // Sample radar data
  const radarData = [
    { subject: "Támadás", value: 85, fullMark: 100 },
    { subject: "Védekezés", value: 80, fullMark: 100 },
    { subject: "Birtoklás", value: 75, fullMark: 100 },
    { subject: "Passzpontosság", value: 82, fullMark: 100 },
    { subject: "Fizikai erő", value: 78, fullMark: 100 },
    { subject: "Taktikai fegyelem", value: 85, fullMark: 100 },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Navigation */}
      <Tabs value={statsTab} onValueChange={setStatsTab}>
        <TabsList className="bg-black/20 w-full grid grid-cols-4">
          <TabsTrigger value="general" className="data-[state=active]:bg-blue-500/20">
            Általános
          </TabsTrigger>
          <TabsTrigger value="homeaway" className="data-[state=active]:bg-blue-500/20">
            Hazai/Vendég
          </TabsTrigger>
          <TabsTrigger value="form" className="data-[state=active]:bg-blue-500/20">
            Forma
          </TabsTrigger>
          <TabsTrigger value="radar" className="data-[state=active]:bg-blue-500/20">
            Radar
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Stats Content */}
      {statsTab === "general" && (
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Általános statisztikák</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={generalStatsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
                  <Legend />
                  <Bar
                    name="Érték"
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    label={{ position: "top", fill: "#fff" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {statsTab === "homeaway" && (
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Hazai vs Vendég</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={homeAwayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
                  <Legend />
                  <Bar name="Hazai" dataKey="home" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar name="Vendég" dataKey="away" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {statsTab === "form" && (
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Szezon forma</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis yAxisId="left" stroke="#666" />
                  <YAxis yAxisId="right" orientation="right" stroke="#666" />
                  <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    name="Pontok"
                    dataKey="points"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#111", strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    name="Helyezés"
                    dataKey="position"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#111", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {statsTab === "radar" && (
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Csapat képességek</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis dataKey="subject" stroke="#666" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#666" />
                  <Radar name="Képességek" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
