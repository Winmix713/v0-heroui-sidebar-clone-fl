"use client"

import { Bell, BarChart2, LayoutDashboard, Trophy, Shield, BarChart, Users, Menu, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Logo component
function Logo() {
  return (
    <Link href="/" className="relative flex items-center gap-1.5 group">
      <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
        <Trophy className="text-white h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-base tracking-tight text-white">WINMIX</span>
        <span className="text-[8px] -mt-0.5 text-blue-500/80">TIPSTER</span>
      </div>
    </Link>
  )
}

interface DashboardHeaderProps {
  onMenuClick?: () => void
  activeSection?: string
}

export function DashboardHeader({ onMenuClick, activeSection = "dashboard" }: DashboardHeaderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/", id: "dashboard" },
    { label: "Analysis", icon: BarChart2, href: "/analysis", id: "analysis" },
    { label: "Matches", icon: Trophy, href: "/matches", id: "matches" },
    { label: "League Management", icon: Shield, href: "/league-management", id: "league-management" },
    { label: "Statistics", icon: BarChart, href: "/statistics", id: "statistics" },
    { label: "Teams", icon: Users, href: "/teams", id: "teams" },
    { label: "Settings", icon: Settings, href: "/settings", id: "settings" },
  ]

  return (
    <header className="h-16 bg-[#09090b] border-b-2 border-[#222224] flex items-center justify-between px-4 z-10">
      {/* Left section with menu button and logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-[#1e1e20] lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <Logo />
      </div>

      {/* Center section with navigation */}
      {mounted && (
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
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* Right section with notifications and profile */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#1e1e20] relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
