import { Trophy, Users, CheckCircle, TrendingUp, TrendingDown } from "lucide-react"

interface LeagueStatsProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: "Trophy" | "Users" | "CheckCircle"
}

export function LeagueStats({ title, value, change, isPositive, icon }: LeagueStatsProps) {
  const getIcon = () => {
    switch (icon) {
      case "Trophy":
        return <Trophy className="h-5 w-5 text-amber-400" />
      case "Users":
        return <Users className="h-5 w-5 text-blue-400" />
      case "CheckCircle":
        return <CheckCircle className="h-5 w-5 text-emerald-400" />
      default:
        return <Trophy className="h-5 w-5 text-amber-400" />
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-lg p-6 shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center">{getIcon()}</div>
      </div>
      <div className="mt-4 flex items-center">
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-emerald-400 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-gray-400 mr-1" />
        )}
        <span className={`text-sm ${isPositive ? "text-emerald-400" : "text-gray-400"}`}>
          {change} from last season
        </span>
      </div>
    </div>
  )
}
