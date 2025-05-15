"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart2, LayoutDashboard, Trophy, Shield, BarChart, Users, Settings, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", id: "dashboard" },
  { label: "Analysis", icon: BarChart2, href: "/analysis", id: "analysis" },
  { label: "Matches", icon: Trophy, href: "/matches", id: "matches" },
  { label: "League Management", icon: Shield, href: "/league-management", id: "league-management" },
  { label: "Statistics", icon: BarChart, href: "/statistics", id: "statistics" },
  { label: "Teams", icon: Users, href: "/teams", id: "teams" },
  { label: "Showcase", icon: Sparkles, href: "/showcase", id: "showcase" },
  { label: "Settings", icon: Settings, href: "/settings", id: "settings" },
]

interface HeaderNavProps {
  className?: string
}

export function HeaderNav({ className }: HeaderNavProps) {
  const pathname = usePathname()

  // Determine active section based on pathname
  const getActiveSection = () => {
    if (pathname === "/") return "dashboard"

    const section = navItems.find((item) => pathname?.startsWith(item.href) && item.href !== "/")

    return section?.id || "dashboard"
  }

  const activeSection = getActiveSection()

  return (
    <nav className={cn("hidden md:flex items-center space-x-1", className)}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
            item.id === activeSection
              ? "bg-transparent text-white active-nav-item"
              : "text-gray-400 hover:text-white hover:bg-[#1e1e20]/50",
          )}
        >
          <item.icon size={18} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
