'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Database, Cpu, Target } from 'lucide-react'

export function AboutSummary() {
  return (
    <div className="w-full py-16 flex-col flex">
      <div className="container">
        <div className="flex items-center justify-center pb-10 w-full flex-col">
          <h2 className="mb-4 font-bold text-2xl text-primary tracking-tight md:text-3xl lg:text-4xl">
            About Bicardinal
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-center">
            Building production-oriented vector search solutions for resource-constrained environments
          </p>
        </div>

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

        <div className="flex justify-center">
          <Button asChild variant="default" size="lg">
            <Link href="/about" className="flex items-center gap-2">
              <span>Learn More About Bicardinal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
