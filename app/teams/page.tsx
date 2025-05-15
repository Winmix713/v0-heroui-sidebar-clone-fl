"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContentGrid, MainContent } from "@/components/ui/content-grid"
import { SectionContainer } from "@/components/ui/section-container"
import { StatsGrid } from "@/components/ui/stats-grid"
import { StatsCard } from "@/components/ui/stats-card"
import { Users, Search, Filter, CheckCircle, Trophy, BarChart, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SystemLog } from "@/components/system-log"
import { VideoCard } from "@/components/video-card"
import { VimeoCard } from "@/components/vimeo-card"
import { VideoGrid } from "@/components/video-grid"

// Supabase kliens inicializálása
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface Team {
  id: string
  name: string
  logo_url: string
  players_count: number
  trophies_count: number
  stats?: {
    position: number
    played: number
    won: number
    drawn: number
    lost: number
    goals_for: number
    goals_against: number
    goal_difference: number
    points: number
    form: string
  }
}

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true)

        // Csapatok lekérése
        const { data: teamsData, error: teamsError } = await supabase.from("teams").select("*")

        if (teamsError) throw teamsError

        // Aktív bajnokság lekérése
        const { data: activeLeague, error: leagueError } = await supabase
          .from("leagues")
          .select("id")
          .eq("status", "In Progress")
          .order("created_at", { ascending: false })
          .limit(1)
          .single()

        if (leagueError && leagueError.code !== "PGRST116") {
          // PGRST116: No rows returned
          throw leagueError
        }

        let teamsWithStats = teamsData as Team[]

        // Ha van aktív bajnokság, lekérjük a statisztikákat
        if (activeLeague) {
          const { data: statsData, error: statsError } = await supabase
            .from("team_stats")
            .select("*")
            .eq("league_id", activeLeague.id)

          if (statsError) throw statsError

          // Statisztikák hozzáadása a csapatokhoz
          teamsWithStats = teamsData.map((team) => {
            const teamStats = statsData.find((stat) => stat.team_id === team.id)
            return {
              ...team,
              stats: teamStats
                ? {
                    position: teamStats.position,
                    played: teamStats.played,
                    won: teamStats.won,
                    drawn: teamStats.drawn,
                    lost: teamStats.lost,
                    goals_for: teamStats.goals_for,
                    goals_against: teamStats.goals_against,
                    goal_difference: teamStats.goal_difference,
                    points: teamStats.points,
                    form: teamStats.form,
                  }
                : undefined,
            }
          })

          // Rendezés pozíció szerint
          teamsWithStats.sort((a, b) => {
            if (a.stats && b.stats) {
              return a.stats.position - b.stats.position
            }
            if (a.stats) return -1
            if (b.stats) return 1
            return a.name.localeCompare(b.name)
          })
        }

        setTeams(teamsWithStats)
      } catch (err: any) {
        console.error("Error fetching teams:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  // Filter teams based on search query
  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <PageContainer>
      <PageHeader
        title="Teams"
        description="Manage and analyze all teams in your virtual Premier League"
        icon={<Users className="h-5 w-5" />}
        action={
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <SystemLog
        title="Virtual Premier League Teams Only"
        description="This platform exclusively features Virtual Premier League teams. All match data and statistics refer to these virtual teams, not actual Premier League teams."
        type="info"
      >
        <p className="text-sm text-muted-foreground">
          Note: Some teams have phonetic names (e.g., "Manchester Kék", "London Ágyúk", "Vörös Ördögök") because the
          actual teams like Arsenal, Manchester City, or Manchester United won't be found in the matches being analyzed.
        </p>
      </SystemLog>

      <SectionContainer>
        <StatsGrid columns={4}>
          <StatsCard
            title="Total Teams"
            value={teams.length.toString()}
            icon={<Users className="h-5 w-5 text-blue-400" />}
            bgColor="bg-white/5"
            textColor="text-blue-400"
          />
          <StatsCard
            title="Teams with Stats"
            value={teams.filter((t) => t.stats).length.toString()}
            icon={<CheckCircle className="h-5 w-5 text-emerald-400" />}
            bgColor="bg-white/5"
            textColor="text-emerald-400"
          />
          <StatsCard
            title="Total Trophies"
            value={teams.reduce((sum, team) => sum + team.trophies_count, 0).toString()}
            icon={<Trophy className="h-5 w-5 text-amber-400" />}
            bgColor="bg-white/5"
            textColor="text-amber-400"
          />
          <StatsCard
            title="Avg. Players"
            value={(teams.reduce((sum, team) => sum + team.players_count, 0) / (teams.length || 1)).toFixed(1)}
            icon={<BarChart className="h-5 w-5 text-purple-400" />}
            bgColor="bg-white/5"
            textColor="text-purple-400"
          />
        </StatsGrid>
      </SectionContainer>

      <VideoCard
        title="Premier League Showcase"
        videoUrl="https://s3.eu-west-2.amazonaws.com/nomadstudio-com/videos/premier-league-rebrand-new-logo.mp4"
        aspectRatio="wide"
        className="mb-6"
      />

      <ContentGrid>
        <MainContent fullWidth>
          <div className="mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Virtual Premier League Teams</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-white/50" />
            </div>
          ) : error ? (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
              <p>Error loading teams: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}

              {filteredTeams.length === 0 && (
                <div className="col-span-full text-center p-12 bg-white/5 rounded-lg">
                  <p className="text-white/60">No teams found matching your search criteria.</p>
                </div>
              )}
            </div>
          )}

          <VideoGrid columns={3} className="mt-8">
            <VideoCard
              title="Team Branding"
              videoUrl="https://s3.eu-west-2.amazonaws.com/nomadstudio-com/videos/premier-league-rebrand-clubs.mp4"
            />
            <VideoCard
              title="Color System"
              videoUrl="https://s3.eu-west-2.amazonaws.com/nomadstudio-com/videos/premier-league-rebrand-colour-2.mp4"
            />
            <VimeoCard
              title="Broadcast Layout"
              vimeoUrl="https://player.vimeo.com/video/853718761?h=b9cc34bed7&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
            />
          </VideoGrid>
        </MainContent>
      </ContentGrid>
    </PageContainer>
  )
}

