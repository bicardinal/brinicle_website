'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, CheckCircle2, XCircle, BarChart3 } from 'lucide-react'

export function BenchmarkSummary() {
  return (
    <div className="w-full py-16 flex-col flex">
      <div className="container">
        <div className="flex items-center justify-center pb-10 w-full flex-col">
          <h2 className="mb-4 font-bold text-2xl text-primary tracking-tight md:text-3xl lg:text-4xl">
            Benchmark Results
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-center">
            See how Brinicle compares to vector databases and ANN libraries in real-world scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {/* Memory Efficiency */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-xl font-semibold">Memory Efficiency</CardTitle>
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <CardDescription className="text-base">
                Optimized for resource-constrained environments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div>
                    <div className="text-2xl font-bold text-primary">256MB</div>
                    <div className="text-sm text-muted-foreground mt-1">Minimum RAM Required</div>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="text-lg font-semibold">224.95 MB</div>
                    <div className="text-xs text-muted-foreground">Search Peak</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="text-lg font-semibold">982.94 MB</div>
                    <div className="text-xs text-muted-foreground">1M Vectors</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t">
                Runs efficiently in tight containers and edge devices
              </p>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-xl font-semibold">Performance Metrics</CardTitle>
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardDescription className="text-base">
                Best-in-class latency and throughput
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Latency</span>
                  <span className="text-lg font-bold text-primary">0.927ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P95 Latency</span>
                  <span className="text-lg font-bold">1.705ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">P99 Latency</span>
                  <span className="text-lg font-bold">2.266ms</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Throughput</span>
                  <span className="text-lg font-bold text-green-600">1,086 QPS</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t">
                Fashion-MNIST (60K vectors), 512MB RAM, 2 CPU
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
          <p className="text-sm text-muted-foreground text-center">
            Compare with Qdrant, Weaviate, Milvus, Chroma, FAISS, and hnswlib
          </p>
        </div>
      </div>
    </div>
  )
}
