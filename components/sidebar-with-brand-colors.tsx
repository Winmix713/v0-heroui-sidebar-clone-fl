"use client"

import type React from "react"

import { useState } from "react"
import { Home, LayoutGrid, CheckSquare, Users, Clock, Plus, Search, Info, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SidebarWithBrandColors() {
  const [activeItem, setActiveItem] = useState("home")

  return (
    <div className="h-full min-h-[48rem] w-72 flex-1 flex flex-col bg-gradient-to-b from-blue-600 to-blue-500 p-6 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
          <svg fill="none" height="32" viewBox="0 0 32 32" width="32" className="text-white">
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-sm font-medium uppercase">Acme</span>
      </div>

      {/* User Profile */}
      <div className="mt-8 flex items-center gap-3 px-2">
        <Avatar className="h-8 w-8 border border-white/20">
          <img
            src="https://i.pravatar.cc/150?u=a04258114e29028708c"
            alt="Jane Doe"
            className="h-full w-full object-cover"
          />
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm">Jane Doe</p>
          <p className="text-xs text-white/60">Product Designer</p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search..."
            className="h-10 w-full rounded-md bg-blue-500/50 border-none pl-9 text-sm text-white placeholder:text-white/60 focus-visible:ring-1 focus-visible:ring-white/30"
          />
        </div>
      </div>

      {/* Navigation - Overview */}
      <div className="mt-8">
        <h3 className="mb-2 px-2 text-xs text-white/80">Overview</h3>
        <nav className="space-y-1">
          <NavItem
            icon={<Home className="h-5 w-5" />}
            label="Home"
            isActive={activeItem === "home"}
            onClick={() => setActiveItem("home")}
          />
          <NavItem
            icon={<LayoutGrid className="h-5 w-5" />}
            label="Projects"
            onClick={() => setActiveItem("projects")}
            isActive={activeItem === "projects"}
            hasAddButton
          />
          <NavItem
            icon={<CheckSquare className="h-5 w-5" />}
            label="Tasks"
            onClick={() => setActiveItem("tasks")}
            isActive={activeItem === "tasks"}
            hasAddButton
          />
          <NavItem
            icon={<Users className="h-5 w-5" />}
            label="Team"
            onClick={() => setActiveItem("team")}
            isActive={activeItem === "team"}
          />
          <NavItem
            icon={<Clock className="h-5 w-5" />}
            label="Tracker"
            onClick={() => setActiveItem("tracker")}
            isActive={activeItem === "tracker"}
            badge="New"
          />
        </nav>
      </div>

      {/* Navigation - Your Teams */}
      <div className="mt-8">
        <h3 className="mb-2 px-2 text-xs text-white/80">Your Teams</h3>
        <nav className="space-y-1">
          <TeamItem
            initials="HU"
            label="HeroUI"
            onClick={() => setActiveItem("heroui")}
            isActive={activeItem === "heroui"}
          />
          <TeamItem
            initials="TV"
            label="Tailwind Variants"
            onClick={() => setActiveItem("tailwind-variants")}
            isActive={activeItem === "tailwind-variants"}
          />
          <TeamItem
            initials="HP"
            label="HeroUI Pro"
            onClick={() => setActiveItem("heroui-pro")}
            isActive={activeItem === "heroui-pro"}
          />
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-col">
        <Button variant="ghost" className="justify-start text-white/60 hover:bg-blue-600/40 hover:text-white">
          <Info className="mr-2 h-5 w-5" />
          Help & Information
        </Button>
        <Button variant="ghost" className="justify-start text-white/60 hover:bg-blue-600/40 hover:text-white">
          <LogOut className="mr-2 h-5 w-5 rotate-180" />
          Log Out
        </Button>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  hasAddButton?: boolean
  badge?: string
  onClick?: () => void
}

function NavItem({ icon, label, isActive, hasAddButton, badge, onClick }: NavItemProps) {
  return (
    <button
      className={cn(
        "flex h-11 w-full items-center justify-between rounded-lg px-3 text-sm font-medium text-white/60 transition-colors relative",
        isActive ? "text-white active-nav-item" : "hover:bg-blue-600/40 hover:text-white",
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="flex items-center">
        {badge && <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-blue-600">{badge}</span>}
        {hasAddButton && (
          <button className="ml-2 rounded-md p-1 text-white/60 hover:bg-blue-600/40 hover:text-white">
            <Plus className="h-4 w-4" />
          </button>
        )}
      </div>
    </button>
  )
}

interface TeamItemProps {
  initials: string
  label: string
  isActive?: boolean
  onClick?: () => void
}

function TeamItem({ initials, label, isActive, onClick }: TeamItemProps) {
  return (
    <button
      className={cn(
        "flex h-11 w-full items-center rounded-lg px-3 text-sm font-medium text-white/60 transition-colors relative",
        isActive ? "text-white active-nav-item" : "hover:bg-blue-600/40 hover:text-white",
      )}
      onClick={onClick}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 mr-2">
        <span className="text-xs font-semibold text-white/80">{initials}</span>
      </div>
      <span>{label}</span>
    </button>
  )
}
