"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContentGrid, MainContent, SidebarContent } from "@/components/ui/content-grid"
import { SectionContainer } from "@/components/ui/section-container"
import { StatsGrid } from "@/components/ui/stats-grid"
import { StatsCard } from "@/components/ui/stats-card"
import { BarChart, Calendar, ChevronRight, Users, Trophy, CheckCircle, ArrowUpRight, Loader2 } from "lucide-react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { VimeoCard } from "@/components/vimeo-card"
import { VideoGrid } from "@/components/video-grid"

// Supabase kliens inicializálása
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface TeamStats {
  team_id: string
  team_name: string
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

interface LeagueStats {
  total_matches: number
  total_goals: number
  avg_goals_per_match: number
  home_wins: number
  away_wins: number
  draws: number
}

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("30")
  const [teamStats, setTeamStats] = useState<TeamStats[]>([])
  const [leagueStats, setLeagueStats] = useState<LeagueStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStatistics() {
      try {
        setLoading(true)

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

        if (!activeLeague) {
          setTeamStats([])
          setLeagueStats(null)
          return
        }

        // Csapat statisztikák lekérése
        const { data: statsData, error: statsError } = await supabase
          .from("team_stats")
          .select(`
            team_id,
            position,
            played,
            won,
            drawn,
            lost,
            goals_for,
            goals_against,
            goal_difference,
            points,
            form,
            teams:team_id (name)
          `)
          .eq("league_id", activeLeague.id)
          .order("position", { ascending: true })

        if (statsError) throw statsError

        // Mérkőzések lekérése a bajnoksághoz
        const { data: matchesData, error: matchesError } = await supabase
          .from("matches")
          .select("*")
          .eq("league_id", activeLeague.id)

        if (matchesError) throw matchesError

        // Csapat statisztikák formázása
        const formattedTeamStats = statsData.map((stat) => ({
          team_id: stat.team_id,
          team_name: (stat.teams as any).name,
          position: stat.position,
          played: stat.played,
          won: stat.won,
          drawn: stat.drawn,
          lost: stat.lost,
          goals_for: stat.goals_for,
          goals_against: stat.goals_against,
          goal_difference: stat.goal_difference,
          points: stat.points,
          form: stat.form,
        }))

        // Bajnokság statisztikák kiszámítása
        const totalMatches = matchesData.length
        const totalGoals = matchesData.reduce((sum, match) => sum + match.home_score + match.away_score, 0)
        const homeWins = matchesData.filter((match) => match.home_score > match.away_score).length
        const awayWins = matchesData.filter((match) => match.home_score < match.away_score).length
        const draws = matchesData.filter((match) => match.home_score === match.away_score).length

        const leagueStatsData = {
          total_matches: totalMatches,
          total_goals: totalGoals,
          avg_goals_per_match: totalMatches > 0 ? totalGoals / totalMatches : 0,
          home_wins: homeWins,
          away_wins: awayWins,
          draws: draws,
        }

        setTeamStats(formattedTeamStats)
        setLeagueStats(leagueStatsData)
      } catch (err: any) {
        console.error("Error fetching statistics:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [])

  return (
    <PageContainer>
      <PageHeader
        title="Statistics"
        description="Detailed analytics, performance metrics and prediction accuracy based on past matches"
        icon={<BarChart className="h-5 w-5" />}
        action={
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">Last {timeRange} days</span>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        }
      />

      <ContentGrid sidebar>
        <MainContent>
          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-400" />
                League Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-white/50" />
                </div>
              ) : error ? (
                <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
                  <p>Error loading statistics: {error}</p>
                </div>
              ) : leagueStats ? (
                <StatsGrid columns={4}>
                  <StatsCard
                    title="Total Matches"
                    value={leagueStats.total_matches.toString()}
                    icon={<BarChart className="h-5 w-5 text-blue-400" />}
                  />
                  <StatsCard
                    title="Total Goals"
                    value={leagueStats.total_goals.toString()}
                    icon={<CheckCircle className="h-5 w-5 text-emerald-400" />}
                  />
                  <StatsCard
                    title="Avg. Goals/Match"
                    value={leagueStats.avg_goals_per_match.toFixed(2)}
                    icon={<Trophy className="h-5 w-5 text-amber-400" />}
                  />
                  <StatsCard
                    title="Home/Away Wins"
                    value={`${leagueStats.home_wins}/${leagueStats.away_wins}`}
                    icon={<ArrowUpRight className="h-5 w-5 text-purple-400" />}
                  />
                </StatsGrid>
              ) : (
                <div className="bg-white/5 p-6 rounded-lg text-center">
                  <p className="text-white/60">No active league found. Please create a league and upload match data.</p>
                </div>
              )}
            </CardContent>
          </SectionContainer>

          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-400" />
                Performance Charts
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <Tabs defaultValue="standings">
                <TabsList className="w-full">
                  <TabsTrigger value="standings">Standings</TabsTrigger>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                  <TabsTrigger value="form">Form</TabsTrigger>
                </TabsList>
                <TabsContent value="standings" className="mt-4">
                  {loading ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="h-8 w-8 animate-spin text-white/50" />
                    </div>
                  ) : teamStats.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-black/40">
                          <tr className="border-b border-white/5">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Pos</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Team</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">P</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">W</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">D</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">L</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">GF</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">GA</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">GD</th>
                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Pts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamStats.map((team) => (
                            <tr key={team.team_id} className="border-b border-white/5 hover:bg-white/5">
                              <td className="py-3 px-4 text-sm font-medium">{team.position}</td>
                              <td className="py-3 px-4 text-sm font-medium">{team.team_name}</td>
                              <td className="py-3 px-4 text-sm text-center">{team.played}</td>
                              <td className="py-3 px-4 text-sm text-center">{team.won}</td>
                              <td className="py-3 px-4 text-sm text-center">{team.drawn}</td>
                              <td className="py-3 px-4 text-sm text-center">{team.lost}</td>
                              <td className="py-3 px-4 text-sm text-center">{team.goals_for}</td>
                              <td className="py-3 px-4 text-sm text-center">{team.goals_against}</td>
                              <td className="py-3 px-4 text-sm text-center">{team.goal_difference}</td>
                              <td className="py-3 px-4 text-sm text-center font-bold">{team.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="bg-white/5 p-6 rounded-lg text-center">
                      <p className="text-white/60">No team statistics available. Please upload match data.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="goals" className="mt-4">
                  <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                    <p className="text-gray-400">Goals chart will be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="form" className="mt-4">
                  {loading ? (
                    <div className="flex items-center justify-center p-12">
                      <Loader2 className="h-8 w-8 animate-spin text-white/50" />
                    </div>
                  ) : teamStats.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamStats.slice(0, 10).map((team) => (
                        <div key={team.team_id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                                {team.position}
                              </span>
                              <h3 className="font-medium">{team.team_name}</h3>
                            </div>
                            <span className="font-bold">{team.points} pts</span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {team.form.split("").map((result, i) => (
                              <span
                                key={i}
                                className={`w-8 h-8 flex items-center justify-center text-xs font-semibold text-white rounded ${
                                  result === "W" ? "bg-emerald-500" : result === "D" ? "bg-amber-500" : "bg-rose-500"
                                }`}
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white/5 p-6 rounded-lg text-center">
                      <p className="text-white/60">No form data available. Please upload match data.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </SectionContainer>

          <VideoGrid columns={2} className="mt-6">
            <VimeoCard
              title="Broadcast Layout"
              vimeoUrl="https://player.vimeo.com/video/853718761?h=b9cc34bed7&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
            />
            <VimeoCard
              title="Head to Head"
              vimeoUrl="https://player.vimeo.com/video/854717626?h=db2dafd636&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
            />
          </VideoGrid>
        </MainContent>

        <SidebarContent>
          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Top Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-6 w-6 animate-spin text-white/50" />
                </div>
              ) : teamStats.length > 0 ? (
                <div className="space-y-4">
                  {teamStats.slice(0, 5).map((team) => (
                    <div
                      key={team.team_id}
                      className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                          {team.position}
                        </span>
                        <span className="font-medium">{team.team_name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{team.points} pts</p>
                        <p className="text-xs text-gray-400">
                          {team.won}W {team.drawn}D {team.lost}L
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 p-4 rounded-lg text-center">
                  <p className="text-white/60">No team data available</p>
                </div>
              )}
            </CardContent>
          </SectionContainer>

          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                Goal Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-6 w-6 animate-spin text-white/50" />
                </div>
              ) : leagueStats ? (
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Total Goals</span>
                      <span className="font-bold">{leagueStats.total_goals}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Home Goals</span>
                      <span className="font-bold">
                        {teamStats.reduce((sum, team) => sum + team.goals_for, 0) -
                          teamStats.reduce((sum, team) => sum + team.goals_against, 0)}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{
                          width: `${
                            leagueStats.total_goals > 0
                              ? (
                                  (teamStats.reduce((sum, team) => sum + team.goals_for, 0) -
                                    teamStats.reduce((sum, team) => sum + team.goals_against, 0)) /
                                    leagueStats.total_goals
                                ) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Away Goals</span>
                      <span className="font-bold">{teamStats.reduce((sum, team) => sum + team.goals_against, 0)}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{
                          width: `${
                            leagueStats.total_goals > 0
                              ? (
                                  teamStats.reduce((sum, team) => sum + team.goals_against, 0) / leagueStats.total_goals
                                ) * 100
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Home Wins</p>
                      <p className="font-bold text-white">{leagueStats.home_wins}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Draws</p>
                      <p className="font-bold text-white">{leagueStats.draws}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-400">Away Wins</p>
                      <p className="font-bold text-white">{leagueStats.away_wins}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 p-4 rounded-lg text-center">
                  <p className="text-white/60">No goal statistics available</p>
                </div>
              )}
            </CardContent>
          </SectionContainer>

          <SectionContainer>
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart className="h-4 w-4 text-purple-400" />
                Match Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-2">
              <VimeoCard
                title="Match Analysis"
                vimeoUrl="https://player.vimeo.com/video/854948211?h=f6230ed63b&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
                height={180}
              />
              <Button variant="outline" className="w-full mt-4">
                View Full Statistics
              </Button>
            </CardContent>
          </SectionContainer>
        </SidebarContent>
      </ContentGrid>
    </PageContainer>
  )
}
