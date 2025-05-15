"use client"
import { useState } from "react"
import { X, Clock, AlertCircle, Award, Target, BarChart3 } from "lucide-react"
import type { Match } from "../types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MatchDetailsModalProps {
  match: Match
  isOpen: boolean
  onClose: () => void
}

interface MatchEvent {
  minute: number
  type: "goal" | "yellowCard" | "redCard" | "substitution"
  player: string
  team: "home" | "away"
  detail?: string
}

interface MatchStatistic {
  name: string
  homeValue: number
  awayValue: number
}

export function MatchDetailsModal({ match, isOpen, onClose }: MatchDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("events")

  // Generate match events based on the score
  const matchEvents: MatchEvent[] = []

  // Add goal events for home team
  for (let i = 0; i < match.home_score; i++) {
    matchEvents.push({
      minute: Math.floor(Math.random() * 90) + 1,
      type: "goal",
      player: `${match.home_team} Player ${i + 1}`,
      team: "home",
      detail: ["Header from corner", "Penalty", "Free kick", "Counter-attack"][Math.floor(Math.random() * 4)],
    })
  }

  // Add goal events for away team
  for (let i = 0; i < match.away_score; i++) {
    matchEvents.push({
      minute: Math.floor(Math.random() * 90) + 1,
      type: "goal",
      player: `${match.away_team} Player ${i + 1}`,
      team: "away",
      detail: ["Header from corner", "Penalty", "Free kick", "Counter-attack"][Math.floor(Math.random() * 4)],
    })
  }

  // Add yellow cards
  for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
    matchEvents.push({
      minute: Math.floor(Math.random() * 90) + 1,
      type: "yellowCard",
      player: `${Math.random() > 0.5 ? match.home_team : match.away_team} Player ${Math.floor(Math.random() * 11) + 1}`,
      team: Math.random() > 0.5 ? "home" : "away",
    })
  }

  // Add red cards (less common)
  if (Math.random() > 0.7) {
    matchEvents.push({
      minute: Math.floor(Math.random() * 90) + 1,
      type: "redCard",
      player: `${Math.random() > 0.5 ? match.home_team : match.away_team} Player ${Math.floor(Math.random() * 11) + 1}`,
      team: Math.random() > 0.5 ? "home" : "away",
    })
  }

  // Add substitutions
  for (let i = 0; i < Math.floor(Math.random() * 6) + 2; i++) {
    const team = Math.random() > 0.5 ? "home" : "away"
    matchEvents.push({
      minute: Math.floor(Math.random() * 90) + 1,
      type: "substitution",
      player: `${team === "home" ? match.home_team : match.away_team} Player ${Math.floor(Math.random() * 11) + 1}`,
      team,
      detail: `${team === "home" ? match.home_team : match.away_team} Player ${Math.floor(Math.random() * 11) + 12}`,
    })
  }

  // Sort events by minute
  matchEvents.sort((a, b) => a.minute - b.minute)

  // Generate match statistics
  const matchStats: MatchStatistic[] = [
    {
      name: "Possession",
      homeValue: Math.floor(Math.random() * 30) + 35,
      awayValue: Math.floor(Math.random() * 30) + 35,
    },
    {
      name: "Shots",
      homeValue: match.home_score + Math.floor(Math.random() * 10),
      awayValue: match.away_score + Math.floor(Math.random() * 10),
    },
    {
      name: "Shots on Target",
      homeValue: match.home_score + Math.floor(Math.random() * 3),
      awayValue: match.away_score + Math.floor(Math.random() * 3),
    },
    {
      name: "Corners",
      homeValue: Math.floor(Math.random() * 8) + 2,
      awayValue: Math.floor(Math.random() * 8) + 2,
    },
    {
      name: "Fouls",
      homeValue: Math.floor(Math.random() * 10) + 5,
      awayValue: Math.floor(Math.random() * 10) + 5,
    },
    {
      name: "Offsides",
      homeValue: Math.floor(Math.random() * 5),
      awayValue: Math.floor(Math.random() * 5),
    },
  ]

  // Generate referee name
  const referee = ["John Smith", "Michael Johnson", "David Williams", "Robert Brown", "James Davis"][
    Math.floor(Math.random() * 5)
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border-white/10 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Match Details</DialogTitle>
            <Button className="h-8 w-8 rounded-full" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="bg-black/20 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-full mb-2"></div>
              <span className="font-semibold text-center">{match.home_team}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span>{match.home_score}</span>
                <span>:</span>
                <span>{match.away_score}</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                (HT: {match.ht_home_score}:{match.ht_away_score})
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 rounded-full mb-2"></div>
              <span className="font-semibold text-center">{match.away_team}</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{match.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              <span>{referee}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span>{match.league || "Premier League"}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="events" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 bg-muted/50 w-full rounded-md mb-4">
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              Events
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="lineups"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              Lineups
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Match Timeline
            </h3>
            <div className="space-y-2">
              {matchEvents.map((event, index) => (
                <div
                  key={index}
                  className={`flex items-center p-3 rounded-md ${
                    event.team === "home" ? "bg-blue-500/10" : "bg-red-500/10"
                  }`}
                >
                  <div className="w-12 text-center font-bold">{event.minute}'</div>
                  <div className="mx-2">
                    {event.type === "goal" && <Target className="h-4 w-4 text-emerald-500" />}
                    {event.type === "yellowCard" && <div className="w-3 h-4 bg-yellow-500 rounded-sm"></div>}
                    {event.type === "redCard" && <div className="w-3 h-4 bg-red-500 rounded-sm"></div>}
                    {event.type === "substitution" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-blue-500"
                      >
                        <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"></path>
                        <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"></path>
                        <path d="M16 17h4"></path>
                        <path d="M4 13h4"></path>
                      </svg>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold">{event.player}</div>
                    {event.detail && <div className="text-sm text-gray-400">{event.detail}</div>}
                  </div>
                  <div className={`text-sm ${event.team === "home" ? "text-blue-400" : "text-red-400"}`}>
                    {event.team === "home" ? match.home_team : match.away_team}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Match Statistics
            </h3>
            <div className="space-y-4">
              {matchStats.map((stat, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{stat.homeValue}</span>
                    <span className="text-sm text-gray-400">{stat.name}</span>
                    <span className="text-sm font-medium">{stat.awayValue}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                    <div
                      className="bg-blue-500 h-full"
                      style={{
                        width: `${(stat.homeValue / (stat.homeValue + stat.awayValue)) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="bg-red-500 h-full"
                      style={{
                        width: `${(stat.awayValue / (stat.homeValue + stat.awayValue)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lineups" className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Team Lineups
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-md">
                <h4 className="font-semibold text-blue-400 mb-2">{match.home_team}</h4>
                <div className="space-y-2">
                  {Array.from({ length: 11 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-black/20 rounded">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <span>
                        {match.home_team} Player {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black/20 p-4 rounded-md">
                <h4 className="font-semibold text-red-400 mb-2">{match.away_team}</h4>
                <div className="space-y-2">
                  {Array.from({ length: 11 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-black/20 rounded">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <span>
                        {match.away_team} Player {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
