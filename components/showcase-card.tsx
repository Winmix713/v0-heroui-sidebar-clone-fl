import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface ShowcaseCardProps {
  title: string
  description: string
  imageSrc: string
  ctaText?: string
  ctaHref?: string
}

export function ShowcaseCard({
  title,
  description,
  imageSrc,
  ctaText = "Learn more",
  ctaHref = "#",
}: ShowcaseCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="relative z-10 p-6">
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            width={400}
            height={250}
            className="w-full transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-gray-300">{description}</p>
        <a href={ctaHref} className="inline-flex items-center text-blue-400 transition-colors hover:text-blue-300">
          {ctaText} <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
