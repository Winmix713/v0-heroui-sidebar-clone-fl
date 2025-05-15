import { Brain } from "lucide-react"
import { SystemProperties } from "@/components/prediction-system/system-properties"
import { ModelSelector } from "@/components/prediction-system/model-selector"
import { PredictionTable } from "@/components/prediction-system/prediction-table"
import { SystemDescription } from "@/components/prediction-system/system-description"

export function PredictionSystem() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Brain className="h-8 w-8 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">V-Sports Elemzési Rendszer</h2>
          <p className="text-gray-400 text-sm">
            Matematikai modellek alapján készített predikciók, zárt rendszerű virtuális sportok elemzéséhez.
          </p>
        </div>
      </div>

      <SystemProperties />
      <ModelSelector />
      <PredictionTable />
      <SystemDescription />
    </div>
  )
}
