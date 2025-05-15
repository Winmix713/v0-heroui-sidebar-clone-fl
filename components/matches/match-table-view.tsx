"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"

interface MatchData {
  id: string
  date: string
  time: string
  status: "Completed" | "LIVE" | "Upcoming"
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
}

export function MatchTableView() {
  const [matches] = useState<MatchData[]>(matchData)

  const columns = [
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Time",
      accessorKey: "time",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: MatchData) => {
        let status: "success" | "warning" | "info" = "info"
        const icon = null

        if (row.status === "Completed") {
          status = "success"
        } else if (row.status === "LIVE") {
          status = "warning"
        }

        return <StatusBadge status={status} label={row.status} icon={icon} />
      },
    },
    {
      header: "Home Team",
      accessorKey: "homeTeam",
      className: "text-white font-medium",
    },
    {
      header: "Away Team",
      accessorKey: "awayTeam",
      className: "text-white font-medium",
    },
    {
      header: "Score",
      accessorKey: (row: MatchData) => {
        if (row.status === "Upcoming") {
          return <span className="text-gray-400">-</span>
        }

        const scoreClass = row.homeScore > row.awayScore ? "font-medium text-emerald-500" : "font-medium text-white"

        return <span className={scoreClass}>{`${row.homeScore}-${row.awayScore}`}</span>
      },
      className: "text-center",
    },
    {
      header: "Details",
      accessorKey: (row: MatchData) => (
        <div className="flex justify-center">
          <Button
            size="icon"
            variant="outline"
            className="bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 h-8 w-8"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "text-center",
    },
  ]

  return (
    <div className="bg-black/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-xs">R</span>
        </div>
        <h3 className="text-white font-medium">All Matches</h3>
      </div>

      <DataTable columns={columns} data={matches} keyField="id" emptyState={<div>No matches found</div>} />
    </div>
  )
}

// Sample match data
const matchData: MatchData[] = [
  {
    id: "1",
    date: "2025. 04. 30.",
    time: "21:00",
    status: "Completed",
    homeTeam: "Newcastle",
    awayTeam: "Vörös Ördögök",
    homeScore: 2,
    awayScore: 0,
  },
  {
    id: "2",
    date: "2025. 05. 25.",
    time: "19:00",
    status: "Completed",
    homeTeam: "Nottingham",
    awayTeam: "Brentford",
    homeScore: 4,
    awayScore: 3,
  },
  // ... more match data
]
