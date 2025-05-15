"use client"

import { Search, X } from "lucide-react"
import { useState, type ChangeEvent } from "react"

interface ModernSearchProps {
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
  className?: string
}

export function ModernSearch({
  placeholder = "Search...",
  value,
  onChange,
  onClear,
  className = "",
}: ModernSearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = () => {
    if (onClear) {
      onClear()
    }
  }

  return (
    <div
      className={`relative w-70 ml-6 mr-auto max-lg:w-full max-lg:order-4 max-lg:mt-3 max-lg:mx-4 max-md:mx-3 ${className}`}
    >
      <button className="group absolute top-3 left-3 text-0">
        <Search className="inline-flex size-6 fill-t-secondary transition-colors group-hover:fill-t-primary text-gray-400 group-hover:text-white" />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full h-12 pl-10.5 border rounded-3xl text-body-2 text-white placeholder:text-gray-400 outline-none pr-10 
          bg-black/30 border-transparent transition-all 
          ${isFocused ? "bg-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.2)] border-white/20" : ""}`}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button
        className={`group absolute top-3 right-3 text-0 transition-all ${value ? "visible opacity-100" : "invisible opacity-0"}`}
        onClick={handleClear}
      >
        <X className="inline-flex size-6 text-gray-400 transition-colors group-hover:text-white" />
      </button>
    </div>
  )
}
