"use client"

import type React from "react"

import { useState } from "react"
import { Search, Plus, Eye, Pen, CheckCircle, Trash2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface League {
  id: string
  season: string
  winner: string | null
  secondPlace: string | null
  thirdPlace: string | null
  status: "completed" | "in-progress" | "upcoming"
}

export function LeagueTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const leagues: League[] = [
    {
      id: "1",
      season: "2023-2024",
      winner: null,
      secondPlace: null,
      thirdPlace: null,
      status: "in-progress",
    },
    {
      id: "2",
      season: "2022-2023",
      winner: "Manchester City",
      secondPlace: "Arsenal",
      thirdPlace: "Manchester United",
      status: "completed",
    },
    {
      id: "3",
      season: "2021-2022",
      winner: "Manchester City",
      secondPlace: "Liverpool",
      thirdPlace: "Chelsea",
      status: "completed",
    },
    {
      id: "4",
      season: "2020-2021",
      winner: "Manchester City",
      secondPlace: "Manchester United",
      thirdPlace: "Liverpool",
      status: "completed",
    },
  ]

  const filteredLeagues = leagues.filter(
    (league) =>
      league.season.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (league.winner && league.winner.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (league.secondPlace && league.secondPlace.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (league.thirdPlace && league.thirdPlace.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const StatusBadge = ({ status }: { status: League["status"] }) => {
    if (status === "completed") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400">
          <CheckCircle className="w-3 h-3" />
          Completed
        </span>
      )
    } else if (status === "in-progress") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-400">
          <Clock className="w-3 h-3" />
          In Progress
        </span>
      )
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400">
          <Clock className="w-3 h-3" />
          Upcoming
        </span>
      )
    }
  }

  const ActionButton = ({
    icon,
    color,
    label,
    onClick,
  }: {
    icon: React.ReactNode
    color: string
    label: string
    onClick?: () => void
  }) => {
    return (
      <Button
        size="icon"
        variant="outline"
        className={`bg-white/5 border-white/10 text-${color}-400 hover:bg-${color}-500/20`}
        aria-label={label}
        onClick={onClick}
      >
        {icon}
      </Button>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/5 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-6 bg-black/20">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leagues..."
            className="w-full bg-black/30 text-white border border-white/10 rounded-lg pl-10 pr-4 py-2.5
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
                transition-all duration-200 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search leagues"
          />
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4" />
          New League
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Season</TableHead>
              <TableHead className="text-gray-400 font-normal">Winner</TableHead>
              <TableHead className="text-gray-400 font-normal">Second Place</TableHead>
              <TableHead className="text-gray-400 font-normal">Third Place</TableHead>
              <TableHead className="text-gray-400 font-normal">Status</TableHead>
              <TableHead className="text-gray-400 font-normal text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeagues.map((league) => (
              <TableRow key={league.id} className="border-b border-white/5 hover:bg-white/5">
                <TableCell className="font-medium">{league.season}</TableCell>
                <TableCell>{league.winner || "-"}</TableCell>
                <TableCell>{league.secondPlace || "-"}</TableCell>
                <TableCell>{league.thirdPlace || "-"}</TableCell>
                <TableCell>
                  <StatusBadge status={league.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <ActionButton icon={<Eye className="w-4 h-4" />} color="blue" label={`View ${league.season}`} />
                    <ActionButton icon={<Pen className="w-4 h-4" />} color="amber" label={`Edit ${league.season}`} />
                    {league.status !== "completed" && (
                      <ActionButton
                        icon={<CheckCircle className="w-4 h-4" />}
                        color="emerald"
                        label={`Complete ${league.season}`}
                      />
                    )}
                    <ActionButton icon={<Trash2 className="w-4 h-4" />} color="red" label={`Delete ${league.season}`} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
