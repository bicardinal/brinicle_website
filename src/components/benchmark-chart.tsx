'use client'

import * as React from 'react'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

interface ChartDataPoint {
  recall: number
  p95?: number
  p99?: number
  [key: string]: number | undefined
}

interface BenchmarkChartProps {
  title: string
  description?: string
  data: ChartDataPoint[]
  xKey?: string
  yKeys?: Array<{ key: string; label: string; color?: string }>
}

export function BenchmarkChart({
  title,
  description,
  data,
  xKey = 'recall',
  yKeys = [
    { key: 'p95', label: 'P95 Latency (ms)' },
    { key: 'p99', label: 'P99 Latency (ms)' },
  ],
}: BenchmarkChartProps) {
  const chartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color?: string }> = {}
    yKeys.forEach(({ key, label, color }) => {
      config[key] = { label, color }
    })
    return config
  }, [yKeys])

  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey={xKey}
            type="number"
            scale="linear"
            domain={['auto', 'auto']}
            className="text-xs"
            tickFormatter={(value) => value.toFixed(3)}
          />
          <YAxis
            className="text-xs"
            label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          {yKeys.map(({ key, label, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color || `hsl(var(--chart-${key}))`}
              strokeWidth={2}
              name={label}
              dot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  )
}
