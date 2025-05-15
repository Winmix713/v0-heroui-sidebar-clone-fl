import { Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MatchFilters() {
  return (
    <div className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-medium text-white">Mérkőzés szűrők</h3>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <button className="flex h-10 items-center justify-between rounded-md border px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white/5 border-white/10 text-white w-full sm:w-[180px]">
              <span>Összes mérkőzés</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 opacity-50"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
          <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            <Calendar className="h-3.5 w-3.5 text-blue-400 mr-2" />
            <span>Dátum</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
