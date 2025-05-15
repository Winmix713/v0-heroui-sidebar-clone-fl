import { RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const predictions = [
  {
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    prediction: { type: "Hazai győzelem", className: "bg-emerald-500/20 text-emerald-400" },
    reliability: { value: "76%", className: "text-emerald-400" },
    expectedGoalsHome: "2.1",
    expectedGoalsAway: "0.8",
    previousMatches: "42",
  },
  {
    homeTeam: "Vörös Ördögök",
    awayTeam: "Manchester Kék",
    prediction: { type: "Döntetlen", className: "bg-amber-500/20 text-amber-400" },
    reliability: { value: "68%", className: "text-amber-400" },
    expectedGoalsHome: "1.2",
    expectedGoalsAway: "1.3",
    previousMatches: "38",
  },
  {
    homeTeam: "Tottenham",
    awayTeam: "London Ágyúk",
    prediction: { type: "Vendég győzelem", className: "bg-blue-500/20 text-blue-400" },
    reliability: { value: "64%", className: "text-amber-400" },
    expectedGoalsHome: "1.0",
    expectedGoalsAway: "1.8",
    previousMatches: "29",
  },
  {
    homeTeam: "Wolverhampton",
    awayTeam: "Everton",
    prediction: { type: "Hazai győzelem", className: "bg-emerald-500/20 text-emerald-400" },
    reliability: { value: "72%", className: "text-amber-400" },
    expectedGoalsHome: "1.7",
    expectedGoalsAway: "0.6",
    previousMatches: "24",
  },
]

export function PredictionTable() {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Aktuális forduló predikciói</h3>

        <Button className="flex items-center gap-2 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
          <RefreshCcw className="h-3.5 w-3.5" />
          Frissítés
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Hazai csapat</TableHead>
              <TableHead className="text-gray-400 font-normal">Vendég csapat</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Predikció</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Megbízhatóság</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Várható gólok (H)</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Várható gólok (V)</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Korábbi meccsek</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {predictions.map((prediction, index) => (
              <TableRow key={index} className="border-b border-white/5 hover:bg-white/5">
                <TableCell className="text-white font-medium">{prediction.homeTeam}</TableCell>
                <TableCell className="text-white">{prediction.awayTeam}</TableCell>
                <TableCell className="text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${prediction.prediction.className}`}>
                    {prediction.prediction.type}
                  </span>
                </TableCell>
                <TableCell className={`text-center font-bold ${prediction.reliability.className}`}>
                  {prediction.reliability.value}
                </TableCell>
                <TableCell className="text-center text-emerald-400 font-medium">
                  {prediction.expectedGoalsHome}
                </TableCell>
                <TableCell className="text-center text-blue-400 font-medium">{prediction.expectedGoalsAway}</TableCell>
                <TableCell className="text-center text-gray-300">{prediction.previousMatches}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
