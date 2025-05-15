import { Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const recentMatches = [
  {
    homeTeam: { name: "Liverpool", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png" },
    awayTeam: { name: "Chelsea", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png" },
    result: "3-1",
    prediction: { type: "Hazai", className: "bg-emerald-500/20 text-emerald-400" },
    actual: { type: "Hazai", className: "bg-emerald-500/10 text-emerald-400" },
    status: "correct",
  },
  {
    homeTeam: { name: "Vörös Ördögök", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png" },
    awayTeam: { name: "Manchester Kék", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png" },
    result: "1-1",
    prediction: { type: "Hazai", className: "bg-emerald-500/20 text-emerald-400" },
    actual: { type: "Döntetlen", className: "bg-amber-500/10 text-amber-400" },
    status: "incorrect",
  },
  {
    homeTeam: { name: "Tottenham", logo: "https://resources.premierleague.com/premierleague/badges/50/t6.png" },
    awayTeam: { name: "London Ágyúk", logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png" },
    result: "1-2",
    prediction: { type: "Vendég", className: "bg-blue-500/20 text-blue-400" },
    actual: { type: "Vendég", className: "bg-blue-500/10 text-blue-400" },
    status: "correct",
  },
  {
    homeTeam: { name: "Wolverhampton", logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png" },
    awayTeam: { name: "Everton", logo: "https://resources.premierleague.com/premierleague/badges/50/t11.png" },
    result: "2-0",
    prediction: { type: "Hazai", className: "bg-emerald-500/20 text-emerald-400" },
    actual: { type: "Hazai", className: "bg-emerald-500/10 text-emerald-400" },
    status: "correct",
  },
]

export function RecentMatchesCard() {
  return (
    <Card
      className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none animate-fade-in"
      style={{ animationDelay: "0.2s" }}
    >
      <CardContent className="p-0">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">Legutóbbi mérkőzések</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-400">
                <th className="text-left p-4">Mérkőzés</th>
                <th className="p-4">Eredmény</th>
                <th className="p-4">Tipp</th>
                <th className="p-4">Valós</th>
                <th className="p-4">Státusz</th>
              </tr>
            </thead>
            <tbody>
              {recentMatches.map((match, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <img
                          src={match.homeTeam.logo || "/placeholder.svg"}
                          alt={match.homeTeam.name}
                          className="w-6 h-6"
                        />
                        <span className="text-white">{match.homeTeam.name}</span>
                      </div>
                      <span className="text-gray-400">vs</span>
                      <div className="flex items-center space-x-2">
                        <img
                          src={match.awayTeam.logo || "/placeholder.svg"}
                          alt={match.awayTeam.name}
                          className="w-6 h-6"
                        />
                        <span className="text-white">{match.awayTeam.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-white font-semibold">{match.result}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${match.prediction.className}`}
                    >
                      {match.prediction.type}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${match.actual.className}`}
                    >
                      {match.actual.type}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {match.status === "correct" ? (
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20">
                        <Check className="w-4 h-4 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-center">
          <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
            Összes mérkőzés megtekintése
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
