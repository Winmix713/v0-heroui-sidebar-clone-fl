import type React from "react"
import { cn } from "@/lib/utils"

interface ContentGridProps {
  children: React.ReactNode
  sidebar?: boolean
  className?: string
}

export function ContentGrid({ children, sidebar = false, className }: ContentGridProps) {
  return (
    <div className={cn("w-full grid gap-6", sidebar ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1", className)}>
      {children}
    </div>
  )
}

interface MainContentProps {
  children: React.ReactNode
  fullWidth?: boolean
  className?: string
}

export function MainContent({ children, fullWidth = false, className }: MainContentProps) {
  return <div className={cn("w-full", fullWidth ? "lg:col-span-12" : "lg:col-span-8", className)}>{children}</div>
}

interface SideContentProps {
  children: React.ReactNode
  className?: string
}

export function SideContent({ children, className }: SideContentProps) {
  return <div className={cn("w-full lg:col-span-4", className)}>{children}</div>
}

// Alias for SideContent for backward compatibility
export function SidebarContent({ children, className }: SideContentProps) {
  return <SideContent children={children} className={className} />
}
