"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { useState } from "react"

interface TeamPlayersProps {
  team: any
}

export function TeamPlayers({ team }: TeamPlayersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  // Sample players data
  const players = [
    {
      id: 1,
      name: "Mohamed Salah",
      position: "RW",
      nationality: "Egypt",
      age: 31,
      appearances: 35,
      goals: 24,
      assists: 12,
      rating: 8.4,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p118748.png",
    },
    {
      id: 2,
      name: "Virgil van Dijk",
      position: "CB",
      nationality: "Netherlands",
      age: 32,
      appearances: 32,
      goals: 3,
      assists: 1,
      rating: 7.9,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p97032.png",
    },
    {
      id: 3,
      name: "Alisson Becker",
      position: "GK",
      nationality: "Brazil",
      age: 31,
      appearances: 36,
      goals: 0,
      assists: 1,
      rating: 7.8,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p116535.png",
    },
    {
      id: 4,
      name: "Trent Alexander-Arnold",
      position: "RB",
      nationality: "England",
      age: 25,
      appearances: 30,
      goals: 3,
      assists: 10,
      rating: 7.7,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p169187.png",
    },
    {
      id: 5,
      name: "Andrew Robertson",
      position: "LB",
      nationality: "Scotland",
      age: 29,
      appearances: 33,
      goals: 1,
      assists: 8,
      rating: 7.5,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p122798.png",
    },
    {
      id: 6,
      name: "Luis Díaz",
      position: "LW",
      nationality: "Colombia",
      age: 27,
      appearances: 28,
      goals: 8,
      assists: 5,
      rating: 7.6,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p244731.png",
    },
    {
      id: 7,
      name: "Darwin Núñez",
      position: "ST",
      nationality: "Uruguay",
      age: 24,
      appearances: 32,
      goals: 15,
      assists: 7,
      rating: 7.4,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p447203.png",
    },
    {
      id: 8,
      name: "Dominik Szoboszlai",
      position: "CM",
      nationality: "Hungary",
      age: 23,
      appearances: 30,
      goals: 5,
      assists: 6,
      rating: 7.3,
      image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p244731.png",
    },
  ]

  // Filter players based on search query
  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "position") {
      return sortOrder === "asc" ? a.position.localeCompare(b.position) : b.position.localeCompare(a.position)
    } else if (sortBy === "rating") {
      return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
    } else if (sortBy === "goals") {
      return sortOrder === "asc" ? a.goals - b.goals : b.goals - a.goals
    } else if (sortBy === "assists") {
      return sortOrder === "asc" ? a.assists - b.assists : b.assists - a.assists
    } else if (sortBy === "appearances") {
      return sortOrder === "asc" ? a.appearances - b.appearances : b.appearances - a.appearances
    }
    return 0
  })

  // Handle sort
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  return (
    <div className="space-y-6">
      {/* Players Filter */}
      <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Játékos keresése..."
                className="w-full bg-black/30 text-white border border-white/10 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Filter className="h-3.5 w-3.5 mr-2" />
                <span>Szűrők</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Players List */}
      <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Játékosok</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Játékos</th>
                  <th
                    className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer"
                    onClick={() => handleSort("position")}
                  >
                    <div className="flex items-center justify-center">
                      <span>Poszt</span>
                      {sortBy === "position" && <ArrowUpDown className="h-4 w-4 ml-1 text-blue-400" />}
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Nemzetiség</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Kor</th>
                  <th
                    className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer"
                    onClick={() => handleSort("appearances")}
                  >
                    <div className="flex items-center justify-center">
                      <span>Meccsek</span>
                      {sortBy === "appearances" && <ArrowUpDown className="h-4 w-4 ml-1 text-blue-400" />}
                    </div>
                  </th>
                  <th
                    className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer"
                    onClick={() => handleSort("goals")}
                  >
                    <div className="flex items-center justify-center">
                      <span>Gólok</span>
                      {sortBy === "goals" && <ArrowUpDown className="h-4 w-4 ml-1 text-blue-400" />}
                    </div>
                  </th>
                  <th
                    className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer"
                    onClick={() => handleSort("assists")}
                  >
                    <div className="flex items-center justify-center">
                      <span>Gólpasszok</span>
                      {sortBy === "assists" && <ArrowUpDown className="h-4 w-4 ml-1 text-blue-400" />}
                    </div>
                  </th>
                  <th
                    className="text-center py-3 px-4 text-gray-400 font-medium cursor-pointer"
                    onClick={() => handleSort("rating")}
                  >
                    <div className="flex items-center justify-center">
                      <span>Értékelés</span>
                      {sortBy === "rating" && <ArrowUpDown className="h-4 w-4 ml-1 text-blue-400" />}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((player) => (
                  <tr key={player.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-black/20">
                          <img
                            src={player.image || "/placeholder.svg"}
                            alt={player.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-white font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-medium">
                        {player.position}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-300">{player.nationality}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{player.age}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{player.appearances}</td>
                    <td className="py-4 px-4 text-center text-emerald-400 font-medium">{player.goals}</td>
                    <td className="py-4 px-4 text-center text-blue-400 font-medium">{player.assists}</td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${
                          player.rating >= 8.0
                            ? "bg-emerald-500/10 text-emerald-400"
                            : player.rating >= 7.5
                              ? "bg-blue-500/10 text-blue-400"
                              : player.rating >= 7.0
                                ? "bg-amber-500/10 text-amber-400"
                                : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {player.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">Nincs találat a keresési feltételeknek megfelelően.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
