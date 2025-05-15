"use client"

import { Bell, Menu } from "lucide-react"
import { Logo } from "./logo"
import { HeaderNav } from "./header-nav"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
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

        <Logo variant="sidebar" />
      </div>

      {/* Center section with navigation */}
      <HeaderNav />

      {/* Right section with notifications */}
      <div className="flex items-center gap-2">
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
