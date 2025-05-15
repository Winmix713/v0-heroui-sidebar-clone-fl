import { Database, LineChart, PieChart, BarChart4 } from "lucide-react"

export function SystemProperties() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-5 w-5 text-blue-400" />
          <h3 className="font-medium text-white">Zárt rendszer</h3>
        </div>
        <p className="text-sm text-gray-400">Fix 16 csapat, külső változók nélkül, ciklikusan ismétlődő bajnokságok</p>
      </div>

      <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <LineChart className="h-5 w-5 text-blue-400" />
          <h3 className="font-medium text-white">Nagy mennyiségű adat</h3>
        </div>
        <p className="text-sm text-gray-400">240 mérkőzés/bajnokság, több bajnokság adatainak elemzése</p>
      </div>

      <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <PieChart className="h-5 w-5 text-blue-400" />
          <h3 className="font-medium text-white">Többféle predikciós modell</h3>
        </div>
        <p className="text-sm text-gray-400">Random Forest, Poisson és Elo modellek kombinált használata</p>
      </div>

      <div className="bg-gray-900/60 rounded-lg p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <BarChart4 className="h-5 w-5 text-blue-400" />
          <h3 className="font-medium text-white">Pontosság</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">Jelenlegi rendszer pontossága:</p>
          <span className="text-lg font-bold text-emerald-400">78%</span>
        </div>
      </div>
    </div>
  )
}
