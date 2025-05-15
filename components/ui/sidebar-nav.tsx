"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Trophy,
  BarChart2,
  Layers,
  BarChart,
  Shield,
  Settings,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Navigációs elemek definíciója
const navItems = [
  {
    id: "dashboard",
    icon: <LayoutDashboard size={20} />,
    title: "Dashboard",
    subtitle: "Overview & Analytics",
    href: "/",
  },
  {
    id: "teams",
    icon: <Users size={20} />,
    title: "Teams",
    subtitle: "Team Management",
    hasSubmenu: true,
    href: "/teams",
  },
  {
    id: "matches",
    icon: <Trophy size={20} />,
    title: "Matches",
    subtitle: "Match Schedules",
    hasSubmenu: true,
    href: "/matches",
  },
  {
    id: "analysis",
    icon: <BarChart2 size={20} />,
    title: "Analysis",
    subtitle: "Performance Analytics",
    badge: "NEW",
    href: "/analysis",
  },
  {
    id: "patterns",
    icon: <Layers size={20} />,
    title: "Patterns",
    subtitle: "Game Patterns",
    hasSubmenu: true,
    href: "/patterns",
  },
  {
    id: "statistics",
    icon: <BarChart size={20} />,
    title: "Statistics",
    subtitle: "Advanced Statistics",
    badge: "BETA",
    href: "/statistics",
  },
  {
    id: "league-management",
    icon: <Shield size={20} />,
    title: "League Management",
    subtitle: "League Operations",
    hasSubmenu: true,
    href: "/league-management",
  },
  {
    id: "settings",
    icon: <Settings size={20} />,
    title: "Settings",
    subtitle: "System Settings",
    hasSubmenu: true,
    href: "/settings",
  },
]

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <nav className={cn("flex-1 px-3 space-y-1", className)}>
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          hasSubmenu={item.hasSubmenu}
          badge={item.badge}
          isActive={pathname === item.href || pathname?.startsWith(item.href + "/")}
          href={item.href}
        />
      ))}
    </nav>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  isActive?: boolean
  hasSubmenu?: boolean
  badge?: "NEW" | "BETA"
  href: string
}

function NavItem({ icon, title, subtitle, isActive, hasSubmenu, badge, href }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative w-full flex items-center px-3 py-3 rounded-md text-left transition-colors",
        isActive ? "text-white bg-[#1e1e20]" : "text-gray-400 hover:text-gray-200 hover:bg-[#1e1e20]/50",
      )}
    >
      {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-md" />}
      <span className="flex items-center justify-center w-6 h-6 mr-3">{icon}</span>
      <div className="flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
      {badge && <span className="px-2 py-0.5 text-xs font-medium text-white bg-blue-600 rounded">{badge}</span>}
      {hasSubmenu && <ChevronRight size={16} className="ml-2 text-gray-500" />}
    </Link>
  )
}
