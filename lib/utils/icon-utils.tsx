import { Trophy, Users, CheckCircle, Clock, Calendar, BarChart, BarChart2, Activity, Zap, Shield } from "lucide-react"

type IconName =
  | "Trophy"
  | "Users"
  | "CheckCircle"
  | "Clock"
  | "Calendar"
  | "BarChart"
  | "BarChart2"
  | "Activity"
  | "Zap"
  | "Shield"

export function getIconByName(name: IconName, className?: string) {
  switch (name) {
    case "Trophy":
      return <Trophy className={className} />
    case "Users":
      return <Users className={className} />
    case "CheckCircle":
      return <CheckCircle className={className} />
    case "Clock":
      return <Clock className={className} />
    case "Calendar":
      return <Calendar className={className} />
    case "BarChart":
      return <BarChart className={className} />
    case "BarChart2":
      return <BarChart2 className={className} />
    case "Activity":
      return <Activity className={className} />
    case "Zap":
      return <Zap className={className} />
    case "Shield":
      return <Shield className={className} />
    default:
      return null
  }
}
