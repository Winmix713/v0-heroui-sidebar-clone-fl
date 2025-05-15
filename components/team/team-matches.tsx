"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Filter, ChevronLeft, ChevronRight, Check, X } from "lucide-react"

interface TeamMatchesProps {
  team: any
}

export function TeamMatches({ team }: TeamMatchesProps) {
  const [matchesTab, setMatchesTab] = useState("upcoming")
  const [currentMonth, setCurrentMonth] = useState("May")

  // Sample upcoming matches
  const upcomingMatches = [
    {
      id: 1,
      date: "2025.05.18",
      time: "16:00",
      competition: "Premier League",
      opponent: "Manchester Kék",
      isHome: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
    },
    {
      id: 2,
      date: "2025.05.25",
      time: "18:30",
      competition: "Premier League",
      opponent: "London Ágyúk",
      isHome: false,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
    },
    {
      id: 3,
      date: "2025.06.01",
      time: "15:00",
      competition: "Premier League",
      opponent: "Chelsea",
      isHome: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
    },
    {
      id: 4,
      date: "2025.06.08",
      time: "17:00",
      competition: "Premier League",
      opponent: "Tottenham",
      isHome: false,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
    },
    {
      id: 5,
      date: "2025.06.15",
      time: "15:00",
      competition: "Premier League",
      opponent: "Newcastle",
      isHome: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t4.png",
    },
  ]

  // Sample past matches
  const pastMatches = [
    {
      id: 1,
      date: "2025.05.12",
      competition: "Premier League",
      opponent: "Vörös Ördögök",
      isHome: true,
      result: "2-0",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    },
    {
      id: 2,
      date: "2025.05.05",
      competition: "Premier League",
      opponent: "Tottenham",
      isHome: false,
      result: "1-1",
      win: false,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
    },
    {
      id: 3,
      date: "2025.04.28",
      competition: "Premier League",
      opponent: "Newcastle",
      isHome: true,
      result: "3-0",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t4.png",
    },
    {
      id: 4,
      date: "2025.04.21",
      competition: "Premier League",
      opponent: "Everton",
      isHome: false,
      result: "1-2",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t11.png",
    },
    {
      id: 5,
      date: "2025.04.14",
      competition: "Premier League",
      opponent: "Brighton",
      isHome: true,
      result: "4-0",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t36.png",
    },
    {
      id: 6,
      date: "2025.04.07",
      competition: "Premier League",
      opponent: "Brentford",
      isHome: false,
      result: "0-2",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t94.png",
    },
    {
      id: 7,
      date: "2025.03.31",
      competition: "Premier League",
      opponent: "Crystal Palace",
      isHome: true,
      result: "3-1",
      win: true,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t31.png",
    },
    {
      id: 8,
      date: "2025.03.24",
      competition: "Premier League",
      opponent: "Fulham",
      isHome: false,
      result: "1-1",
      win: false,
      opponentLogo: "https://resources.premierleague.com/premierleague/badges/50/t54.png",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Matches Filter */}
      <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <Tabs value={matchesTab} onValueChange={setMatchesTab}>
              <TabsList className="bg-black/20">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-500/20">
                  Közelgő mérkőzések
                </TabsTrigger>
                <TabsTrigger value="past" className="data-[state=active]:bg-blue-500/20">
                  Korábbi mérkőzések
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Filter className="h-3.5 w-3.5 mr-2" />
                <span>Szűrők</span>
              </Button>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg">
                <button className="text-gray-400 hover:text-white">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-300">{currentMonth} 2025</span>
                <button className="text-gray-400 hover:text-white">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matches List */}
      <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">
            {matchesTab === "upcoming" ? "Közelgő mérkőzések" : "Korábbi mérkőzések"}
          </h3>

          <div className="space-y-4">
            {matchesTab === "upcoming"
              ? upcomingMatches.map((match) => (
                  <div key={match.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{match.date}</p>
                          <p className="text-sm text-gray-400">{match.time}</p>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center gap-4">
                        {match.isHome ? (
                          <>
                            <div className="flex flex-col items-center">
                              <img
                                src={team.logo || "/placeholder.svg"}
                                alt={team.name}
                                className="h-10 w-10 object-contain mb-1"
                              />
                              <p className="text-sm text-white">{team.name}</p>
                            </div>
                            <span className="text-lg font-bold text-white">vs</span>
                            <div className="flex flex-col items-center">
                              <img
                                src={match.opponentLogo || "/placeholder.svg"}
                                alt={match.opponent}
                                className="h-10 w-10 object-contain mb-1"
                              />
                              <p className="text-sm text-white">{match.opponent}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col items-center">
                              <img
                                src={match.opponentLogo || "/placeholder.svg"}
                                alt={match.opponent}
                                className="h-10 w-10 object-contain mb-1"
                              />
                              <p className="text-sm text-white">{match.opponent}</p>
                            </div>
                            <span className="text-lg font-bold text-white">vs</span>
                            <div className="flex flex-col items-center">
                              <img
                                src={team.logo || "/placeholder.svg"}
                                alt={team.name}
                                className="h-10 w-10 object-contain mb-1"
                              />
                              <p className="text-sm text-white">{team.name}</p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">{match.competition}</span>
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                          {match.isHome ? "Hazai" : "Vendég"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : pastMatches.map((match) => (
                  <div key={match.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{match.date}</p>
                          <p className="text-sm text-gray-400">{match.competition}</p>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center gap-4">
                        {match.isHome ? (
                          <>
                            <div className="flex flex-col items-center">
                              <img
                                src={team.logo || "/placeholder.svg"}
                                alt={team.name}
                                className="h-10 w-10 object-contain mb-1"
                              />
                              <p className="text-sm text-white">{team.name}</p>
                            </div>
                            <span className="text-lg font-bold text-white">{match.result}</span>
                            <div className="flex flex-col items-center">
                              <img
                                src={match.opponentLogo || "/placeholder.svg"}
                                alt={match.opponent}
                                className="h-10 w-10 object-contain mb-1"
                              />
                              <p className="text-sm text-white">{match.opponent}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col items-center">
                              <img
                                src={match.opponentLogo || "/placeholder.svg"}
                                alt={match.opponent}
                                className="h-10 w-10 object-contain mb-1"
                              />
                              <p className="text-sm text-white">{match.opponent}</p>
                            </div>
                            <span className="text-lg font-bold text-white">{match.result}</span>
                            <div className="flex flex-col items-center">
                              <img
                                src={team.logo || "/placeholder.svg"}
                                alt={team.name}
                                className="h-10 w-10 object-contain mb-1"
                              />
                              <p className="text-sm text-white">{team.name}</p>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {match.win ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                            <Check className="h-3 w-3" />
                            Győzelem
                          </span>
                        ) : match.result.includes("-") ? (
                          <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                            <span className="h-3 w-3">-</span>
                            Döntetlen
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
                            <X className="h-3 w-3" />
                            Vereség
                          </span>
                        )}
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                          {match.isHome ? "Hazai" : "Vendég"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              {matchesTab === "upcoming" ? "További közelgő mérkőzések" : "További korábbi mérkőzések"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
