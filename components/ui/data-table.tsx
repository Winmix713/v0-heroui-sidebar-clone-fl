import type { ReactNode } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Column<T> {
  header: string
  accessorKey: keyof T | ((row: T) => ReactNode)
  cell?: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField: keyof T
  emptyState?: ReactNode
  className?: string
}

export function DataTable<T>({ columns, data, keyField, emptyState, className }: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <Table>
        <TableHeader className="bg-black/40">
          <TableRow className="border-b border-white/5 hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead key={index} className={`text-gray-400 font-normal ${column.className || ""}`}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && emptyState ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8 text-gray-400">
                {emptyState}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={String(row[keyField])} className="border-b border-white/5 hover:bg-white/5">
                {columns.map((column, index) => (
                  <TableCell key={index} className={column.className || ""}>
                    {column.cell
                      ? column.cell(row)
                      : typeof column.accessorKey === "function"
                        ? column.accessorKey(row)
                        : String(row[column.accessorKey] || "-")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
