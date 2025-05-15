"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { LeagueTable } from "@/components/league-management/league-table"
import { LeagueStats } from "@/components/league-management/league-stats"

export function LeagueManagementContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#09090b]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">League Management</h1>
              <p className="text-gray-400">Manage your sports leagues, track standings, and view historical data</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <LeagueStats title="Active Leagues" value="4" change="+1" isPositive={true} icon="Trophy" />
              <LeagueStats title="Total Teams" value="32" change="+4" isPositive={true} icon="Users" />
              <LeagueStats title="Completed Seasons" value="12" change="0" isPositive={false} icon="CheckCircle" />
            </div>

            <div className="mb-8">
              <LeagueTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
