import { Search } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { CustomersList } from "@/components/customers-list"
import { MetricCard } from "@/components/metric-card"

export function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#18181b] text-gray-300">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search anything"
              className="rounded-full bg-gray-900 pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-white">Overview</h2>
            <div className="relative">
              <select className="appearance-none bg-transparent text-gray-400 pr-8 py-1 focus:outline-none cursor-pointer">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4 fill-current text-gray-400" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard
              title="Customers"
              value="1,293"
              change={-36.8}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />
            <MetricCard
              title="Balance"
              value="256k"
              change={36.8}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              }
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-medium text-white mb-2">857 new customers today!</h3>
          <p className="text-gray-400 mb-6">Send a welcome message to all new customers.</p>

          <CustomersList />
        </div>
      </main>
    </div>
  )
}
