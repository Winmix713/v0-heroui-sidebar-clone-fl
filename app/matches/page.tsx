"use client"

import type React from "react"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContentGrid, MainContent, SidebarContent } from "@/components/ui/content-grid"
import { SectionContainer } from "@/components/ui/section-container"
import { StatsGrid } from "@/components/ui/stats-grid"
import { StatsCard } from "@/components/ui/stats-card"
import { Trophy, Calendar, Filter, ChevronRight, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SystemLog } from "@/components/system-log"
import { VimeoCard } from "@/components/vimeo-card"
import { VideoGrid } from "@/components/video-grid"

export default function MatchesPage() {
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  return (
    <PageContainer>
      <PageHeader
        title="Matches"
        description="View all upcoming and recent matches, analyze results and track statistics"
        icon={<Trophy className="h-5 w-5" />}
        action={
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg">
            <span className="text-sm text-white flex items-center gap-1">
              Details
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </span>
          </div>
        }
      />

      <SystemLog
        title="Virtual Premier League Matches Only"
        description="This platform exclusively features Virtual Premier League matches. All match data and statistics refer to these virtual teams, not actual Premier League teams."
        type="info"
      />

      <VideoGrid columns={2} className="mb-6">
        <VimeoCard
          title="Broadcast Layout"
          vimeoUrl="https://player.vimeo.com/video/853718761?h=b9cc34bed7&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
        />
        <VimeoCard
          title="Broadcast Lineups"
          vimeoUrl="https://player.vimeo.com/video/853063498?h=ff24fde913&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
        />
      </VideoGrid>

      <StatsGrid columns={2}>
        <StatsCard
          title="Total Matches"
          value="124"
          change="+8"
          isPositive={true}
          icon={<Trophy className="h-5 w-5 text-blue-400" />}
        />
        <StatsCard
          title="Prediction Accuracy"
          value="76%"
          change="+2.5%"
          isPositive={true}
          icon={<CheckCircle className="h-5 w-5 text-emerald-400" />}
        />
      </StatsGrid>

      <ContentGrid sidebar>
        <MainContent>
          <SectionContainer>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium text-white">Match Filters</h3>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Select defaultValue="all" onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Matches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Matches</SelectItem>
                    <SelectItem value="live">Live Matches</SelectItem>
                    <SelectItem value="upcoming">Upcoming Matches</SelectItem>
                    <SelectItem value="completed">Completed Matches</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Date</span>
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black/40">
                  <tr className="border-b border-white/5">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Home Team</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Away Team</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Score</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {matchData
                    .filter((match) => {
                      if (filter === "all") return true
                      return match.status.toLowerCase() === filter
                    })
                    .map((match, index) => (
                      <MatchRow key={index} match={match} />
                    ))}
                </tbody>
              </table>
            </div>
          </SectionContainer>
        </MainContent>

        <SidebarContent>
          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-blue-400" />
                Match Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  label="Matches"
                  value="124"
                  icon={<Calendar className="h-4 w-4 text-blue-400" />}
                  bgColor="from-blue-500/10"
                  borderColor="border-blue-500/10"
                />
                <StatCard
                  label="Live"
                  value="3"
                  icon={<Clock className="h-4 w-4 text-green-400" />}
                  bgColor="from-green-500/10"
                  borderColor="border-green-500/10"
                />
                <StatCard
                  label="Performance"
                  value="76%"
                  icon={<CheckCircle className="h-4 w-4 text-purple-400" />}
                  bgColor="from-purple-500/10"
                  borderColor="border-purple-500/10"
                />
                <StatCard
                  label="Predictions"
                  value="82"
                  icon={<Trophy className="h-4 w-4 text-amber-400" />}
                  bgColor="from-amber-500/10"
                  borderColor="border-amber-500/10"
                />
              </div>
            </CardContent>
          </SectionContainer>

          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-blue-400" />
                Prediction Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <Tabs defaultValue="chart">
                <TabsList className="w-full">
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                </TabsList>
                <TabsContent value="chart" className="mt-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 relative overflow-hidden">
                    <h4 className="text-sm font-medium text-gray-400 mb-4">Prediction Distribution</h4>
                    <div className="relative h-[180px] flex items-center justify-center">
                      <div className="relative h-32 w-32">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <div className="absolute top-0 right-0 bottom-0 left-1/2 bg-blue-500"></div>
                          <div className="absolute top-0 right-1/2 bottom-1/2 left-0 bg-emerald-500"></div>
                          <div className="absolute top-1/2 right-1/2 bottom-0 left-0 bg-amber-500"></div>
                        </div>
                        <div className="absolute inset-[15%] rounded-full bg-gray-900/90"></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                        <span className="text-xs text-gray-400">Home (45%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                        <span className="text-xs text-gray-400">Away (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                        <span className="text-xs text-gray-400">Draw (25%)</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="stats" className="mt-4 space-y-4">
                  <PerformanceBar label="Successful predictions" value={76} color="emerald" />
                  <PerformanceBar label="Home wins" value={60} color="blue" />
                  <PerformanceBar label="Away wins" value={42} color="purple" />
                </TabsContent>
              </Tabs>

              <div className="mt-5 flex justify-center">
                <Button className="w-full">View Detailed Analysis</Button>
              </div>
            </CardContent>
          </SectionContainer>

          <VimeoCard
            title="Score Lower Third"
            vimeoUrl="https://player.vimeo.com/video/853092802?h=606ab6342d&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
            className="mt-6"
          />
        </SidebarContent>
      </ContentGrid>
    </PageContainer>
  )
}

interface MatchData {
  date: string
  time: string
  status: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
}

function MatchRow({ match }: { match: MatchData }) {
  const getRowClass = () => {
    if (match.status === "Live")
      return "transition-colors border-b border-white/5 hover:bg-white/5 cursor-pointer bg-red-500/5"
    if (match.status === "Upcoming")
      return "transition-colors border-b border-white/5 hover:bg-white/5 cursor-pointer bg-blue-500/5"
    return "transition-colors border-b border-white/5 hover:bg-white/5 cursor-pointer"
  }

  const getScoreDisplay = () => {
    if (match.status === "Live") {
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="font-bold">{match.homeScore}</span>
          <span>-</span>
          <span className="font-bold">{match.awayScore}</span>
          <Clock className="h-3 w-3 text-red-500 ml-1 animate-pulse" />
        </div>
      )
    }

    if (match.status === "Upcoming") {
      return <span className="text-gray-400">-</span>
    }

    // Completed match
    return <span className="font-medium">{`${match.homeScore}-${match.awayScore}`}</span>
  }

  return (
    <tr className={getRowClass()}>
      <td className="p-4 align-middle text-gray-300">{match.date}</td>
      <td className="p-4 align-middle text-gray-300">{match.time}</td>
      <td className="p-4 align-middle">
        <StatusBadge status={match.status} />
      </td>
      <td className="p-4 align-middle text-white font-medium">{match.homeTeam}</td>
      <td className="p-4 align-middle text-white font-medium">{match.awayTeam}</td>
      <td className="p-4 align-middle text-center">{getScoreDisplay()}</td>
      <td className="p-4 align-middle text-center">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Live") {
    return (
      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-red-500 text-white">
        Live
      </div>
    )
  }

  if (status === "Upcoming") {
    return (
      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-blue-500 text-white">
        Upcoming
      </div>
    )
  }

  return (
    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-green-500 text-white">
      Completed
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string
  icon: React.ReactNode
  bgColor: string
  borderColor: string
}

function StatCard({ label, value, icon, bgColor, borderColor }: StatCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${bgColor} to-transparent backdrop-blur-sm rounded-lg p-4 border ${borderColor}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">{icon}</div>
      </div>
    </div>
  )
}

interface PerformanceBarProps {
  label: string
  value: number
  color: string
}

function PerformanceBar({ label, value, color }: PerformanceBarProps) {
  const getColorClasses = () => {
    switch (color) {
      case "emerald":
        return "bg-emerald-500/20 text-emerald-400"
      case "blue":
        return "bg-blue-500/20 text-blue-400"
      case "purple":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getBarColor = () => {
    switch (color) {
      case "emerald":
        return "bg-emerald-500"
      case "blue":
        return "bg-blue-500"
      case "purple":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-300">{label}</p>
        <div className={`${getColorClasses()} text-xs font-medium py-1 px-2.5 rounded-full`}>{value}%</div>
      </div>
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full ${getBarColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Sample match data - Using Virtual Premier League teams only
const matchData: MatchData[] = [
  {
    date: "2025-04-30",
    time: "21:00",
    status: "Completed",
    homeTeam: "Newcastle",
    awayTeam: "Vörös Ördögök",
    homeScore: 2,
    awayScore: 0,
  },
  {
    date: "2025-05-25",
    time: "19:00",
    status: "Completed",
    homeTeam: "Nottingham",
    awayTeam: "Brentford",
    homeScore: 4,
    awayScore: 3,
  },
  {
    date: "2025-05-02",
    time: "13:00",
    status: "Completed",
    homeTeam: "Liverpool",
    awayTeam: "Vörös Ördögök",
    homeScore: 2,
    awayScore: 3,
  },
  {
    date: "2025-06-02",
    time: "23:00",
    status: "Live",
    homeTeam: "Brighton",
    awayTeam: "Manchester Kék",
    homeScore: 1,
    awayScore: 2,
  },
  {
    date: "2025-06-08",
    time: "22:00",
    status: "Live",
    homeTeam: "Aston Oroszlán",
    awayTeam: "Manchester Kék",
    homeScore: 2,
    awayScore: 1,
  },
  {
    date: "2025-04-30",
    time: "22:00",
    status: "Upcoming",
    homeTeam: "Aston Oroszlán",
    awayTeam: "Brentford",
    homeScore: 0,
    awayScore: 0,
  },
  {
    date: "2025-06-01",
    time: "17:00",
    status: "Upcoming",
    homeTeam: "Liverpool",
    awayTeam: "Manchester Kék",
    homeScore: 0,
    awayScore: 0,
  },
  {
    date: "2025-05-20",
    time: "21:00",
    status: "Upcoming",
    homeTeam: "Brentford",
    awayTeam: "Tottenham",
    homeScore: 0,
    awayScore: 0,
  },
]
