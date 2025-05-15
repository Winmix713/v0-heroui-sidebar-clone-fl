import type React from "react"
import { AlertCircle, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SystemLogProps {
  title: string
  description?: string
  type?: "info" | "warning" | "success"
  children?: React.ReactNode
}

export function SystemLog({ title, description, type = "info", children }: SystemLogProps) {
  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "warning":
        return "bg-amber-950/20 border-amber-900/20"
      case "success":
        return "bg-emerald-950/20 border-emerald-900/20"
      default:
        return "bg-blue-950/20 border-blue-900/20"
    }
  }

  return (
    <Card className={`${getBgColor()} backdrop-blur-sm`}>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        {getIcon()}
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  )
}
