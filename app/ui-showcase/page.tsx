"use client"

import { useState } from "react"
import { Edit, Trash, Share, Eye, ArrowDownUp } from "lucide-react"
import { ModernCard, ModernCardHeader, ModernCardTitle, ModernCardContent } from "@/components/ui/modern-card"
import { ModernSearch } from "@/components/ui/modern-search"
import { ModernFilterButton } from "@/components/ui/modern-filter-button"
import { ModernTable } from "@/components/ui/modern-table"
import { ModernActionButton } from "@/components/ui/modern-action-button"
import { ChartProgress } from "@/components/ui/chart-progress"
import { StatsTrend } from "@/components/ui/stats-trend"

interface League {
  id: string
  name: string
  season: string
  teams: number
  matches: number
  status: string
  change: number
  traffic: {
    direct: number
    social: number
    referral: number
  }
}

const sampleLeagues: League[] = [
  {
    id: "1",
    name: "Premier League",
    season: "2023-2024",
    teams: 20,
    matches: 380,
    status: "In Progress",
    change: 36.8,
    traffic: { direct: 232132, social: 340123, referral: 640128 },
  },
  {
    id: "2",
    name: "La Liga",
    season: "2023-2024",
    teams: 20,
    matches: 380,
    status: "In Progress",
    change: 16.5,
    traffic: { direct: 332132, social: 240123, referral: 640128 },
  },
  {
    id: "3",
    name: "Bundesliga",
    season: "2023-2024",
    teams: 18,
    matches: 306,
    status: "Completed",
    change: -23.4,
    traffic: { direct: 432132, social: 340123, referral: 240128 },
  },
  {
    id: "4",
    name: "Serie A",
    season: "2023-2024",
    teams: 20,
    matches: 380,
    status: "In Progress",
    change: 16.5,
    traffic: { direct: 532132, social: 440123, referral: 640128 },
  },
  {
    id: "5",
    name: "Ligue 1",
    season: "2023-2024",
    teams: 18,
    matches: 306,
    status: "Planning",
    change: 36.8,
    traffic: { direct: 232132, social: 340123, referral: 340128 },
  },
]

export default function UIShowcasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeLeague, setActiveLeague] = useState<League | null>(null)

  const filteredLeagues = sampleLeagues.filter(
    (league) =>
      league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const calculateTotal = (league: League) => {
    return league.traffic.direct + league.traffic.social + league.traffic.referral
  }

  return (
    <div className="p-6 min-h-screen bg-[#090909]">
      <h1 className="text-2xl font-bold mb-6 text-white">Modern UI Components</h1>

      <ModernCard className="mb-10">
        <ModernCardHeader>
          <ModernCardTitle>Leagues</ModernCardTitle>

          <ModernSearch
            placeholder="Search leagues"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />

          <div className="flex gap-1 max-md:hidden">
            <ModernFilterButton active={activeFilter === "all"} onClick={() => setActiveFilter("all")}>
              All Leagues
            </ModernFilterButton>
            <ModernFilterButton active={activeFilter === "active"} onClick={() => setActiveFilter("active")}>
              Active
            </ModernFilterButton>
            <ModernFilterButton active={activeFilter === "completed"} onClick={() => setActiveFilter("completed")}>
              Completed
            </ModernFilterButton>
          </div>
        </ModernCardHeader>

        <ModernCardContent>
          <div className="flex gap-6 ml-auto mb-4 lg:hidden">
            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <div className="w-3.5 h-3.5 rounded bg-blue-500/40"></div>
              <div>Social media</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <div className="w-3.5 h-3.5 rounded bg-purple-500/40"></div>
              <div>Direct</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <div className="w-3.5 h-3.5 rounded border border-white/10 bg-gradient-to-r from-gray-800 to-gray-900"></div>
              <div>Referral</div>
            </div>
          </div>

          <ModernTable
            columns={[
              {
                key: "name",
                title: "League",
                render: (league) => (
                  <div className="inline-flex items-center">
                    <div className="relative z-2 shrink-0 bg-black/40 rounded-xl w-16 h-16 flex items-center justify-center text-xl font-bold text-white/50">
                      {league.name.substring(0, 2)}
                    </div>
                    <div className="max-w-69 pl-5 max-md:max-w-fit max-md:w-[calc(100%-4rem)] max-md:pl-4">
                      <div className="pt-0.5 font-medium text-white max-md:pt-0 max-md:line-clamp-1">{league.name}</div>
                      <div className="relative">
                        <div className="text-xs text-gray-400/80">
                          {league.season} • {league.teams} Teams
                        </div>

                        {/* Actions that appear on hover */}
                        <div className="flex flex-wrap gap-2 mt-2 -ml-1 invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 max-md:mt-2 max-md:-mr-4 max-md:gap-0">
                          <ModernActionButton icon={Eye} label="View" />
                          <ModernActionButton icon={Edit} label="Edit" />
                          <ModernActionButton icon={Trash} label="Delete" />
                          <ModernActionButton icon={Share} label="Share" />
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: "matches",
                title: "Matches",
                render: (league) => <StatsTrend value={league.matches} trend={league.change} />,
              },
              {
                key: "traffic",
                title: (
                  <div className="inline-flex items-center w-full">
                    Traffic sources
                    <div className="flex gap-6 ml-auto max-lg:hidden">
                      <div className="flex items-center gap-1.5 text-xs text-white/80">
                        <div className="w-3.5 h-3.5 rounded bg-blue-500/40"></div>
                        <div>Social media</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/80">
                        <div className="w-3.5 h-3.5 rounded bg-purple-500/40"></div>
                        <div>Direct</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/80">
                        <div className="w-3.5 h-3.5 rounded border border-white/10 bg-gradient-to-r from-gray-800 to-gray-900"></div>
                        <div>Referral</div>
                      </div>
                    </div>
                  </div>
                ),
                render: (league) => (
                  <ChartProgress
                    items={[
                      { label: "Social media", value: league.traffic.social, color: "rgba(59, 130, 246, 0.4)" },
                      { label: "Direct", value: league.traffic.direct, color: "rgba(168, 85, 247, 0.4)" },
                      { label: "Referral", value: league.traffic.referral, color: "rgba(55, 65, 81, 0.4)" },
                    ]}
                    total={calculateTotal(league)}
                    className="w-[85%]"
                  />
                ),
                width: "40%",
              },
            ]}
            data={filteredLeagues}
            selectable={true}
            onRowClick={(league) => setActiveLeague(league)}
          />
        </ModernCardContent>
      </ModernCard>

      {activeLeague && (
        <ModernCard>
          <ModernCardHeader>
            <ModernCardTitle>{activeLeague.name} Details</ModernCardTitle>
            <button
              className="ml-auto rounded-full bg-white/5 hover:bg-white/10 p-2 transition-colors"
              onClick={() => setActiveLeague(null)}
            >
              <ArrowDownUp className="h-5 w-5 text-gray-400" />
            </button>
          </ModernCardHeader>
          <ModernCardContent>
            <p className="text-white mb-4">
              This is a placeholder for the league details content. You can expand this with additional stats, tables,
              or charts.
            </p>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">League Summary</h3>
              <p className="text-gray-400">
                Season: {activeLeague.season}
                <br />
                Teams: {activeLeague.teams}
                <br />
                Matches: {activeLeague.matches}
                <br />
                Status: {activeLeague.status}
              </p>
            </div>
          </ModernCardContent>
        </ModernCard>
      )}
    </div>
  )
}
