import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { CodeCase } from '@/components/code-case';
import { Introduce } from '@/components/introduce';
import { BenchmarkSummary } from '@/components/benchmark-summary';
import { AboutSummary } from '@/components/about-summary';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'
  
  return {
    title: 'brinicle - Production-Oriented ANN Vector Engine',
    description: 'brinicle Vector Engine: A production-oriented ANN index engine designed for strict resource budgets. Disk-first operation with low memory overhead. Perfect for datasets under 10M vectors, tight containers, edge machines, and low-cost instances. Get fast approximate nearest neighbor search without the overhead of a full vector database.',
    keywords: [
      'brinicle',
      'vector search',
      'ANN',
      'approximate nearest neighbor',
      'vector index',
      'disk-first',
      'low memory',
      'production vector engine',
      'similarity search',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      siteName: 'brinicle',
      title: 'brinicle - Production-Oriented ANN Vector Engine',
      description: 'A production-oriented ANN index engine designed for strict resource budgets. Disk-first operation with low memory overhead.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'brinicle - Production-Oriented ANN Vector Engine',
      description: 'A production-oriented ANN index engine designed for strict resource budgets. Disk-first operation with low memory overhead.',
    },
  };
}

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'brinicle',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    description: 'brinicle is a C++ vector index engine (ANN library) optimized for disk-first, low-RAM similarity search. A production-oriented ANN index engine designed for strict resource budgets with disk-first operation and low memory overhead.',
    url: siteUrl,
    author: {
      '@type': 'Organization',
      name: 'Bicardinal',
      url: 'https://bicardinal.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
    featureList: [
      'Disk-first operation',
      'Low memory overhead',
      'Fast approximate nearest neighbor search',
      'Support for insert, upsert, delete operations',
      'Production-ready for datasets under 10M vectors',
      'Python wrapper included',
    ],
    programmingLanguage: ['C++', 'Python'],
    license: 'https://github.com/bicardinal/brinicle',
    codeRepository: 'https://github.com/bicardinal/brinicle',
    keywords: 'vector search, ANN, approximate nearest neighbor, vector index, disk-first, low memory, similarity search, production vector engine',
    inLanguage: 'en',
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="container relative mx-auto size-full max-w-6xl divide-y px-0 [&>*:nth-child(n+3)]:sm:border-x">
        <main className="space-y-0">
          <Header/>
          <Hero/>
          <Introduce/>
          <CodeCase/>
          <BenchmarkSummary/>
          {/*<AboutSummary/>*/}
        </main>
        <Footer/>
      </div>
    </>
  );
}
