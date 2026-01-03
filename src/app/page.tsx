import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { CodeCase } from '@/components/code-case';
import { Introduce } from '@/components/introduce';
import { BenchmarkSummary } from '@/components/benchmark-summary';
import { AboutSummary } from '@/components/about-summary';
import { Footer } from '@/components/footer';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bicardinal.com'
  
  return {
    title: 'Brinicle - Production-Oriented ANN Vector Engine',
    description: 'Brinicle Vector Engine: A production-oriented ANN index engine designed for strict resource budgets. Disk-first operation with low memory overhead. Perfect for datasets under 10M vectors, tight containers, edge machines, and low-cost instances. Get fast approximate nearest neighbor search without the overhead of a full vector database.',
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
      siteName: 'Brinicle',
      title: 'Brinicle - Production-Oriented ANN Vector Engine',
      description: 'A production-oriented ANN index engine designed for strict resource budgets. Disk-first operation with low memory overhead.',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Brinicle - Production-Oriented ANN Vector Engine',
      description: 'A production-oriented ANN index engine designed for strict resource budgets. Disk-first operation with low memory overhead.',
    },
  };
}

export default function Home() {


  return (
    <div className="container relative mx-auto size-full max-w-6xl divide-y px-0 [&>*:nth-child(n+3)]:sm:border-x">
      <main className="space-y-0">
        <Header/>
        <Hero/>
        <Introduce/>
        <CodeCase/>
        <BenchmarkSummary/>
        <AboutSummary/>
      </main>
      <Footer/>
    </div>
  );
}
