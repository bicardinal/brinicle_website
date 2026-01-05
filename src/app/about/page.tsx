import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import GithubIcon from '@/components/icons/github-icon'
import { ExternalLink } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'About brinicle ',
  description: 'brinicle is a C++ vector index engine (ANN library) optimized for disk-first, low-RAM similarity search.',
  keywords: [
    'bicardinal',
    'brinicle',
    'vector index engine',
    'ANN library',
    'disk-first',
    'low memory',
    'production vector search',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'}/about`,
    siteName: 'brinicle',
    title: 'About Bicardinal - brinicle',
    description: 'Learn about Bicardinal and brinicle - a production-oriented ANN index engine designed for strict resource budgets.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Bicardinal - brinicle',
    description: 'Learn about Bicardinal and brinicle - a production-oriented ANN index engine designed for strict resource budgets.',
  },
}

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About brinicle',
    description: 'Learn about brinicle - a production-oriented ANN index engine designed for strict resource budgets. Disk-first operation with low memory overhead for datasets under 10M vectors.',
    url: `${siteUrl}/about`,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'brinicle',
      description: 'brinicle is a C++ vector index engine (ANN library) optimized for disk-first, low-RAM similarity search. It provides fast build + query operations, supports inserts/upserts/deletes, and targets predictable latency at high recall with minimal memory overhead on constrained environments.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      author: {
        '@type': 'Organization',
        name: 'Bicardinal',
        url: 'https://bicardinal.com',
      },
      codeRepository: 'https://github.com/bicardinal/brinicle',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: `${siteUrl}/about`,
        },
      ],
    },
    inLanguage: 'en',
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container relative mx-auto size-full max-w-6xl divide-y px-0 [&>*:nth-child(n+3)]:sm:border-x">
        <main>
          <Header />
        <div className="w-full py-16 flex-col flex">
          <div className="container space-y-12 max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="flex items-center justify-center pb-10 w-full flex-col">
              <h1 className="mb-4 font-bold text-3xl text-primary tracking-tight md:text-4xl lg:text-5xl">
                About Bicardinal
              </h1>
              <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-center">
                Building production-oriented vector search solutions
              </p>
            </div>

            {/* Introduction */}
            <section className="space-y-6">
              <div className="space-y-4 text-base md:text-lg leading-relaxed">
                <p>
                  Nowadays, vector search is becoming a common component in many products: site search, 
                  recommendations, semantic autocomplete, support tooling, and AI agents that retrieve 
                  the right chunks before calling an LLM. The implementation choices change a lot as the 
                  data size grows. With a few thousand vectors, an exact k-NN scan can be perfectly fine. 
                  Once you move into larger collections, approximate nearest neighbor (ANN) indexing 
                  becomes the practical approach. You build an index, persist it, and query it efficiently.
                </p>
                <p>
                  At that point, many teams reach for a full-featured vector database because it bundles 
                  ANN with a service layer. That bundle is valuable when you need it. It also comes with 
                  a baseline overhead: extra moving parts, background processes, configuration surface area, 
                  and memory overhead that is often "always on" even for small-to-mid sized datasets. If you 
                  are deploying in tight containers, edge machines, or low-cost instances, the baseline matters 
                  as much as raw search speed.
                </p>
                <p>
                  So the first question is "what do I actually need to run in production" instead of 
                  "which system is fastest". If you need pre-filtering, rich metadata, payload indexing, 
                  authentication, replication, multi-tenancy, and operational tooling, and you are operating 
                  at tens of millions of vectors, then a full vector database is usually the right choice.
                </p>
                <p>
                  A lot of real systems sit in a different zone. They need fast ANN search on a dataset no 
                  more than 10M vectors, plus the core lifecycle operations: insert, upsert, delete, and 
                  periodic rebuild/compaction. They already have a metadata store, so duplicating that layer 
                  inside a vector DB is redundant. In that setup, a full DB can feel like paying in RAM and 
                  operational complexity for features that aren't used.
                </p>
                <p>
                  Building an index engine from scratch is also a rarely worth it for most teams. It's 
                  time-consuming, and it pulls attention away from the core product. The usual alternative 
                  is in-process libraries such as FAISS and hnswlib. They are quite fast, with great accuracy, 
                  yet they often push you toward a RAM-first model where large portions of the index and vectors 
                  live in memory. In some cases, they consume more RAM than a full vector database. Production 
                  details like persistence workflow, safe mutation, concurrency, predictable memory growth should 
                  also be written on top of them.
                </p>
              </div>
            </section>

            {/* brinicle Introduction */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                brinicle: Disk-First ANN Indexing for Low-RAM Vector Search
              </h2>
              <div className="space-y-4 text-base md:text-lg leading-relaxed">
                <p>
                  <strong>brinicle Vector Engine</strong> targets this gap: a production-oriented ANN index 
                  engine designed to stay usable under strict resource budgets. It focuses on disk-first 
                  operation and low memory overhead, while still supporting the operations you typically need 
                  in a real service: build/load, search, insert/upsert/delete, and rebuild.
                </p>
                <p>
                  brinicle is an open source C++ vector index engine for approximate nearest neighbor search. 
                  It is built for disk-first operation and low-RAM environments. The goal is simple: keep RAM 
                  usage predictable, keep tail latency stable, and still hit high recall.
                </p>
                <p>
                  If your dataset is in the sub-10M range and your main constraint is resources (RAM caps, 
                  small instances, dense multi-tenant packing), or you're deploying an agent on a 512MB container 
                  and only need ANN + CRUD, brinicle is meant to give you the index layer you need without 
                  forcing you to adopt a full vector database.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">brinicle supports:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                  <li>Building and loading indexes</li>
                  <li>Parallel insert, upsert, delete, and rebuild</li>
                  <li>Safe search</li>
                </ul>
                <p className="text-base">
                  It also ships with a Python wrapper (pybind), so you can use it directly from Python.
                </p>
              </div>
            </section>

            {/* What brinicle Is and Is Not */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                What brinicle is, and what it is not
              </h2>
              <div className="space-y-4 text-base md:text-lg leading-relaxed">
                <p>
                  <strong>brinicle is an index engine.</strong> You embed it in a service or pair it with 
                  your own metadata store.
                </p>
                <p>
                  <strong>brinicle is not a vector database.</strong> It does not aim to provide database 
                  features like filtering, payload indexing, distributed replication, auth, or multi-tenancy. 
                  If you need those features, use a vector database.
                </p>
                <p>
                  This separation is intentional. The benchmarks show why: a full DB stack often has a baseline 
                  memory footprint that is not compatible with extreme RAM caps, even before you start tuning.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4 p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-semibold text-foreground">
                    When brinicle is a fit
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                    <li>You're under 10M vectors and already have a metadata store</li>
                    <li>You must run in tight RAM (≤1–2GB) or pack many tenants per node</li>
                    <li>You want ANN + CRUD + rebuild/compaction, not DB features</li>
                  </ul>
                </div>

                <div className="space-y-4 p-6 rounded-lg border bg-card">
                  <h3 className="text-lg font-semibold text-foreground">
                    When a vector DB is the right tool
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                    <li>You need filtering/payload indexing as part of retrieval</li>
                    <li>You need replication, auth, multi-tenancy, operational UI/tooling</li>
                    <li>You're operating at large scale (tens/hundreds of millions) and want a managed service</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <p className="text-base">
                  <strong>What you trade:</strong> Lower baseline RAM / simpler stack{' '}
                  <strong>in exchange for</strong> bringing your own metadata + service layer.
                </p>
              </div>
            </section>

            {/* Project Links */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Project Links</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="default" size="lg">
                  <Link
                    href="https://github.com/bicardinal/brinicle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <GithubIcon />
                    <span>brinicle on GitHub</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link
                    href="https://github.com/bicardinal/db_bench"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <GithubIcon />
                    <span>Benchmark Harness</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
      </>
  )
}
