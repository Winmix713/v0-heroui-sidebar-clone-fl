"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface ModernFilterButtonProps {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export function ModernFilterButton({ children, active = false, onClick, className }: ModernFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex justify-center items-center h-12 rounded-full border text-sm font-medium transition-colors px-5.5",
        active ? "border-white/20 text-white" : "border-transparent text-gray-400 hover:text-white",
        className,
      )}
    >
      {children}
    </button>
  )
}
