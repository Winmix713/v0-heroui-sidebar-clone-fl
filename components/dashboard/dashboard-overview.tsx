import { Trophy, BarChart, Activity, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardOverview() {
  return (
    <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none animate-fade-in">
      <CardContent className="p-0">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">Áttekintés</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 p-5">
          <div className="bg-amber-500/10 border-amber-500/20 backdrop-blur-sm rounded-lg p-4 border hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400">Pontozás</p>
                <p className="text-xl font-bold text-amber-400 mt-1">846</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-amber-400" />
              </div>
            </div>
            <div className="mt-3">
              <div className="inline-flex text-xs text-amber-400 font-medium bg-white/5 rounded-full px-2 py-0.5">
                +12%
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border-emerald-500/20 backdrop-blur-sm rounded-lg p-4 border hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400">Pontosság</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">74%</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <BarChart className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <div className="mt-3">
              <div className="inline-flex text-xs text-emerald-400 font-medium bg-white/5 rounded-full px-2 py-0.5">
                +3%
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border-blue-500/20 backdrop-blur-sm rounded-lg p-4 border hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400">Aktivitás</p>
                <p className="text-xl font-bold text-blue-400 mt-1">32</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div className="mt-3">
              <div className="inline-flex text-xs text-blue-400 font-medium bg-white/5 rounded-full px-2 py-0.5">
                +18%
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border-purple-500/20 backdrop-blur-sm rounded-lg p-4 border hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-400">Sorozat</p>
                <p className="text-xl font-bold text-purple-400 mt-1">4</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-400" />
              </div>
            </div>
            <div className="mt-3">
              <div className="inline-flex text-xs text-purple-400 font-medium bg-white/5 rounded-full px-2 py-0.5">
                +2
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
