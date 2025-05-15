"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TeamOverview } from "@/components/team/team-overview"
import { TeamMatches } from "@/components/team/team-matches"
import { TeamStats } from "@/components/team/team-stats"
import { TeamPlayers } from "@/components/team/team-players"
import { Shield, Calendar, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TeamDetailPage() {
  const params = useParams()
  const teamId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")

  // Sample team data
  const team = {
    id: teamId,
    name: "Liverpool",
    logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png",
    league: "Premier League",
    position: 2,
    played: 38,
    won: 24,
    drawn: 8,
    lost: 6,
    goalsFor: 78,
    goalsAgainst: 32,
    points: 80,
    form: ["W", "W", "D", "W", "L"],
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/teams">
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              <ArrowLeft className="h-3.5 w-3.5 mr-2" />
              Vissza a csapatokhoz
            </Button>
          </Link>
        </div>

        <PageHeader
          title={team.name}
          description={`${team.league} - ${team.position}. helyezés`}
          icon={<Shield className="w-5 h-5 text-blue-400" />}
          action={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Calendar className="h-3.5 w-3.5 mr-2" />
                <span>Mérkőzések</span>
              </Button>
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Star className="h-3.5 w-3.5 mr-2" />
                <span>Kedvencekhez</span>
              </Button>
            </div>
          }
        />

        {/* Team Header Card */}
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-black/40 to-black/20 p-2 flex items-center justify-center border border-white/5">
                <img
                  src={team.logo || "/placeholder.svg"}
                  alt={`${team.name} logo`}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white">{team.name}</h2>
                <p className="text-gray-400">{team.league}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Helyezés</p>
                  <p className="text-xl font-bold text-white">{team.position}.</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Pontok</p>
                  <p className="text-xl font-bold text-white">{team.points}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Forma</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {team.form.map((result, index) => (
                      <span
                        key={index}
                        className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium ${
                          result === "W"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : result === "D"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Navigation Tabs */}
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black/20 w-full grid grid-cols-4">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500/20">
                Áttekintés
              </TabsTrigger>
              <TabsTrigger value="matches" className="data-[state=active]:bg-blue-500/20">
                Mérkőzések
              </TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-blue-500/20">
                Statisztikák
              </TabsTrigger>
              <TabsTrigger value="players" className="data-[state=active]:bg-blue-500/20">
                Játékosok
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Team Content */}
        <div className="mt-6">
          {activeTab === "overview" && <TeamOverview team={team} />}
          {activeTab === "matches" && <TeamMatches team={team} />}
          {activeTab === "stats" && <TeamStats team={team} />}
          {activeTab === "players" && <TeamPlayers team={team} />}
        </div>
      </div>
    </DashboardLayout>
  )
}
