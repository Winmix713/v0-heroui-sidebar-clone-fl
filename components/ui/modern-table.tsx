"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface ModernTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  selectable?: boolean
  onRowClick?: (item: T) => void
  className?: string
}

interface TableColumn<T> {
  key: string
  title: React.ReactNode
  render?: (item: T) => React.ReactNode
  width?: string
  className?: string
}

export function ModernTable<T extends { id: string }>({
  columns,
  data,
  selectable = false,
  onRowClick,
  className,
}: ModernTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(data.map((item) => item.id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
      setSelectAll(false)
    } else {
      setSelectedItems([...selectedItems, id])
      if (selectedItems.length + 1 === data.length) {
        setSelectAll(true)
      }
    }
  }

  return (
    <table
      className={cn(
        "w-full text-sm [&_th]:h-17 [&_th,&_td]:pl-5 [&_th,&_td]:py-4 [&_th,&_td]:first:pl-4 [&_th,&_td]:last:pr-4",
        "[&_th]:align-middle [&_th]:text-left [&_th]:text-xs [&_th]:text-gray-400/80 [&_th]:font-normal",
        "max-lg:[&_th,&_td]:first:pl-3 max-md:[&_th,&_td]:p-3 max-md:[&_th]:h-13 max-md:[&_th]:border-b max-md:[&_th]:border-white/5",
        className,
      )}
    >
      <thead className="max-md:hidden">
        <tr>
          {selectable && (
            <th className="w-10 max-lg:w-9">
              <div
                role="checkbox"
                aria-checked={selectAll}
                tabIndex={0}
                onClick={handleSelectAll}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleSelectAll()
                  }
                }}
                className="relative shrink-0 size-6 rounded-[6px] border-2 border-white/20 transition-colors 
                  cursor-pointer hover:border-primary-01/30 group flex items-center justify-center"
              >
                {selectAll && <Check className="h-4 w-4 text-primary-01" />}
              </div>
            </th>
          )}
          {columns.map((column) => (
            <th key={column.key} className={column.className} style={{ width: column.width }}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="group relative [&_td:not(:first-child)]:relative [&_td]:z-2 [&_td]:border-t 
              [&_td]:border-white/5 max-md:first:[&_td]:border-t-0 [&_td]:transition-colors 
              hover:[&_td]:border-transparent hover:[&_+tr]:[&_td]:border-transparent 
              max-md:flex max-md:flex-col"
            onClick={() => onRowClick && onRowClick(item)}
          >
            {selectable && (
              <td className="w-10 max-lg:w-9 max-md:hidden">
                <div className="box-hover absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/5 z-1" />
                <div
                  role="checkbox"
                  aria-checked={selectedItems.includes(item.id)}
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectItem(item.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSelectItem(item.id)
                    }
                  }}
                  className="relative shrink-0 size-6 rounded-[6px] border-2 border-white/20 transition-colors 
                    cursor-pointer hover:border-primary-01/30 group flex items-center justify-center"
                >
                  {selectedItems.includes(item.id) && <Check className="h-4 w-4 text-primary-01" />}
                </div>
              </td>
            )}
            {columns.map((column) => (
              <td key={column.key} className={column.className}>
                {column.render ? column.render(item) : (item as any)[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
