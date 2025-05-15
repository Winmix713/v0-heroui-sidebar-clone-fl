import type { ReactNode } from "react"

type StatusType = "success" | "warning" | "info" | "error" | "default"

interface StatusBadgeProps {
  status: StatusType
  label: string
  icon?: ReactNode
}

export function StatusBadge({ status, label, icon }: StatusBadgeProps) {
  const getStatusStyles = (): string => {
    switch (status) {
      case "success":
        return "bg-emerald-500/20 text-emerald-400"
      case "warning":
        return "bg-amber-500/20 text-amber-400"
      case "info":
        return "bg-blue-500/20 text-blue-400"
      case "error":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${getStatusStyles()}`}
    >
      {icon}
      {label}
    </span>
  )
}
