import { Award, Calendar, TrendingUp } from "lucide-react"

export function UserPerformance() {
  return (
    <div
      className="animate-fade-in bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-5"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white">Teljesítményed</h3>
        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Award className="h-4 w-4 text-blue-400" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center px-4 py-2 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm rounded-lg border border-blue-500/10">
          <p className="text-gray-400 text-xs mb-1">Rang</p>
          <p className="text-xl font-bold text-white">8.</p>
        </div>
        <div className="text-center px-4 py-2 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm rounded-lg border border-blue-500/10">
          <p className="text-gray-400 text-xs mb-1">Pontok</p>
          <p className="text-xl font-bold text-white">1,245</p>
        </div>
        <div className="text-center px-4 py-2 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm rounded-lg border border-blue-500/10">
          <p className="text-gray-400 text-xs mb-1">Győzelem</p>
          <p className="text-xl font-bold text-white">68%</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Legmagasabb pontosság</p>
            <p className="text-xs text-gray-400">Premier League mérkőzéseken</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-lg font-semibold text-emerald-400">94%</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Leghosszabb győzelmi sorozat</p>
            <p className="text-xs text-gray-400">Egymást követő sikeres tippek</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-lg font-semibold text-blue-400">12</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-white/5">
        <div className="text-sm text-gray-400 mb-2">Pontosság javulás (30 nap)</div>
        <div className="flex items-end gap-1 h-12">
          {[30, 45, 38, 65, 50, 55, 60, 75, 65, 80].map((height, index) => (
            <div
              key={index}
              className={`flex-1 rounded-t ${index === 3 || index === 7 || index === 8 || index === 9 ? "bg-emerald-500" : "bg-blue-500"}`}
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
