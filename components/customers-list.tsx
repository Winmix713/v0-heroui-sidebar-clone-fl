import { ChevronRight } from "lucide-react"

const customers = [
  { id: 1, name: "Gladyce", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "Elbert", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 3, name: "Joyce", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 4, name: "John", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 5, name: "Elbert", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 6, name: "Joyce", avatar: "/placeholder.svg?height=80&width=80" },
  { id: 7, name: "Anna", avatar: "/placeholder.svg?height=80&width=80" },
]

export function CustomersList() {
  return (
    <div className="relative">
      <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2">
        {customers.map((customer) => (
          <div key={customer.id} className="flex flex-col items-center space-y-2 min-w-[80px]">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-800">
              <img
                src={customer.avatar || "/placeholder.svg"}
                alt={customer.name}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm text-gray-400">{customer.name}</span>
          </div>
        ))}

        <div className="flex flex-col items-center justify-center min-w-[80px]">
          <button className="h-16 w-16 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <ChevronRight size={24} />
          </button>
          <span className="text-sm text-gray-400 mt-2">View all</span>
        </div>
      </div>
    </div>
  )
}
