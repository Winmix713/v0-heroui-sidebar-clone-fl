import { BarChart, Check, Trophy, Zap } from "lucide-react"

export function StatisticsOverview() {
  return (
    <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          Áttekintés
        </h2>
        <div className="mt-2 sm:mt-0 inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300">
          <BarChart className="h-3.5 w-3.5" />
          <span>120 Pont</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Check className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white">24</h3>
          </div>
          <p className="text-gray-400 text-sm">Total Predictions</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Check className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white">14</h3>
          </div>
          <p className="text-gray-400 text-sm">Correct Predictions</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <BarChart className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white">58%</h3>
          </div>
          <p className="text-gray-400 text-sm">Win Rate</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/30 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Zap className="h-5 w-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white">3</h3>
          </div>
          <p className="text-gray-400 text-sm">Current Streak</p>
        </div>
      </div>
    </div>
  )
}
