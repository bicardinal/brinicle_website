'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Cpu, Database, Target } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Introduce() {
  return (
    <div className={'w-full py-16    flex-col flex  '}>
      <div className={"container"}>
      <div className={'flex items-center justify-center pb-10 w-full flex-col'}>
        <h2 className={'mb-4 font-bold text-2xl text-primary tracking-tight md:text-3xl lg:text-4xl'}>
          What is brinicle?
        </h2>
        <p className={'mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed'}>
          Disk-optimized vector search engine for high-performance similarity search
        </p>
      </div>
      <div className="flex flex-col text-center max-w-4xl mx-auto">
        <p className="text-base md:text-lg  leading-relaxed mb-4">
          brinicle is a high-performance C++ vector index engine (ANN library) optimized for disk-first, low-RAM similarity search. 
          It provides fast build + query operations, supports inserts/upserts/deletes, and targets predictable latency at high recall 
          with minimal memory overhead on constrained environments.
        </p>
        <p className="text-base md:text-lg  leading-relaxed mb-8">
          Designed for production workloads, brinicle excels in scenarios where memory is limited but disk storage is abundant. 
          Whether you're building recommendation systems, semantic search applications, or similarity matching at scale, 
          brinicle offers the perfect balance between performance, resource efficiency, and operational simplicity.
        </p>

        <div className={"w-full"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Database className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Index Engine</CardTitle>
                </div>
                <CardDescription>
                  brinicle is an index engine, not a full vector database. You embed it in your service or pair it with your own metadata store.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Disk-First Design</CardTitle>
                </div>
                <CardDescription>
                  Optimized for disk-first operation with low memory overhead. Perfect for tight containers, edge machines, and low-cost instances.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Production Ready</CardTitle>
                </div>
                <CardDescription>
                  Designed for datasets under 10M vectors with core lifecycle operations: build/load, search, insert/upsert/delete, and rebuild.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="default" size="lg">
            <Link href="/about" className="flex items-center gap-2">
              <span>Learn more about brinicle</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/benchmark" className="flex items-center gap-2">
              <span>View benchmark results</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      </div>
    </div>
  )
}
