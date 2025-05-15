import { BarChart, Calendar, ChevronRight } from "lucide-react"
import { StatisticsOverview } from "@/components/statistics/statistics-overview"
import { StatisticsCharts } from "@/components/statistics/statistics-charts"
import { UserPerformance } from "@/components/statistics/user-performance"
import { StatisticsLeaderboard } from "@/components/statistics/statistics-leaderboard"

export function StatisticsContent() {
  return (
    <div className="pt-24 pb-20">
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2.5 mb-3 bg-gradient-to-r from-blue-500/10 to-transparent px-4 py-2 rounded-full">
              <BarChart className="w-5 h-5 text-blue-400" />
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Statisztikák
              </h1>
            </div>
            <p className="text-gray-400 max-w-lg">
              Részletes elemzések, teljesítmény mutatók és előrejelzési pontosság az elmúlt meccsek alapján.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">Elmúlt 30 nap</span>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <StatisticsOverview />
            <StatisticsCharts />
          </div>
          <div className="lg:col-span-4 space-y-8">
            <UserPerformance />
            <StatisticsLeaderboard />
          </div>
        </div>
      </section>
    </div>
  )
}
