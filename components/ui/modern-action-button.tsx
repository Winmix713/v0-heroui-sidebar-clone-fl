"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface ModernActionButtonProps {
  icon: LucideIcon
  label: string
  onClick?: () => void
  className?: string
}

export function ModernActionButton({ icon: Icon, label, onClick, className }: ModernActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "action flex items-center gap-2 px-3 py-2 text-sm rounded-lg opacity-80 transition-opacity hover:opacity-100 focus:opacity-100",
        "hover:bg-white/5 text-gray-300",
        className,
      )}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  )
}
