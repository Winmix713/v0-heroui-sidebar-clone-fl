import type React from "react"
import { cn } from "@/lib/utils"

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ModernCard({ children, className, ...props }: ModernCardProps) {
  return (
    <div
      className={cn(
        "card relative overflow-hidden rounded-xl border border-white/10 bg-[#121214] shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ModernCardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center max-lg:flex-wrap border-b border-white/5 px-5 py-3", className)} {...props}>
      {children}
    </div>
  )
}

export function ModernCardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center min-h-12 text-h6 text-lg font-medium max-lg:mr-6 max-lg:pl-0 max-md:mr-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ModernCardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pt-3 px-1 pb-5 max-lg:px-0 max-lg:pb-0", className)} {...props}>
      {children}
    </div>
  )
}
