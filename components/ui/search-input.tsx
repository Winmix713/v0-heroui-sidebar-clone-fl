"use client"

import { Search } from "lucide-react"
import type { ChangeEvent } from "react"

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export function SearchInput({ placeholder = "Search...", value, onChange, className = "" }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-black/30 text-white border border-white/10 rounded-lg pl-10 pr-4 py-2.5
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200 placeholder:text-gray-500"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
