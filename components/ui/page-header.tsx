// Create a reusable page header component
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function PageHeader({ title, description, icon, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", className)}>
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </h1>
        {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
