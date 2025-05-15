import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  title: string
  description?: string
  videoUrl: string
  aspectRatio?: "square" | "video" | "vertical" | "wide"
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
}

export function VideoCard({
  title,
  description,
  videoUrl,
  aspectRatio = "video",
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
}: VideoCardProps) {
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
        <video
          src={videoUrl}
          className="h-full w-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
        />
      </CardContent>
    </Card>
  )
}
