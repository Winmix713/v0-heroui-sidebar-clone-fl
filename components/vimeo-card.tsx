import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface VimeoCardProps {
  title: string
  description?: string
  vimeoUrl: string
  aspectRatio?: "square" | "video" | "vertical" | "wide"
  className?: string
}

export function VimeoCard({ title, description, vimeoUrl, aspectRatio = "video", className }: VimeoCardProps) {
  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    vertical: "aspect-[9/16]",
    wide: "aspect-[21/9]",
  }

  return (
    <Card className={cn("overflow-hidden bg-[#121214] border-[#222224]", className)}>
      {(title || description) && (
        <CardHeader className="p-4">
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("p-0", aspectRatioClass[aspectRatio])}>
        <iframe
          src={vimeoUrl}
          className="h-full w-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </CardContent>
    </Card>
  )
}
