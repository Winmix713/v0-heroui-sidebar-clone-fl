// Create a reusable section container component
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface SectionContainerProps {
  children: ReactNode
  className?: string
}

export function SectionContainer({ children, className }: SectionContainerProps) {
  return (
    <Card className={cn("relative overflow-hidden backdrop-blur-xl bg-background/95 border-white/10", className)}>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="relative p-6">{children}</div>
    </Card>
  )
}
