"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface TeamOverviewProps {
  team: any
}

export function TeamOverview({ team }: TeamOverviewProps) {
  // Sample data for charts
  const performanceData = [
    { name: "Aug", won: 3, drawn: 1, lost: 0 },
    { name: "Sep", won: 2, drawn: 2, lost: 0 },
    { name: "Oct", won: 3, drawn: 0, lost: 1 },
    { name: "Nov", won: 2, drawn: 1, lost: 1 },
    { name: "Dec", won: 4, drawn: 0, lost: 0 },
    { name: "Jan", won: 3, drawn: 1, lost: 1 },
    { name: "Feb", won: 2, drawn: 1, lost: 1 },
    { name: "Mar", won: 3, drawn: 1, lost: 0 },
    { name: "Apr", won: 2, drawn: 1, lost: 2 },
  ]

  const goalsData = [
    { name: "Aug", scored: 8, conceded: 2 },
    { name: "Sep", scored: 6, conceded: 3 },
    { name: "Oct", scored: 9, conceded: 4 },
    { name: "Nov", scored: 7, conceded: 5 },
    { name: "Dec", scored: 12, conceded: 2 },
    { name: "Jan", scored: 10, conceded: 4 },
    { name: "Feb", scored: 8, conceded: 5 },
    { name: "Mar", scored: 11, conceded: 3 },
    { name: "Apr", scored: 7, conceded: 4 },
  ]

  const resultsPieData = [
    { name: "Győzelem", value: team.won, color: "#10b981" },
    { name: "Döntetlen", value: team.drawn, color: "#f59e0b" },
    { name: "Vereség", value: team.lost, color: "#ef4444" },
  ]

  // Sample upcoming matches
  const upcomingMatches = [
    {
      id: 1,
      date: "2025.05.18",
      time: "16:00",
      opponent: "Manchester Kék",
      isHome: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
    },
    {
      id: 2,
      date: "2025.05.25",
      time: "18:30",
      opponent: "London Ágyúk",
      isHome: false,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
    },
    {
      id: 3,
      date: "2025.06.01",
      time: "15:00",
      opponent: "Chelsea",
      isHome: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
    },
  ]

  // Sample recent matches
  const recentMatches = [
    {
      id: 1,
      date: "2025.05.12",
      opponent: "Vörös Ördögök",
      isHome: true,
      result: "2-0",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    },
    {
      id: 2,
      date: "2025.05.05",
      opponent: "Tottenham",
      isHome: false,
      result: "1-1",
      win: false,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
    },
    {
      id: 3,
      date: "2025.04.28",
      opponent: "Newcastle",
      isHome: true,
      result: "3-0",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t4.png",
    },
    {
      id: 4,
      date: "2025.04.21",
      opponent: "Everton",
      isHome: false,
      result: "1-2",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t11.png",
    },
    {
      id: 5,
      date: "2025.04.14",
      opponent: "Brighton",
      isHome: true,
      result: "4-0",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t36.png",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Team Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Szezon statisztikák</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Lejátszott mérkőzések</span>
                <span className="text-white font-medium">{team.played}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Győzelem</span>
                <span className="text-emerald-400 font-medium">{team.won}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Döntetlen</span>
                <span className="text-amber-400 font-medium">{team.drawn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Vereség</span>
                <span className="text-red-400 font-medium">{team.lost}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Lőtt gólok</span>
                <span className="text-blue-400 font-medium">{team.goalsFor}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Kapott gólok</span>
                <span className="text-purple-400 font-medium">{team.goalsAgainst}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Gólkülönbség</span>
                <span className="text-white font-medium">+{team.goalsFor - team.goalsAgainst}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Pontok</span>
                <span className="text-white font-medium">{team.points}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Eredmények eloszlása</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resultsPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {resultsPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Közelgő mérkőzések</h3>
            <div className="space-y-3">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {match.date} {match.time}
                    </span>
                    <span className="text-xs font-medium text-blue-400">{match.isHome ? "Hazai" : "Vendég"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    {match.isHome ? (
                      <>
                        <div className="flex items-center gap-2">
                          <img
                            src={team.logo || "/placeholder.svg"}
                            alt={team.name}
                            className="h-6 w-6 object-contain"
                          />
                          <span className="text-white font-medium">{team.name}</span>
                        </div>
                        <span className="text-gray-400">vs</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white">{match.opponent}</span>
                          <img
                            src={match.opponentLogo || "/placeholder.svg"}
                            alt={match.opponent}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <img
                            src={match.opponentLogo || "/placeholder.svg"}
                            alt={match.opponent}
                            className="h-6 w-6 object-contain"
                          />
                          <span className="text-white">{match.opponent}</span>
                        </div>
                        <span className="text-gray-400">vs</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{team.name}</span>
                          <img
                            src={team.logo || "/placeholder.svg"}
                            alt={team.name}
                            className="h-6 w-6 object-contain"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                Összes mérkőzés
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Teljesítmény</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
                <Legend />
                <Bar name="Győzelem" dataKey="won" stackId="a" fill="#10b981" />
                <Bar name="Döntetlen" dataKey="drawn" stackId="a" fill="#f59e0b" />
                <Bar name="Vereség" dataKey="lost" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Goals Chart */}
      <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Gólok</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={goalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ backgroundColor: "#111", borderColor: "#333" }} />
                <Legend />
                <Line
                  type="monotone"
                  name="Lőtt gólok"
                  dataKey="scored"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#111", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  name="Kapott gólok"
                  dataKey="conceded"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#111", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Matches */}
      <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Legutóbbi mérkőzések</h3>
          <div className="space-y-3">
            {recentMatches.map((match) => (
              <div key={match.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{match.date}</span>
                  <span
                    className={`text-xs font-medium ${
                      match.win ? "text-emerald-400" : match.result.includes("-") ? "text-amber-400" : "text-red-400"
                    }`}
                  >
                    {match.win ? "Győzelem" : match.result.includes("-") ? "Döntetlen" : "Vereség"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  {match.isHome ? (
                    <>
                      <div className="flex items-center gap-2">
                        <img src={team.logo || "/placeholder.svg"} alt={team.name} className="h-6 w-6 object-contain" />
                        <span className="text-white font-medium">{team.name}</span>
                      </div>
                      <span className="text-white font-bold">{match.result}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{match.opponent}</span>
                        <img
                          src={match.opponentLogo || "/placeholder.svg"}
                          alt={match.opponent}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <img
                          src={match.opponentLogo || "/placeholder.svg"}
                          alt={match.opponent}
                          className="h-6 w-6 object-contain"
                        />
                        <span className="text-white">{match.opponent}</span>
                      </div>
                      <span className="text-white font-bold">{match.result}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{team.name}</span>
                        <img src={team.logo || "/placeholder.svg"} alt={team.name} className="h-6 w-6 object-contain" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              Összes mérkőzés
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
