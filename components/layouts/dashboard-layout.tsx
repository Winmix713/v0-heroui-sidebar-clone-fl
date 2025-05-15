"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  pageTitle?: string
  pageDescription?: string
}

export function DashboardLayout({ children, pageTitle, pageDescription }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Get the active section based on the current path
  const getActiveSection = () => {
    if (pathname === "/") return "dashboard"
    if (pathname?.startsWith("/teams")) return "teams"
    if (pathname?.startsWith("/statistics")) return "statistics"
    if (pathname?.startsWith("/matches")) return "matches"
    if (pathname?.startsWith("/league-management")) return "league-management"
    if (pathname?.startsWith("/settings")) return "settings"
    return "dashboard"
  }

  const activeSection = getActiveSection()

  // Store sidebar state in localStorage
  useEffect(() => {
    setMounted(true)
    try {
      const storedState = localStorage.getItem("sidebarOpen")
      if (storedState !== null) {
        setSidebarOpen(storedState === "true")
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !sidebarOpen
    setSidebarOpen(newState)
    try {
      localStorage.setItem("sidebarOpen", String(newState))
    } catch (error) {
      console.error("Error setting localStorage:", error)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#18181b]">
      <DashboardHeader onMenuClick={toggleSidebar} activeSection={activeSection} />

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <DashboardSidebar activeItem={activeSection} />
        </div>

        <main className="flex-1 overflow-auto">
          {pageTitle && (
            <div className="container mx-auto px-4 pt-8 pb-4">
              <h1 className="text-3xl font-bold text-white mb-2">{pageTitle}</h1>
              {pageDescription && <p className="text-gray-400 max-w-3xl">{pageDescription}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
