import type React from "react"
import { ArrowUpRight } from "lucide-react"

interface GradientCardProps {
  title: string
  description: string
  icon: React.ReactNode
  ctaText?: string
  ctaHref?: string
  gradientFrom?: string
  gradientTo?: string
}

export function GradientCard({
  title,
  description,
  icon,
  ctaText = "Learn more",
  ctaHref = "#",
  gradientFrom = "from-blue-600",
  gradientTo = "to-purple-600",
}: GradientCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} p-1`}>
      <div className="h-full rounded-lg bg-gray-900 p-6 transition-transform duration-300 group-hover:translate-y-1">
        <div className="mb-4 inline-flex rounded-full bg-white/10 p-3">{icon}</div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-gray-300">{description}</p>
        <a href={ctaHref} className="inline-flex items-center text-white/80 transition-colors hover:text-white">
          {ctaText} <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
