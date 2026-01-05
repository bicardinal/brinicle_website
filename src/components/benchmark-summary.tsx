'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BarChart3 } from 'lucide-react'

export function BenchmarkSummary() {
  return (
    <div className="w-full py-16 flex-col flex">
      <div className="container">
        <div className="flex items-center justify-center pb-10 w-full flex-col">
          <h2 className="mb-4 font-bold text-2xl text-primary tracking-tight md:text-3xl lg:text-4xl">
            Benchmark Results
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-center">
            See how brinicle performs in real-world scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {/* In-Process Based */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-xl font-semibold">In-Process Based</CardTitle>
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardDescription className="text-base">
                brinicle performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Latency</span>
                  <span className="text-lg font-bold text-primary">0.103ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P50 Latency</span>
                  <span className="text-lg font-bold">0.101ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P95 Latency</span>
                  <span className="text-lg font-bold">0.138ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P99 Latency</span>
                  <span className="text-lg font-bold">0.171ms</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Throughput</span>
                  <span className="text-lg font-bold text-green-600">9,731 QPS</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t">
                SIFT (1M vectors, 128 dim)
              </p>
            </CardContent>
          </Card>

          {/* HTTP-Based */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-xl font-semibold">HTTP-Based</CardTitle>
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardDescription className="text-base">
                brinicle performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Latency</span>
                  <span className="text-lg font-bold text-primary">0.838ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P50 Latency</span>
                  <span className="text-lg font-bold">0.746ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P95 Latency</span>
                  <span className="text-lg font-bold">1.477ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P99 Latency</span>
                  <span className="text-lg font-bold">2.036ms</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Throughput</span>
                  <span className="text-lg font-bold text-green-600">1,204 QPS</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t">
                SIFT (1M vectors, 128 dim)
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="default" size="lg">
            <Link href="/benchmark" className="flex items-center gap-2">
              <span>View Complete Benchmark Results</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          {/* <p className="text-sm text-muted-foreground text-center">
            Compare with Qdrant, Weaviate, Milvus, Chroma, FAISS, and hnswlib
          </p> */}
        </div>
      </div>
    </div>
  )
}
