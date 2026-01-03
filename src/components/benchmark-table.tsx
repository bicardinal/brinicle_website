'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface BenchmarkTableProps {
  title?: string
  note?: string
  headers: string[]
  data: Array<Record<string, string | number>>
}

export function BenchmarkTable({ title, note, headers, data }: BenchmarkTableProps) {
  return (
    <div className="w-full space-y-4">
      {title && (
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <Table >
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className=" font-bold">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {headers.map((header,i) => (
                  <TableCell key={header} className={i==0 ? "font-bold" : ""}>
                    {row[header] ?? '-'}
                  </TableCell>
                ))}
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {note && (
        <p className="text-sm text-muted-foreground italic">{note}</p>
      )}
    </div>
  )
}
