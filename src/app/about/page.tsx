import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import GithubIcon from '@/components/icons/github-icon'
import { ExternalLink } from 'lucide-react'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'About brinicle',
  description: 'brinicle is a disk-first retrieval engine for building fast search without running a heavy search database.',
  keywords: [
    'bicardinal',
    'brinicle',
    'retrieval engine',
    'vector search',
    'item search',
    'lexical search',
    'semantic search',
    'hybrid search',
    'autocomplete',
    'disk-first',
    'low memory',
    'production search',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'}/about`,
    siteName: 'brinicle',
    title: 'About brinicle',
    description: 'brinicle is a disk-first retrieval engine for building fast search without running a heavy search database.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About brinicle',
    description: 'brinicle is a disk-first retrieval engine for building fast search without running a heavy search database.',
  },
}

export default function AboutPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About brinicle',
    description: 'brinicle is a disk-first retrieval engine for building fast search without running a heavy search database.',
    url: `${siteUrl}/about`,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'brinicle',
      description: 'brinicle is a disk-first retrieval engine for building fast search without running a heavy search database. A C++ core with a simple Python API, disk-first indexing, predictable memory usage, streaming-first ingest, and support for real update workflows like insert, upsert, delete, rebuild, and optimization.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      author: {
        '@type': 'Organization',
        name: 'Bicardinal',
        url: 'https://brinicle.bicardinal.com',
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
                  About brinicle
                </h1>
              </div>

              {/* Content */}
              <section className="space-y-6">
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    brinicle is a disk-first retrieval engine for building fast search without running a heavy search database.
                  </p>
                  <p>
                    It started as a low-RAM vector index engine, but it has grown into a broader retrieval layer for modern applications: vector search, structured item search, lexical search, semantic search, hybrid search, autocomplete, and query suggestions.
                  </p>
                  <p>
                    The idea behind brinicle is simple: many products need powerful retrieval, but they do not always need a full database platform around it.
                  </p>
                  <p>
                    A lot of teams already have their own metadata store, API layer, permissions, business logic, and deployment model. For them, adding a full vector or search database can mean extra memory usage, extra operations, and extra complexity for features they may not actually use.
                  </p>
                  <p>
                    brinicle takes a different path.
                  </p>
                  <p>
                    It gives you the search engine layer directly: a C++ core with a simple Python API, disk-first indexing, predictable memory usage, streaming-first ingest, and support for real update workflows like insert, upsert, delete, rebuild, and optimization.
                  </p>
                  <p>
                    Use <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">VectorEngine</code> when you already have embeddings.
                  </p>
                  <p>
                    Use <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">ItemSearchEngine</code> when you want lexical, semantic, or hybrid search over catalog-like records.
                  </p>
                  <p>
                    Use <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">AutocompleteEngine</code> when you need low-RAM query or title suggestions.
                  </p>
                  <p>
                    brinicle is not trying to be a full vector database. It does not try to own your metadata, authentication, replication, dashboards, or entire service layer.
                  </p>
                  <p>
                    That boundary is intentional.
                  </p>
                  <p>
                    brinicle is for builders who want retrieval to be local, controllable, resource-efficient, and easy to embed inside their own systems.
                  </p>
                  <p>
                    If you need a complete managed database platform, use one.
                  </p>
                  <p>
                    If you need a fast retrieval engine that stays close to your product and respects your RAM budget, brinicle is built for that.
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
