"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { LayoutDashboard, Users, Trophy, BarChart2, Layers, BarChart, Shield, Settings } from "lucide-react"

interface AppHeaderProps {
  activeSection?: string
}

export function AppHeader({ activeSection = "dashboard" }: AppHeaderProps) {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/", id: "dashboard" },
    { label: "Teams", icon: Users, href: "/teams", id: "teams" },
    { label: "Matches", icon: Trophy, href: "/matches", id: "matches" },
    { label: "Analysis", icon: BarChart2, href: "/analysis", id: "analysis" },
    { label: "Patterns", icon: Layers, href: "/patterns", id: "patterns" },
    { label: "Statistics", icon: BarChart, href: "/statistics", id: "statistics" },
    { label: "League", icon: Shield, href: "/league-management", id: "league-management" },
    { label: "Settings", icon: Settings, href: "/settings", id: "settings" },
  ]

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#09090b] border-b border-[#222224] flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="lg:hidden" />
        <div className="hidden md:block">
          <h1 className="text-lg font-semibold text-white">
            {navItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
          </h1>
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              item.id === activeSection
                ? "bg-[#1e1e20] text-white"
                : "text-gray-400 hover:text-white hover:bg-[#1e1e20]/50",
            )}
          >
            <item.icon size={16} />
            <span className="hidden lg:inline">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </Button>
      </div>
    </header>
  )
}
