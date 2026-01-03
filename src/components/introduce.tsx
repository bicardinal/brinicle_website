'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Introduce() {
  return (
    <div className={'w-full py-16    flex-col flex  '}>
      <div className={"container"}>
      <div className={'flex items-center justify-center pb-10 w-full flex-col'}>
        <h2 className={'mb-4 font-bold text-2xl text-primary tracking-tight md:text-3xl lg:text-4xl'}>
          What is Brinicle?
        </h2>
        <p className={'mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed'}>
          Disk-optimized vector search engine for high-performance similarity search
        </p>
      </div>
      <div className="flex flex-col text-center max-w-4xl mx-auto">
        <p className="text-base md:text-lg  leading-relaxed mb-4">
          Brinicle is a high-performance C++ vector index engine (ANN library) optimized for disk-first, low-RAM similarity search. 
          It provides fast build + query operations, supports inserts/upserts/deletes, and targets predictable latency at high recall 
          with minimal memory overhead on constrained environments.
        </p>
        <p className="text-base md:text-lg  leading-relaxed mb-8">
          Designed for production workloads, Brinicle excels in scenarios where memory is limited but disk storage is abundant. 
          Whether you're building recommendation systems, semantic search applications, or similarity matching at scale, 
          Brinicle offers the perfect balance between performance, resource efficiency, and operational simplicity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="default" size="lg">
            <Link href="/about" className="flex items-center gap-2">
              <span>Learn More About Bicardinal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/benchmark" className="flex items-center gap-2">
              <span>View Benchmark Results</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      </div>
    </div>
  )
}