interface TeamCardProps {
  team: Team
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="overflow-hidden border border-[#222224] bg-[#121214]">
      <div className="p-4 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
          <img
            src={team.logo_url || `/placeholder.svg?text=${team.name.charAt(0)}`}
            alt={team.name}
            className="h-8 w-8"
          />
        </div>
        <div>
          <h3 className="font-bold text-white">{team.name}</h3>
          <p className="text-sm text-gray-400">Virtual Premier League</p>
        </div>
        {team.stats && (
          <div className="ml-auto">
            <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
              #{team.stats.position}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 divide-x divide-[#222224] border-t border-[#222224]">
          <div className="p-3 text-center">
            <p className="text-xs text-gray-400">Players</p>
            <p className="font-bold text-white">{team.players_count}</p>
          </div>
          <div className="p-3 text-center">
            <p className="text-xs text-gray-400">Trophies</p>
            <p className="font-bold text-white">{team.trophies_count}</p>
          </div>
          <div className="p-3 text-center">
            <Button variant="ghost" size="sm" className="w-full">
              Details
            </Button>
          </div>
        </div>

        {team.stats && (
          <div className="grid grid-cols-4 divide-x divide-[#222224] border-t border-[#222224]">
            <div className="p-2 text-center">
              <p className="text-xs text-gray-400">P</p>
              <p className="font-bold text-white">{team.stats.played}</p>
            </div>
            <div className="p-2 text-center">
              <p className="text-xs text-gray-400">W-D-L</p>
              <p className="font-bold text-white">
                {team.stats.won}-{team.stats.drawn}-{team.stats.lost}
              </p>
            </div>
            <div className="p-2 text-center">
              <p className="text-xs text-gray-400">GD</p>
              <p
                className={`font-bold ${
                  team.stats.goal_difference > 0
                    ? "text-emerald-400"
                    : team.stats.goal_difference < 0
                      ? "text-red-400"
                      : "text-white"
                }`}
              >
                {team.stats.goal_difference > 0 ? "+" : ""}
                {team.stats.goal_difference}
              </p>
            </div>
            <div className="p-2 text-center">
              <p className="text-xs text-gray-400">PTS</p>
              <p className="font-bold text-white">{team.stats.points}</p>
            </div>
          </div>
        )}

        {team.stats && team.stats.form && (
          <div className="p-2 border-t border-[#222224]">
            <p className="text-xs text-gray-400 mb-1">Form</p>
            <div className="flex gap-1">
              {team.stats.form.split("").map((result, i) => (
                <span
                  key={i}
                  className={`w-6 h-6 flex items-center justify-center text-xs font-semibold text-white rounded ${
                    result === "W" ? "bg-emerald-500" : result === "D" ? "bg-amber-500" : "bg-rose-500"
                  }`}
                >
                  {result}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
