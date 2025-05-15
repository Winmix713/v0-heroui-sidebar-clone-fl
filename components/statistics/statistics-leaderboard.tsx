import { Trophy } from "lucide-react"

interface LeaderboardUser {
  id: number
  rank: number
  name: string
  points: number
  successRate: number
  isTop3: boolean
}

export function StatisticsLeaderboard() {
  const leaderboardUsers: LeaderboardUser[] = [
    { id: 1, rank: 1, name: "FutballGuru", points: 2485, successRate: 94, isTop3: true },
    { id: 2, rank: 2, name: "SportMester", points: 2320, successRate: 91, isTop3: true },
    { id: 3, rank: 3, name: "TipperKing", points: 2150, successRate: 89, isTop3: true },
    { id: 4, rank: 4, name: "PredictorPro", points: 1980, successRate: 87, isTop3: false },
    { id: 5, rank: 5, name: "BettingExpert", points: 1875, successRate: 85, isTop3: false },
  ]

  return (
    <div
      className="animate-fade-in bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-5"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          Legjobb tippelők
        </h3>
      </div>

      <div className="space-y-4">
        {leaderboardUsers.map((user) => (
          <LeaderboardItem key={user.id} user={user} />
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-center text-blue-400 hover:text-blue-300 transition-colors">
        Teljes ranglista megtekintése
      </button>
    </div>
  )
}

interface LeaderboardItemProps {
  user: LeaderboardUser
}

function LeaderboardItem({ user }: LeaderboardItemProps) {
  const getBgClass = () => {
    if (user.rank === 1) return "bg-gradient-to-r from-amber-500/20 to-amber-500/5 border-amber-500/20"
    if (user.rank === 2) return "bg-gradient-to-r from-gray-500/20 to-gray-500/5 border-gray-500/20"
    if (user.rank === 3) return "bg-gradient-to-r from-amber-700/20 to-amber-700/5 border-amber-700/20"
    return "bg-gradient-to-r from-white/5 to-white/0 border-white/5"
  }

  const getRankColor = () => {
    if (user.rank === 1) return "text-amber-400"
    if (user.rank === 2) return "text-gray-300"
    if (user.rank === 3) return "text-amber-700"
    return "text-white"
  }

  return (
    <div className={`flex items-center gap-3 p-2.5 rounded-lg ${getBgClass()}`}>
      <div className="h-7 w-7 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
        <span className={`text-xs font-semibold ${getRankColor()}`}>{user.rank}</span>
      </div>

      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-0.5">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-white">{user.name}</p>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400">Pontszám</p>
        <p className="text-sm font-semibold text-white">{user.points}</p>
      </div>

      <div className="text-right min-w-[40px]">
        <p className="text-xs text-gray-400">Siker</p>
        <p className="text-sm font-semibold text-emerald-400">{user.successRate}%</p>
      </div>
    </div>
  )
}
