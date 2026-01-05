import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { BenchmarkTable } from '@/components/benchmark-table'
import { BenchmarkImage } from '@/components/benchmark-image'
import { RecallCodeBlock } from '@/components/recall-code-block'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Benchmark - brinicle',
  description: 'Comprehensive benchmark results comparing brinicle with other vector databases and ANN libraries. See performance metrics, memory efficiency, latency comparisons, and recall vs latency tradeoffs.',
  keywords: [
    'brinicle benchmark',
    'vector database comparison',
    'ANN library performance',
    'vector search benchmark',
    'memory efficiency',
    'latency comparison',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'}/benchmark`,
    siteName: 'brinicle',
    title: 'Benchmark Results - brinicle',
    description: 'Comprehensive benchmark results comparing brinicle with Qdrant, Weaviate, Milvus, Chroma, FAISS, and hnswlib.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Benchmark Results - brinicle',
    description: 'Comprehensive benchmark results comparing brinicle with other vector databases and ANN libraries.',
  },
}

export default function BenchmarkPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Benchmark Results - brinicle',
    description: 'Comprehensive benchmark results comparing brinicle with vector databases (Qdrant, Weaviate, Milvus, Chroma) and in-process ANN libraries (FAISS, hnswlib). Performance metrics, memory efficiency, latency comparisons, and recall vs latency tradeoffs.',
    url: `${siteUrl}/benchmark`,
    mainEntity: {
      '@type': 'Dataset',
      name: 'brinicle Benchmark Results',
      description: 'Performance benchmarks comparing brinicle vector index engine with other vector databases and ANN libraries across multiple datasets including SIFT, Fashion-MNIST, and MNIST.',
      keywords: 'vector search benchmark, ANN performance, memory efficiency, latency comparison, vector database benchmark',
      creator: {
        '@type': 'Organization',
        name: 'Bicardinal',
        url: 'https://bicardinal.com',
      },
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
          name: 'Benchmark',
          item: `${siteUrl}/benchmark`,
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
          <Header/>
        <div className="w-full py-16 flex-col flex">
          <div className="container space-y-16">
            {/* Hero Section */}
            <div className="flex items-center justify-center pb-10 w-full flex-col">
              <h1 className="mb-4 font-bold text-3xl text-primary tracking-tight md:text-4xl lg:text-5xl">
                Benchmark Results
              </h1>
              <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-center">
                Comprehensive performance comparison of brinicle with vector databases and in-process ANN libraries
              </p>
            </div>

            {/* Benchmark Setup */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Benchmark Setup</h2>

              <div className="space-y-4 text-base md:text-lg leading-relaxed">
                <p>
                  We cover two kinds of comparisons:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>
                    <strong>Vector databases</strong> tested as services over HTTP: Qdrant, Weaviate, Milvus, Chroma
                  </li>
                  <li>
                    <strong>In-process ANN libraries</strong> imported directly: FAISS, hnswlib
                  </li>
                </ol>
                <p>
                  These are different deployment models. The DB results include server overhead. The in-process results
                  do not.
                  We first build the index, and then run the search for 10 times, and take the average of search latency
                  and recall@10.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Environment</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                  <li>Host OS: Ubuntu 25.10</li>
                  <li>CPU: Intel Core i7-13650HX (20 cores)</li>
                  <li>RAM: 32 GiB</li>
                  <li>Storage: NVMe SSD</li>
                  <li>Docker: 29.1.3</li>
                  <li>Storage driver: overlay2</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Datasets and Distance</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                  <li>Datasets are downloaded directly from ann-benchmarks.com with no preprocessing.</li>
                  <li>Distance metric is L2 across all systems.</li>
                  <li>Parameters are fixed (M=16, ef_construction=200, ef_search varies where explicitly swept).</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Recall@K</h3>
                <p className="text-base">
                  Recall is computed as average overlap between predicted top K and ground truth top K.
                </p>
                <RecallCodeBlock />
                <p className="text-sm text-muted-foreground italic">
                  <strong>Important detail about configuration:</strong> We did not tune database configs or do a
                  parameter search.
                  We kept parameters fixed to reduce degrees of freedom and to keep the comparison reproducible.
                </p>
              </div>
            </section>

            {/* Result 1 */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Result 1: Extreme RAM Caps (256MB) are a Hard Boundary for Many DBs
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                This is the core motivation for brinicle. In a constrained container (MNIST, 256MB RAM, 1 CPU),
                the following happened. All failures were verified as <strong>OOMKilled</strong> by Docker.
              </p>

              <BenchmarkTable
                title="MNIST (60K, 784 dim), 256MB RAM, 1 CPU"
                headers={['System', 'Outcome']}
                data={[
                  {System: 'brinicle', Outcome: 'PASS'},
                  {System: 'chroma', Outcome: 'PASS'},
                  {System: 'qdrant', Outcome: 'OOMKilled'},
                  {System: 'weaviate', Outcome: 'OOMKilled'},
                  {System: 'milvus', Outcome: 'OOMKilled'},
                ]}
                note="This table answers a practical question: if you want vector search in a very small container, which systems can actually complete a build and serve queries without being killed by the memory limit."
              />
            </section>

            {/* Result 2 */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Result 2: Latency and Memory Profiles under Constrained DB Deployments
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Below are snapshots from the constrained HTTP service benchmark runs.
              </p>

              <BenchmarkTable
                title="Fashion-MNIST (60K, 784 dim), 512MB RAM, 2 CPU"
                headers={['System', 'Build (s)', 'Recall@10', 'Avg (ms)', 'P50 (ms)', 'P95 (ms)', 'P99 (ms)', 'QPS', 'Build peak (MB)', 'Search peak (MB)']}
                data={[
                  {
                    System: 'qdrant',
                    'Build (s)': 14.827,
                    'Recall@10': 0.9979,
                    'Avg (ms)': 1.579,
                    'P50 (ms)': 1.173,
                    'P95 (ms)': 3.441,
                    'P99 (ms)': 6.947,
                    QPS: 690.38,
                    'Build peak (MB)': 512.0,
                    'Search peak (MB)': 282.8
                  },
                  {
                    System: 'chroma',
                    'Build (s)': 29.299,
                    'Recall@10': 0.9978,
                    'Avg (ms)': 3.085,
                    'P50 (ms)': 3.080,
                    'P95 (ms)': 4.646,
                    'P99 (ms)': 5.205,
                    QPS: 328.20,
                    'Build peak (MB)': 512.00,
                    'Search peak (MB)': 512.01
                  },
                  {
                    System: 'weaviate',
                    'Build (s)': 45.387,
                    'Recall@10': 0.99786,
                    'Avg (ms)': 3.559,
                    'P50 (ms)': 3.314,
                    'P95 (ms)': 5.104,
                    'P99 (ms)': 10.330,
                    QPS: 281.49,
                    'Build peak (MB)': 512.10,
                    'Search peak (MB)': 512.03
                  },
                  {
                    System: 'brinicle',
                    'Build (s)': 144.223,
                    'Recall@10': 0.99782,
                    'Avg (ms)': 0.927,
                    'P50 (ms)': 0.797,
                    'P95 (ms)': 1.705,
                    'P99 (ms)': 2.266,
                    QPS: 1086.64,
                    'Build peak (MB)': 469.85,
                    'Search peak (MB)': 285.20
                  },
                  {
                    System: 'milvus',
                    'Build (s)': 18.617,
                    'Recall@10': 0.99886,
                    'Avg (ms)': 2.672,
                    'P50 (ms)': 2.665,
                    'P95 (ms)': 3.636,
                    'P99 (ms)': 4.513,
                    QPS: 376.09,
                    'Build peak (MB)': 1024.00,
                    'Search peak (MB)': 887.67
                  },
                ]}
                note="Note: Milvus required 1024MB in this setup because it was OOMKilled at 512MB."
              />

              <BenchmarkTable
                title="MNIST (60K, 784 dim), 256MB RAM, 1 CPU"
                headers={['System', 'Build (s)', 'Recall@10', 'Avg (ms)', 'P50 (ms)', 'P95 (ms)', 'P99 (ms)', 'QPS', 'Build peak (MB)', 'Search peak (MB)']}
                data={[
                  {
                    System: 'brinicle',
                    'Build (s)': 147.435,
                    'Recall@10': 0.99818,
                    'Avg (ms)': 1.018,
                    'P50 (ms)': 0.865,
                    'P95 (ms)': 1.943,
                    'P99 (ms)': 2.452,
                    QPS: 991.01,
                    'Build peak (MB)': 256.00,
                    'Search peak (MB)': 224.95
                  },
                  {
                    System: 'chroma',
                    'Build (s)': 49.928,
                    'Recall@10': 0.99807,
                    'Avg (ms)': 2.009,
                    'P50 (ms)': 1.741,
                    'P95 (ms)': 3.667,
                    'P99 (ms)': 4.539,
                    QPS: 505.67,
                    'Build peak (MB)': 256.20,
                    'Search peak (MB)': 255.89
                  },
                ]}
                note="Note: Only brinicle and chroma survived."
              />

              <BenchmarkTable
                title="SIFT (1M, 128 dim), 4096MB RAM, 2 CPU"
                headers={['System', 'Build (s)', 'Recall@10', 'Avg (ms)', 'P50 (ms)', 'P95 (ms)', 'P99 (ms)', 'QPS', 'Build peak (MB)', 'Search peak (MB)']}
                data={[
                  {
                    System: 'weaviate',
                    'Build (s)': 937.592,
                    'Recall@10': 0.96276,
                    'Avg (ms)': 2.420,
                    'P50 (ms)': 2.390,
                    'P95 (ms)': 2.966,
                    'P99 (ms)': 3.207,
                    QPS: 413.20,
                    'Build peak (MB)': 4096.00,
                    'Search peak (MB)': 3594.80
                  },
                  {
                    System: 'qdrant',
                    'Build (s)': 14.115,
                    'Recall@10': 0.99450,
                    'Avg (ms)': 4.570,
                    'P50 (ms)': 3.046,
                    'P95 (ms)': 10.294,
                    'P99 (ms)': 24.532,
                    QPS: 599.22,
                    'Build peak (MB)': 1986.83,
                    'Search peak (MB)': 1480.99
                  },
                  {
                    System: 'milvus',
                    'Build (s)': 204.410,
                    'Recall@10': 0.98432,
                    'Avg (ms)': 2.463,
                    'P50 (ms)': 2.449,
                    'P95 (ms)': 3.142,
                    'P99 (ms)': 5.681,
                    QPS: 406.54,
                    'Build peak (MB)': 2732.63,
                    'Search peak (MB)': 2445.63
                  },
                  {
                    System: 'chroma',
                    'Build (s)': 228.988,
                    'Recall@10': 0.96352,
                    'Avg (ms)': 2.942,
                    'P50 (ms)': 3.000,
                    'P95 (ms)': 4.222,
                    'P99 (ms)': 4.670,
                    QPS: 341.23,
                    'Build peak (MB)': 1705.38,
                    'Search peak (MB)': 1705.62
                  },
                  {
                    System: 'brinicle',
                    'Build (s)': 387.065,
                    'Recall@10': 0.96993,
                    'Avg (ms)': 0.838,
                    'P50 (ms)': 0.746,
                    'P95 (ms)': 1.477,
                    'P99 (ms)': 2.036,
                    QPS: 1204.12,
                    'Build peak (MB)': 1552.76,
                    'Search peak (MB)': 982.94
                  },
                ]}
              />
            </section>

            {/* Result 3 */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Result 3: Recall versus Latency Tradeoff (ef_search sweep)
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                Higher recall usually costs more latency. To make that tradeoff explicit, we ran a sweep:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-base">
                <li>Dataset: SIFT (1M, 128 dim)</li>
                <li>Resources: 4GB RAM, 2 CPU</li>
                <li>Distance: L2</li>
                <li>Fixed: M=16, ef_construction=200</li>
                <li>Sweep: ef_search [16, 32, 64, 128, 256]</li>
              </ul>

              <BenchmarkImage
                src="/blow/latency_recall_curve_p95.png"
                alt="Latency vs Recall Curve P95"
                title="P95 Latency vs Recall"
              />
              <BenchmarkImage
                src="/blow/latency_recall_curve_p99.png"
                alt="Latency vs Recall Curve P99"
                title="P99 Latency vs Recall"
              />
              <BenchmarkImage
                src="/blow/memory_bars.png"
                alt="Memory Usage Comparison"
                title="Memory Usage Comparison"
              />
            </section>

            {/* Result 4 */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Result 4: In-Process Libraries (FAISS, hnswlib, brinicle)
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                How does brinicle compare when used the same way you would use FAISS or hnswlib,
                inside one process, with no network overhead.
              </p>

              <BenchmarkTable
                title="GIST (1M, 960 dim)"
                headers={['System', 'Build (s)', 'Recall@10', 'Avg (ms)', 'P50 (ms)', 'P95 (ms)', 'P99 (ms)', 'QPS']}
                data={[
                  {
                    System: 'faiss',
                    'Build (s)': 872.273,
                    'Recall@10': 0.77270,
                    'Avg (ms)': 0.335,
                    'P50 (ms)': 0.343,
                    'P95 (ms)': 0.408,
                    'P99 (ms)': 0.445,
                    QPS: 2981.32
                  },
                  {
                    System: 'hnswlib',
                    'Build (s)': 1032.707,
                    'Recall@10': 0.75620,
                    'Avg (ms)': 0.408,
                    'P50 (ms)': 0.397,
                    'P95 (ms)': 0.470,
                    'P99 (ms)': 0.499,
                    QPS: 2450.41
                  },
                  {
                    System: 'brinicle',
                    'Build (s)': 1138.479,
                    'Recall@10': 0.77020,
                    'Avg (ms)': 0.494,
                    'P50 (ms)': 0.450,
                    'P95 (ms)': 0.848,
                    'P99 (ms)': 1.549,
                    QPS: 2023.60
                  },
                ]}
              />

              <BenchmarkTable
                title="SIFT (1M, 128 dim)"
                headers={['System', 'Build (s)', 'Recall@10', 'Avg (ms)', 'P50 (ms)', 'P95 (ms)', 'P99 (ms)', 'QPS']}
                data={[
                  {
                    System: 'faiss',
                    'Build (s)': 237.282,
                    'Recall@10': 0.96999,
                    'Avg (ms)': 0.092,
                    'P50 (ms)': 0.095,
                    'P95 (ms)': 0.115,
                    'P99 (ms)': 0.127,
                    QPS: 10857.43
                  },
                  {
                    System: 'hnswlib',
                    'Build (s)': 241.301,
                    'Recall@10': 0.96364,
                    'Avg (ms)': 0.093,
                    'P50 (ms)': 0.092,
                    'P95 (ms)': 0.110,
                    'P99 (ms)': 0.120,
                    QPS: 10711.86
                  },
                  {
                    System: 'brinicle',
                    'Build (s)': 243.750,
                    'Recall@10': 0.96989,
                    'Avg (ms)': 0.103,
                    'P50 (ms)': 0.101,
                    'P95 (ms)': 0.138,
                    'P99 (ms)': 0.171,
                    QPS: 9730.65
                  },
                ]}
              />

              <BenchmarkTable
                title="MNIST (60K, 784 dim)"
                headers={['System', 'Build (s)', 'Recall@10', 'Avg (ms)', 'P50 (ms)', 'P95 (ms)', 'P99 (ms)', 'QPS']}
                data={[
                  {
                    System: 'brinicle',
                    'Build (s)': 20.754,
                    'Recall@10': 0.99818,
                    'Avg (ms)': 0.161,
                    'P50 (ms)': 0.159,
                    'P95 (ms)': 0.221,
                    'P99 (ms)': 0.255,
                    QPS: 6208.06
                  },
                  {
                    System: 'faiss',
                    'Build (s)': 19.798,
                    'Recall@10': 0.99806,
                    'Avg (ms)': 0.142,
                    'P50 (ms)': 0.139,
                    'P95 (ms)': 0.192,
                    'P99 (ms)': 0.221,
                    QPS: 7062.90
                  },
                  {
                    System: 'hnswlib',
                    'Build (s)': 21.474,
                    'Recall@10': 0.99808,
                    'Avg (ms)': 0.177,
                    'P50 (ms)': 0.176,
                    'P95 (ms)': 0.239,
                    'P99 (ms)': 0.273,
                    QPS: 5663.67
                  },
                ]}
              />

              <BenchmarkTable
                title="Fashion-MNIST (60K, 784 dim)"
                headers={['System', 'Build (s)', 'Recall@10', 'Avg (ms)', 'P50 (ms)', 'P95 (ms)', 'P99 (ms)', 'QPS']}
                data={[
                  {
                    System: 'hnswlib',
                    'Build (s)': 17.800,
                    'Recall@10': 0.99778,
                    'Avg (ms)': 0.157,
                    'P50 (ms)': 0.151,
                    'P95 (ms)': 0.202,
                    'P99 (ms)': 0.234,
                    QPS: 6362.37
                  },
                  {
                    System: 'brinicle',
                    'Build (s)': 17.064,
                    'Recall@10': 0.99782,
                    'Avg (ms)': 0.147,
                    'P50 (ms)': 0.144,
                    'P95 (ms)': 0.201,
                    'P99 (ms)': 0.237,
                    QPS: 6817.81
                  },
                  {
                    System: 'faiss',
                    'Build (s)': 16.787,
                    'Recall@10': 0.99770,
                    'Avg (ms)': 0.125,
                    'P50 (ms)': 0.125,
                    'P95 (ms)': 0.167,
                    'P99 (ms)': 0.194,
                    QPS: 7976.62
                  },
                ]}
              />
            </section>

            {/* Takeaways */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                What to Take Away from These Results
              </h2>
              <ol className="list-decimal list-inside space-y-4 ml-4 text-base md:text-lg leading-relaxed">
                <li>
                  <strong>Survivability under hard RAM caps matters.</strong> In the 256MB MNIST run,
                  multiple database containers were OOMKilled. brinicle completed build and search.
                </li>
                <li>
                  <strong>Tail latency is a primary metric for search systems.</strong> Average latency is useful,
                  but p95 and p99 are where disk-first and constrained environments tend to show problems.
                  That is why the tables and plots emphasize percentiles.
                </li>
                <li>
                  <strong>The recall-latency curve is the most informative comparison.</strong> The ef_search sweep
                  shows how each system behaves as you push toward higher recall.
                </li>
                <li>
                  <strong>brinicle is positioned as an engine.</strong> If you want a full vector database,
                  you should use one. If you want the index layer with a small memory footprint, brinicle is designed
                  for that.
                </li>
              </ol>
            </section>

            {/* Reproducing */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Reproducing the Benchmarks
              </h2>
              <div className="space-y-4 text-base">
                <p>The benchmark harness is public:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <a
                      href="https://github.com/bicardinal/db_bench"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://github.com/bicardinal/db_bench
                    </a>
                  </li>
                </ul>
                <p>brinicle is here:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <a
                      href="https://github.com/bicardinal/brinicle"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://github.com/bicardinal/brinicle
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
    </>

  )
}
