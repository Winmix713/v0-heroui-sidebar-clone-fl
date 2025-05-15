import { Trophy } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  variant?: "default" | "sidebar"
  className?: string
}

export function Logo({ variant = "default", className }: LogoProps) {
  if (variant === "sidebar") {
    return (
      <Link href="/" className="flex items-center gap-1.5 group">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
          <Trophy className="text-white h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight text-white">WINMIX</span>
          <span className="text-[8px] -mt-0.5 text-blue-500/80">TIPSTER</span>
        </div>
      </Link>
    )
  }

  return (
    <Link href="/" className="flex items-center gap-1.5 group">
      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
        <Trophy className="text-white h-4 w-4" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-base tracking-tight">WINMIX</span>
        <span className="text-[8px] -mt-0.5 text-blue-500/80">TIPSTER</span>
      </div>
    </Link>
  )
}
