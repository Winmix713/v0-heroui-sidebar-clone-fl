import { TrendingUp } from "lucide-react"

export function SystemDescription() {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900/40 rounded-lg p-6 border border-white/5">
        <h3 className="text-white font-medium mb-3">A rendszer matematikai alapjai</h3>
        <div className="space-y-4 text-sm text-gray-300">
          <p>
            A V-Sports elemzési rendszer nem próbálja "feltörni" az RNG-t, hanem a múltbeli adatokból azonosít
            mintázatokat - legitim adatelemzés.
          </p>
          <p>
            <strong className="text-white">Zárt rendszer kihasználása:</strong> A V-Sports tökéletes elemzési alany,
            mert fix 16 csapat van, nincs külső változó (sérülések, időjárás), a bajnokságok ciklikusan ismétlődnek, és
            minden mérkőzés ugyanazon szabályok szerint zajlik.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-950/40 to-indigo-950/40 rounded-lg p-6 border border-blue-800/30">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          Rendszer Optimalizációs Szempontok
        </h3>

        <div className="space-y-4 text-sm text-gray-300">
          <div className="bg-black/20 p-4 rounded-lg border border-white/5">
            <h4 className="text-white font-medium mb-2">1. Determinisztikus alapú "véletlenszerűség"</h4>
            <p>A V-Sports RNG viselkedése valószínűleg nem teljesen véletlenszerű, hanem kvázi-determinisztikus.</p>
          </div>

          <div className="bg-black/20 p-4 rounded-lg border border-white/5">
            <h4 className="text-white font-medium mb-2">2. Hazai-Vendég kontextus kritikus szerepe</h4>
            <p>
              Minden mérkőzést <em>külön</em> kell kezelni a hazai-vendég irány alapján.
            </p>
          </div>

          <div className="bg-black/20 p-4 rounded-lg border border-white/5">
            <h4 className="text-white font-medium mb-2">3. Mintázat-specifikus előrejelzés</h4>
            <p>A rendszer mintázat-felismerést és anomália detektálást is használ.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
