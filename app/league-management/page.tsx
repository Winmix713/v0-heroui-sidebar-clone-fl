"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@supabase/supabase-js"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContentGrid, MainContent } from "@/components/ui/content-grid"
import { SectionContainer } from "@/components/ui/section-container"
import { StatsGrid } from "@/components/ui/stats-grid"
import { StatsCard } from "@/components/ui/stats-card"
import { Shield, Users, CheckCircle, Search, Plus, ChevronLeft, Edit, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { CsvUploader } from "@/components/league-management/csv-uploader"

// Supabase kliens inicializálása
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface League {
  id: string
  name: string
  season: string
  status: "In Progress" | "Completed"
  created_at: string
  updated_at: string
}

interface Match {
  id: string
  league_id: string
  home_team_id: string
  away_team_id: string
  home_team_name: string
  away_team_name: string
  date: string
  home_score: number
  away_score: number
  ht_home_score: number
  ht_away_score: number
  round: string
}

export default function LeagueManagementPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [leagues, setLeagues] = useState<League[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch leagues
  useEffect(() => {
    async function fetchLeagues() {
      try {
        setLoading(true)

        const { data, error } = await supabase.from("leagues").select("*").order("created_at", { ascending: false })

        if (error) throw error

        setLeagues(data || [])
      } catch (err: any) {
        console.error("Error fetching leagues:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeagues()
  }, [])

  // Fetch matches when a league is selected
  useEffect(() => {
    async function fetchMatches() {
      if (!selectedLeagueId) return

      try {
        setLoading(true)

        const { data: matchesData, error: matchesError } = await supabase
          .from("matches")
          .select(`
            id,
            league_id,
            home_team_id,
            away_team_id,
            date,
            home_score,
            away_score,
            ht_home_score,
            ht_away_score,
            round,
            home_teams:home_team_id (name),
            away_teams:away_team_id (name)
          `)
          .eq("league_id", selectedLeagueId)
          .order("date", { ascending: true })

        if (matchesError) throw matchesError

        // Format matches with team names
        const formattedMatches = matchesData.map((match) => ({
          id: match.id,
          league_id: match.league_id,
          home_team_id: match.home_team_id,
          away_team_id: match.away_team_id,
          home_team_name: (match.home_teams as any).name,
          away_team_name: (match.away_teams as any).name,
          date: match.date,
          home_score: match.home_score,
          away_score: match.away_score,
          ht_home_score: match.ht_home_score,
          ht_away_score: match.ht_away_score,
          round: match.round,
        }))

        setMatches(formattedMatches)
      } catch (err: any) {
        console.error("Error fetching matches:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [selectedLeagueId])

  // Get the selected league
  const selectedLeague = selectedLeagueId ? leagues.find((league) => league.id === selectedLeagueId) : null

  // Filter leagues based on search term
  const filteredLeagues = leagues.filter(
    (league) =>
      league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
      league.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateLeague = async () => {
    try {
      const { data, error } = await supabase
        .from("leagues")
        .insert({
          name: "New League",
          season: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
          status: "In Progress",
        })
        .select()
        .single()

      if (error) throw error

      setLeagues([data, ...leagues])
      setSelectedLeagueId(data.id)
      setIsEditing(true)

      toast({
        title: "League Created",
        description: "New league has been created successfully.",
      })
    } catch (err: any) {
      console.error("Error creating league:", err)
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handleUpdateLeague = async (updatedLeague: Partial<League>) => {
    if (!selectedLeagueId) return

    try {
      const { data, error } = await supabase
        .from("leagues")
        .update(updatedLeague)
        .eq("id", selectedLeagueId)
        .select()
        .single()

      if (error) throw error

      setLeagues(leagues.map((league) => (league.id === selectedLeagueId ? { ...league, ...data } : league)))

      setIsEditing(false)

      toast({
        title: "League Updated",
        description: "League has been updated successfully.",
      })
    } catch (err: any) {
      console.error("Error updating league:", err)
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handleDeleteLeague = async (leagueId: string) => {
    try {
      const { error } = await supabase.from("leagues").delete().eq("id", leagueId)

      if (error) throw error

      setLeagues(leagues.filter((league) => league.id !== leagueId))

      if (selectedLeagueId === leagueId) {
        setSelectedLeagueId(null)
      }

      toast({
        title: "League Deleted",
        description: "League has been deleted successfully.",
      })
    } catch (err: any) {
      console.error("Error deleting league:", err)
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }

  const handleUploadSuccess = useCallback(async () => {
    if (!selectedLeagueId) return

    try {
      // Refresh matches
      const { data: matchesData, error: matchesError } = await supabase
        .from("matches")
        .select(`
          id,
          league_id,
          home_team_id,
          away_team_id,
          date,
          home_score,
          away_score,
          ht_home_score,
          ht_away_score,
          round,
          home_teams:home_team_id (name),
          away_teams:away_team_id (name)
        `)
        .eq("league_id", selectedLeagueId)
        .order("date", { ascending: true })

      if (matchesError) throw matchesError

      // Format matches with team names
      const formattedMatches = matchesData.map((match) => ({
        id: match.id,
        league_id: match.league_id,
        home_team_id: match.home_team_id,
        away_team_id: match.away_team_id,
        home_team_name: (match.home_teams as any).name,
        away_team_name: (match.away_teams as any).name,
        date: match.date,
        home_score: match.home_score,
        away_score: match.away_score,
        ht_home_score: match.ht_home_score,
        ht_away_score: match.ht_away_score,
        round: match.round,
      }))

      setMatches(formattedMatches)

      toast({
        title: "Data Updated",
        description: "Match data has been updated successfully.",
      })
    } catch (err: any) {
      console.error("Error refreshing matches:", err)
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    }
  }, [selectedLeagueId, toast])

  return (
    <PageContainer>
      <PageHeader
        title="League Management"
        description="Manage your sports leagues, track standings, and view historical data"
        icon={<Shield className="h-5 w-5" />}
        action={
          !selectedLeague ? (
            <Button onClick={handleCreateLeague}>
              <Plus className="h-4 w-4 mr-2" />
              Create New League
            </Button>
          ) : null
        }
      />

      <StatsGrid columns={3}>
        <StatsCard
          title="Active Leagues"
          value={leagues.filter((l) => l.status === "In Progress").length.toString()}
          icon={<Shield className="h-5 w-5 text-blue-400" />}
        />
        <StatsCard title="Total Teams" value="Loading..." icon={<Users className="h-5 w-5 text-emerald-400" />} />
        <StatsCard
          title="Completed Seasons"
          value={leagues.filter((l) => l.status === "Completed").length.toString()}
          icon={<CheckCircle className="h-5 w-5 text-amber-400" />}
        />
      </StatsGrid>

      <ContentGrid>
        <MainContent fullWidth>
          <SectionContainer>
            {loading && !selectedLeague ? (
              <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-white/50" />
              </div>
            ) : error && !selectedLeague ? (
              <div className="bg-red-500/10 text-red-400 p-4 rounded-lg">
                <p>Error: {error}</p>
              </div>
            ) : selectedLeague ? (
              <LeagueDetails
                league={selectedLeague}
                matches={matches}
                onBack={() => setSelectedLeagueId(null)}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                onUpdateLeague={handleUpdateLeague}
                onDeleteLeague={() => handleDeleteLeague(selectedLeague.id)}
                onUploadSuccess={handleUploadSuccess}
              />
            ) : (
              <LeagueList
                leagues={filteredLeagues}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSelectLeague={setSelectedLeagueId}
                onDeleteLeague={handleDeleteLeague}
              />
            )}
          </SectionContainer>
        </MainContent>
      </ContentGrid>
    </PageContainer>
  )
}

interface LeagueListProps {
  leagues: League[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSelectLeague: (id: string) => void
  onDeleteLeague: (id: string) => void
}

function LeagueList({ leagues, searchTerm, setSearchTerm, onSelectLeague, onDeleteLeague }: LeagueListProps) {
  return (
    <>
      <CardHeader className="px-0 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle className="text-xl font-bold">Leagues</CardTitle>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search leagues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/40">
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Season</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Created</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leagues.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/60">
                    No leagues found. Create your first league to get started.
                  </td>
                </tr>
              ) : (
                leagues.map((league) => (
                  <tr key={league.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-sm font-medium">{league.name}</td>
                    <td className="py-3 px-4 text-sm">{league.season}</td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          league.status === "In Progress"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {league.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">{new Date(league.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => onSelectLeague(league.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onDeleteLeague(league.id)}>
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </>
  )
}

interface LeagueDetailsProps {
  league: League
  matches: Match[]
  onBack: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  onUpdateLeague: (updatedLeague: Partial<League>) => void
  onDeleteLeague: () => void
  onUploadSuccess: () => void
}

function LeagueDetails({
  league,
  matches,
  onBack,
  activeTab,
  setActiveTab,
  isEditing,
  setIsEditing,
  onUpdateLeague,
  onDeleteLeague,
  onUploadSuccess,
}: LeagueDetailsProps) {
  const [editedLeague, setEditedLeague] = useState(league)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedLeague({ ...editedLeague, [name]: value })
  }

  const handleSave = () => {
    onUpdateLeague(editedLeague)
  }

  return (
    <>
      <CardHeader className="px-0 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-xl font-bold">
            {league.name} - {league.season}
          </CardTitle>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              league.status === "In Progress" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {league.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit League
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit League
              </>
            )}
          </Button>
          {!isEditing && (
            <Button variant="destructive" onClick={onDeleteLeague}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-0 pt-2">
        {isEditing && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 space-y-6 border border-white/10 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leagueName" className="block text-sm font-medium text-white/80 mb-2">
                  League Name
                </label>
                <Input
                  type="text"
                  id="leagueName"
                  name="name"
                  value={editedLeague.name}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="Enter league name"
                />
              </div>
              <div>
                <label htmlFor="leagueSeason" className="block text-sm font-medium text-white/80 mb-2">
                  Season
                </label>
                <Input
                  type="text"
                  id="leagueSeason"
                  name="season"
                  value={editedLeague.season}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="Enter season (e.g., 2023-24)"
                />
              </div>
              <div>
                <label htmlFor="leagueStatus" className="block text-sm font-medium text-white/80 mb-2">
                  Status
                </label>
                <select
                  id="leagueStatus"
                  name="status"
                  value={editedLeague.status}
                  onChange={(e) =>
                    setEditedLeague({ ...editedLeague, status: e.target.value as "In Progress" | "Completed" })
                  }
                  className="w-full bg-black/20 text-white border border-white/10 rounded-lg px-4 py-2.5
                    focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent
                    transition-all duration-200"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <CsvUploader leagueId={league.id} onUploadSuccess={onUploadSuccess} />

            <div className="flex justify-end">
              <Button onClick={handleSave} variant="default" className="gap-2">
                Save Changes
              </Button>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-lg font-medium mb-2">League Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span>{league.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Season:</span>
                      <span>{league.season}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span>{league.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created:</span>
                      <span>{new Date(league.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Matches:</span>
                      <span>{matches.length}</span>
                    </div>
                  </div>
                </div>

                {!isEditing && (
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h3 className="text-lg font-medium mb-2">Upload Match Data</h3>
                    <p className="text-sm text-white/60 mb-4">
                      Upload CSV file with match data to update league statistics.
                    </p>
                    <CsvUploader leagueId={league.id} onUploadSuccess={onUploadSuccess} />
                  </div>
                )}
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-medium mb-4">Recent Matches</h3>
                {matches.length > 0 ? (
                  <div className="space-y-3">
                    {matches.slice(0, 5).map((match) => (
                      <div key={match.id} className="p-3 bg-black/20 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">
                          {match.date} - Round {match.round}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{match.home_team_name}</span>
                          <span className="px-3 py-1 bg-black/30 rounded-lg font-mono">
                            {match.home_score} - {match.away_score}
                          </span>
                          <span className="font-medium">{match.away_team_name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 text-white/60">
                    No matches available. Upload match data to see results.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matches" className="mt-4">
            {matches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/40">
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Round</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Home Team</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Score</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Away Team</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">Half-Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match) => (
                      <tr key={match.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-sm">{match.date}</td>
                        <td className="py-3 px-4 text-sm">{match.round}</td>
                        <td className="py-3 px-4 text-sm font-medium">{match.home_team_name}</td>
                        <td className="py-3 px-4 text-sm text-center font-medium">
                          {match.home_score} - {match.away_score}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">{match.away_team_name}</td>
                        <td className="py-3 px-4 text-sm text-center">
                          {match.ht_home_score} - {match.ht_away_score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-12 bg-white/5 rounded-lg">
                <p className="text-white/60">No matches available. Upload match data to see results.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="standings" className="mt-4">
            <div className="text-center p-12 bg-white/5 rounded-lg">
              <p className="text-white/60">
                Standings are automatically calculated from match data and can be viewed on the Statistics page.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="mt-4">
            <div className="text-center p-12 bg-white/5 rounded-lg">
              <p className="text-white/60">
                Teams are automatically created from match data and can be viewed on the Teams page.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  )
}
