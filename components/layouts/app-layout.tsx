"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { AppHeader } from "@/components/app-header"
import { LayoutDashboard, Users, Trophy, BarChart2, Layers, BarChart, Shield, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Get the active section based on the current path
  const getActiveSection = () => {
    if (pathname === "/") return "dashboard"
    if (pathname?.startsWith("/teams")) return "teams"
    if (pathname?.startsWith("/matches")) return "matches"
    if (pathname?.startsWith("/analysis")) return "analysis"
    if (pathname?.startsWith("/patterns")) return "patterns"
    if (pathname?.startsWith("/statistics")) return "statistics"
    if (pathname?.startsWith("/league-management")) return "league-management"
    if (pathname?.startsWith("/settings")) return "settings"
    return "dashboard"
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const activeSection = getActiveSection()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#09090b]">
        <AppSidebar activeItem={activeSection} />
        <div className="flex flex-col flex-1 w-full">
          <AppHeader activeSection={activeSection} />
          <main className="flex-1 overflow-auto w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

interface AppSidebarProps {
  activeItem: string
}

function AppSidebar({ activeItem }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-[#222224]">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <Trophy className="text-white h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white">WINMIX</span>
            <span className="text-[8px] -mt-0.5 text-blue-500/80">TIPSTER</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 text-sm" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeItem === "dashboard"}>
                  <a href="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeItem === "teams"}>
                  <a href="/teams">
                    <Users className="h-4 w-4" />
                    <span>Teams</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeItem === "matches"}>
                  <a href="/matches">
                    <Trophy className="h-4 w-4" />
                    <span>Matches</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeItem === "analysis"}>
                  <a href="/analysis">
                    <BarChart2 className="h-4 w-4" />
                    <span>Analysis</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-blue-600">NEW</SidebarMenuBadge>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeItem === "patterns"}>
                  <a href="/patterns">
                    <Layers className="h-4 w-4" />
                    <span>Patterns</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeItem === "statistics"}>
                  <a href="/statistics">
                    <BarChart className="h-4 w-4" />
                    <span>Statistics</span>
                  </a>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-purple-600">BETA</SidebarMenuBadge>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeItem === "league-management"}>
                  <a href="/league-management">
                    <Shield className="h-4 w-4" />
                    <span>League Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={activeItem === "settings"}>
                  <a href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 rounded-md border border-[#222224] p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">John Doe</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
