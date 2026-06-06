import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/header'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Introducing brinicle',
  description: 'brinicle is an open source C++ vector index engine for approximate nearest neighbor search, built for disk-first operation and low-RAM environments.',
  keywords: [
    'bicardinal',
    'brinicle',
    'vector index engine',
    'ANN library',
    'disk-first',
    'low memory',
    'benchmark',
    'vector search',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'}/benchmark`,
    siteName: 'brinicle',
    title: 'Introducing brinicle',
    description: 'brinicle is an open source C++ vector index engine for approximate nearest neighbor search, built for disk-first operation and low-RAM environments.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Introducing brinicle',
    description: 'brinicle is an open source C++ vector index engine for approximate nearest neighbor search, built for disk-first operation and low-RAM environments.',
  },
}

export default function BenchmarkPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Introducing brinicle',
    description: 'brinicle is an open source C++ vector index engine for approximate nearest neighbor search, built for disk-first operation and low-RAM environments.',
    url: `${siteUrl}/benchmark`,
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'brinicle',
      description: 'brinicle is an open source C++ vector index engine for approximate nearest neighbor search. It is built for disk-first operation and low-RAM environments.',
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
          name: 'Benchmark',
          item: `${siteUrl}/benchmark`,
        },
      ],
    },
    inLanguage: 'en',
  }

  return (
    <>
      <JsonLd data={jsonLd}/>
      <div className="container relative mx-auto size-full max-w-6xl divide-y px-0 [&>*:nth-child(n+3)]:sm:border-x">
        <main>
          <Header/>
          <div className="w-full py-16 flex-col flex">
            <div className="container space-y-12 max-w-4xl mx-auto">
              {/* Introduction */}
              <section className="space-y-6">
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <h1 className="mb-4 font-bold text-3xl text-primary tracking-tight md:text-4xl lg:text-5xl">
                    Vector Benchmark
                  </h1>
                  <p>
                    Nowadays, vector search is becoming a common component in many products: site search,
                    recommendations, semantic autocomplete, support tooling, and AI agents that retrieve the right
                    chunks before calling an LLM. The implementation choices change a lot as the data size grows. With a
                    few thousand vectors, an exact k-NN scan can be perfectly fine. Once you move into larger
                    collections, approximate nearest neighbor (ANN) indexing becomes the practical approach. You build
                    an index, persist it, and query it efficiently.
                  </p>
                  <p>
                    At that point, many teams reach for a full-featured vector database because it bundles ANN with a
                    service layer. That bundle is valuable when you need it. It also comes with a baseline overhead:
                    extra moving parts, background processes, configuration surface area, and memory overhead that is
                    often &ldquo;always on&rdquo; even for small-to-mid sized datasets. If you are deploying in tight
                    containers, edge machines, or low-cost instances, the baseline matters as much as raw search speed.
                  </p>
                  <p>
                    So the first question is &ldquo;what do I actually need to run in production&rdquo; instead
                    of &ldquo;which system is fastest&rdquo;. If you need pre-filtering, rich metadata, payload
                    indexing, authentication, replication, multi-tenancy, and operational tooling, and you are operating
                    at tens of millions of vectors, then a full vector database is usually the right choice.
                  </p>
                  <p>
                    A lot of real systems sit in a different zone. They need fast ANN search on a dataset no more than
                    10M vectors, plus the core lifecycle operations: insert, upsert, delete, and periodic
                    rebuild/compaction. They already have a metadata store, so duplicating that layer inside a vector DB
                    is redundant. In that setup, a full DB can feel like paying in RAM and operational complexity for
                    features that aren&rsquo;t used.
                  </p>
                  <p>
                    Building an index engine from scratch is also a rarely worth it for most teams. It&rsquo;s
                    time-consuming, and it pulls attention away from the core product. The usual alternative is
                    in-process libraries such as FAISS and hnswlib. They are quite fast, with great accuracy, yet they
                    often push you toward a RAM-first model where large portions of the index and vectors live in
                    memory. In some cases, they consume more RAM than a full vector database. Production details like
                    persistence workflow, safe mutation, concurrency, predictable memory growth should also be written
                    on top of them.
                  </p>
                  <p>
                    brinicle Vector Engine targets this gap: a production-oriented ANN index engine designed to stay
                    usable under strict resource budgets. It focuses on disk-first operation and low memory overhead,
                    while still supporting the operations you typically need in a real service: build/load, search,
                    insert/upsert/delete, and rebuild.
                  </p>
                  <p>
                    If your dataset is in the sub-10M range and your main constraint is resources (RAM caps, small
                    instances, dense multi-tenant packing), or you&rsquo;re deploying an agent on a 512MB container and
                    only need ANN + CRUD, brinicle is meant to give you the index layer you need without forcing you to
                    adopt a full vector database.
                  </p>
                </div>
              </section>

              {/* brinicle: disk-first ANN indexing for low-RAM vector search */}
              <section className="space-y-6">
                <h1 className="font-bold text-3xl text-primary tracking-tight md:text-4xl lg:text-5xl">
                  brinicle: disk-first ANN indexing for low-RAM vector search
                </h1>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    brinicle is an open source C++ vector index engine for approximate nearest neighbor search. It is
                    built for disk-first operation and low-RAM environments. The goal is simple: keep RAM usage
                    predictable, keep tail latency stable, and still hit high recall.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-base md:text-lg">brinicle supports:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>building and loading indexes</li>
                    <li>parallel insert, upsert, delete, and rebuild</li>
                    <li>safe search</li>
                  </ul>
                  <p className="text-base md:text-lg">
                    It also ships with a Python wrapper (pybind), so you can use it directly from Python.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-base md:text-lg">Project links:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>brinicle: https://github.com/bicardinal/brinicle</li>
                    <li>benchmark harness: https://github.com/bicardinal/db_bench</li>
                  </ul>
                </div>
              </section>

              <hr className="border-border"/>

              {/* What brinicle is, and what it is not */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  What brinicle is, and what it is not
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    <strong>brinicle is an index engine.</strong> You embed it in a service or pair it with your own
                    metadata store.
                  </p>
                  <p>
                    <strong>brinicle is not a vector database.</strong> It does not aim to provide database features
                    like filtering, payload indexing, distributed replication, auth, or multi-tenancy. If you need those
                    features, use a vector database.
                  </p>
                  <p>
                    This separation is intentional. The benchmarks in this post show why: a full DB stack often has a
                    baseline memory footprint that is not compatible with extreme RAM caps, even before you start
                    tuning.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-base md:text-lg font-semibold">When brinicle is a fit</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>You&rsquo;re under 10M vectors and already have a metadata store</li>
                    <li>You must run in tight RAM (&le;1&ndash;2GB) or pack many tenants per node</li>
                    <li>You want ANN + CRUD + rebuild/compaction, not DB features</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-base md:text-lg font-semibold">When a vector DB is the right tool</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>You need filtering/payload indexing as part of retrieval</li>
                    <li>You need replication, auth, multi-tenancy, operational UI/tooling</li>
                    <li>You&apos;re operating at large scale (tens/hundreds of millions) and want a managed service</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-base md:text-lg font-semibold">What you trade</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>Lower baseline RAM / simpler stack <strong>in exchange for</strong> bringing your own metadata +
                      service layer.
                    </li>
                  </ul>
                </div>
              </section>

              <hr className="border-border"/>

              {/* Benchmark setup */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Benchmark setup
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    We cover two kinds of comparisons.
                  </p>
                  <p>
                    1) <strong>Vector databases</strong> tested as services over HTTP:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>Qdrant, Weaviate, Milvus, Chroma</li>
                  </ul>
                  <p>
                    2) <strong>In-process ANN libraries</strong> imported directly:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>FAISS, hnswlib</li>
                  </ul>
                  <p>
                    These are different deployment models. The DB results include server overhead. The in-process
                    results do not.
                    We first build the index, and then run the search for 10 times, and take the average of search
                    latency and recall@10.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Environment</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>Host OS: Ubuntu 25.10</li>
                    <li>CPU: Intel Core i7-13650HX (20 cores)</li>
                    <li>RAM: 32 GiB</li>
                    <li>Storage: NVMe SSD</li>
                    <li>Docker: 29.1.3</li>
                    <li>Storage driver: overlay2</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Datasets and distance</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>Datasets are downloaded directly from ann-benchmarks.com with no preprocessing.</li>
                    <li>Distance metric is L2 across all systems.</li>
                    <li>Parameters are fixed (M=16, ef_construction=200, ef_search varies where explicitly swept).</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Recall@K</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Recall is computed as average overlap between predicted top K and ground truth top K:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`def compute_recalls(pred_ids: np.ndarray, gt_top: np.ndarray, K: int):
    nq = gt_top.shape[0]
    out = {}
    hits = 0
    for i in range(nq):
        a = pred_ids[i, :K]
        b = gt_top[i, :K]
        hits += len(set(a.tolist()) & set(b.tolist()))
    out[f"recall@{K}"] = hits / (nq * K)
    return out`}</code>
                </pre>
                  <p className="text-base md:text-lg leading-relaxed">
                    <strong>Important detail about configuration</strong>
                    <br/>
                    We did not tune database configs or do a parameter search. We kept parameters fixed to reduce
                    degrees of freedom and to keep the comparison reproducible.
                  </p>
                </div>
              </section>

              <hr className="border-border"/>

              {/* Result 1 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Result 1: extreme RAM caps (256MB) are a hard boundary for many DBs
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    This is the core motivation for brinicle. In a constrained container (MNIST, 256MB RAM, 1 CPU), the
                    following happened. All failures were verified as <strong>OOMKilled</strong> by Docker.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">MNIST (60K, 784 dim), 256MB RAM, 1 CPU</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">System</th>
                        <th className="text-left p-2 font-semibold">Outcome</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b">
                        <td className="p-2">brinicle</td>
                        <td className="p-2">PASS</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">chroma</td>
                        <td className="p-2">PASS</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">qdrant</td>
                        <td className="p-2">OOMKilled</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">weaviate</td>
                        <td className="p-2">OOMKilled</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">milvus</td>
                        <td className="p-2">OOMKilled</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This table answers a practical question: if you want vector search in a very small container, which
                    systems can actually complete a build and serve queries without being killed by the memory limit.
                  </p>
                </div>
              </section>

              <hr className="border-border"/>

              {/* Result 2 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Result 2: latency and memory profiles under constrained DB deployments
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    Below are snapshots from the constrained HTTP service benchmark runs.
                  </p>
                </div>

                {/* Fashion-MNIST */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Fashion-MNIST (60K, 784 dim), 512MB RAM, 2
                    CPU</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">System</th>
                        <th className="text-right p-2 font-semibold">Build (s)</th>
                        <th className="text-right p-2 font-semibold">Recall@10</th>
                        <th className="text-right p-2 font-semibold">Avg (ms)</th>
                        <th className="text-right p-2 font-semibold">P50 (ms)</th>
                        <th className="text-right p-2 font-semibold">P95 (ms)</th>
                        <th className="text-right p-2 font-semibold">P99 (ms)</th>
                        <th className="text-right p-2 font-semibold">QPS</th>
                        <th className="text-right p-2 font-semibold">Build peak (MB)</th>
                        <th className="text-right p-2 font-semibold">Search peak (MB)</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b">
                        <td className="p-2">qdrant</td>
                        <td className="text-right p-2">14.827</td>
                        <td className="text-right p-2">0.9979</td>
                        <td className="text-right p-2">1.579</td>
                        <td className="text-right p-2">1.173</td>
                        <td className="text-right p-2">3.441</td>
                        <td className="text-right p-2">6.947</td>
                        <td className="text-right p-2">690.38</td>
                        <td className="text-right p-2">512.0</td>
                        <td className="text-right p-2">282.8</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">chroma</td>
                        <td className="text-right p-2">29.299</td>
                        <td className="text-right p-2">0.9978</td>
                        <td className="text-right p-2">3.085</td>
                        <td className="text-right p-2">3.080</td>
                        <td className="text-right p-2">4.646</td>
                        <td className="text-right p-2">5.205</td>
                        <td className="text-right p-2">328.20</td>
                        <td className="text-right p-2">512.00</td>
                        <td className="text-right p-2">512.01</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">weaviate</td>
                        <td className="text-right p-2">45.387</td>
                        <td className="text-right p-2">0.99786</td>
                        <td className="text-right p-2">3.559</td>
                        <td className="text-right p-2">3.314</td>
                        <td className="text-right p-2">5.104</td>
                        <td className="text-right p-2">10.330</td>
                        <td className="text-right p-2">281.49</td>
                        <td className="text-right p-2">512.10</td>
                        <td className="text-right p-2">512.03</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">brinicle</td>
                        <td className="text-right p-2">144.223</td>
                        <td className="text-right p-2">0.99782</td>
                        <td className="text-right p-2">0.927</td>
                        <td className="text-right p-2">0.797</td>
                        <td className="text-right p-2">1.705</td>
                        <td className="text-right p-2">2.266</td>
                        <td className="text-right p-2">1086.64</td>
                        <td className="text-right p-2">469.85</td>
                        <td className="text-right p-2">285.20</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">milvus</td>
                        <td className="text-right p-2">18.617</td>
                        <td className="text-right p-2">0.99886</td>
                        <td className="text-right p-2">2.672</td>
                        <td className="text-right p-2">2.665</td>
                        <td className="text-right p-2">3.636</td>
                        <td className="text-right p-2">4.513</td>
                        <td className="text-right p-2">376.09</td>
                        <td className="text-right p-2">1024.00</td>
                        <td className="text-right p-2">887.67</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    <strong>Note:</strong> Milvus required 1024MB in this setup because it was OOMKilled at 512MB.
                  </p>
                </div>

                {/* MNIST */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">MNIST (60K, 784 dim), 256MB RAM, 1 CPU</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">System</th>
                        <th className="text-right p-2 font-semibold">Build (s)</th>
                        <th className="text-right p-2 font-semibold">Recall@10</th>
                        <th className="text-right p-2 font-semibold">Avg (ms)</th>
                        <th className="text-right p-2 font-semibold">P50 (ms)</th>
                        <th className="text-right p-2 font-semibold">P95 (ms)</th>
                        <th className="text-right p-2 font-semibold">P99 (ms)</th>
                        <th className="text-right p-2 font-semibold">QPS</th>
                        <th className="text-right p-2 font-semibold">Build peak (MB)</th>
                        <th className="text-right p-2 font-semibold">Search peak (MB)</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b">
                        <td className="p-2">brinicle</td>
                        <td className="text-right p-2">147.435</td>
                        <td className="text-right p-2">0.99818</td>
                        <td className="text-right p-2">1.018</td>
                        <td className="text-right p-2">0.865</td>
                        <td className="text-right p-2">1.943</td>
                        <td className="text-right p-2">2.452</td>
                        <td className="text-right p-2">991.01</td>
                        <td className="text-right p-2">256.00</td>
                        <td className="text-right p-2">224.95</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">chroma</td>
                        <td className="text-right p-2">49.928</td>
                        <td className="text-right p-2">0.99807</td>
                        <td className="text-right p-2">2.009</td>
                        <td className="text-right p-2">1.741</td>
                        <td className="text-right p-2">3.667</td>
                        <td className="text-right p-2">4.539</td>
                        <td className="text-right p-2">505.67</td>
                        <td className="text-right p-2">256.20</td>
                        <td className="text-right p-2">255.89</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    <strong>Note:</strong> Only brinicle, and chroma survived.
                  </p>
                </div>

                {/* SIFT */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">SIFT (1M, 128 dim), 4096MB RAM, 2 CPU</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">System</th>
                        <th className="text-right p-2 font-semibold">Build (s)</th>
                        <th className="text-right p-2 font-semibold">Recall@10</th>
                        <th className="text-right p-2 font-semibold">Avg (ms)</th>
                        <th className="text-right p-2 font-semibold">P50 (ms)</th>
                        <th className="text-right p-2 font-semibold">P95 (ms)</th>
                        <th className="text-right p-2 font-semibold">P99 (ms)</th>
                        <th className="text-right p-2 font-semibold">QPS</th>
                        <th className="text-right p-2 font-semibold">Build peak (MB)</th>
                        <th className="text-right p-2 font-semibold">Search peak (MB)</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b">
                        <td className="p-2">weaviate</td>
                        <td className="text-right p-2">937.592</td>
                        <td className="text-right p-2">0.96276</td>
                        <td className="text-right p-2">2.420</td>
                        <td className="text-right p-2">2.390</td>
                        <td className="text-right p-2">2.966</td>
                        <td className="text-right p-2">3.207</td>
                        <td className="text-right p-2">413.20</td>
                        <td className="text-right p-2">4096.00</td>
                        <td className="text-right p-2">3594.80</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">qdrant</td>
                        <td className="text-right p-2">14.115</td>
                        <td className="text-right p-2">0.99450</td>
                        <td className="text-right p-2">4.570</td>
                        <td className="text-right p-2">3.046</td>
                        <td className="text-right p-2">10.294</td>
                        <td className="text-right p-2">24.532</td>
                        <td className="text-right p-2">599.22</td>
                        <td className="text-right p-2">1986.83</td>
                        <td className="text-right p-2">1480.99</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">milvus</td>
                        <td className="text-right p-2">204.410</td>
                        <td className="text-right p-2">0.98432</td>
                        <td className="text-right p-2">2.463</td>
                        <td className="text-right p-2">2.449</td>
                        <td className="text-right p-2">3.142</td>
                        <td className="text-right p-2">5.681</td>
                        <td className="text-right p-2">406.54</td>
                        <td className="text-right p-2">2732.63</td>
                        <td className="text-right p-2">2445.63</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">chroma</td>
                        <td className="text-right p-2">228.988</td>
                        <td className="text-right p-2">0.96352</td>
                        <td className="text-right p-2">2.942</td>
                        <td className="text-right p-2">3.000</td>
                        <td className="text-right p-2">4.222</td>
                        <td className="text-right p-2">4.670</td>
                        <td className="text-right p-2">341.23</td>
                        <td className="text-right p-2">1705.38</td>
                        <td className="text-right p-2">1705.62</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">brinicle</td>
                        <td className="text-right p-2">387.065</td>
                        <td className="text-right p-2">0.96993</td>
                        <td className="text-right p-2">0.838</td>
                        <td className="text-right p-2">0.746</td>
                        <td className="text-right p-2">1.477</td>
                        <td className="text-right p-2">2.036</td>
                        <td className="text-right p-2">1204.12</td>
                        <td className="text-right p-2">1552.76</td>
                        <td className="text-right p-2">982.94</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <hr className="border-border"/>

              {/* Result 3 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Result 3: recall versus latency tradeoff (ef_search sweep)
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    Higher recall usually costs more latency. To make that tradeoff explicit, we ran a sweep:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li>Dataset: SIFT (1M, 128 dim)</li>
                    <li>Resources: 4GB RAM, 2 CPU</li>
                    <li>Distance: L2</li>
                    <li>Fixed: M=16, ef_construction=200</li>
                    <li>Sweep: ef_search [16, 32, 64, 128, 256]</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <Image src="/blow/latency_recall_curve_p95.png" alt="latency_recall_curve_p95" width={800}
                         height={500} className="w-full rounded-lg"/>
                  <Image src="/blow/latency_recall_curve_p99.png" alt="latency_recall_curve_p99" width={800}
                         height={500} className="w-full rounded-lg"/>
                  <Image src="/blow/memory_bars.png" alt="memory_bars" width={800} height={500}
                         className="w-full rounded-lg"/>
                </div>
              </section>

              <hr className="border-border"/>

              {/* Result 4 */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Result 4: in-process libraries (FAISS, hnswlib, brinicle)
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    How does brinicle compare when used the same way you would use FAISS or hnswlib, inside one process,
                    with no network overhead.
                  </p>
                </div>

                {/* GIST */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">GIST (1M, 960 dim)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">System</th>
                        <th className="text-right p-2 font-semibold">Build (s)</th>
                        <th className="text-right p-2 font-semibold">Recall@10</th>
                        <th className="text-right p-2 font-semibold">Avg (ms)</th>
                        <th className="text-right p-2 font-semibold">P50 (ms)</th>
                        <th className="text-right p-2 font-semibold">P95 (ms)</th>
                        <th className="text-right p-2 font-semibold">P99 (ms)</th>
                        <th className="text-right p-2 font-semibold">QPS</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b">
                        <td className="p-2">faiss</td>
                        <td className="text-right p-2">872.273</td>
                        <td className="text-right p-2">0.77270</td>
                        <td className="text-right p-2">0.335</td>
                        <td className="text-right p-2">0.343</td>
                        <td className="text-right p-2">0.408</td>
                        <td className="text-right p-2">0.445</td>
                        <td className="text-right p-2">2981.32</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">hnswlib</td>
                        <td className="text-right p-2">1032.707</td>
                        <td className="text-right p-2">0.75620</td>
                        <td className="text-right p-2">0.408</td>
                        <td className="text-right p-2">0.397</td>
                        <td className="text-right p-2">0.470</td>
                        <td className="text-right p-2">0.499</td>
                        <td className="text-right p-2">2450.41</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">brinicle</td>
                        <td className="text-right p-2">1138.479</td>
                        <td className="text-right p-2">0.77020</td>
                        <td className="text-right p-2">0.494</td>
                        <td className="text-right p-2">0.450</td>
                        <td className="text-right p-2">0.848</td>
                        <td className="text-right p-2">1.549</td>
                        <td className="text-right p-2">2023.60</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SIFT */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">SIFT (1M, 128 dim)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">System</th>
                        <th className="text-right p-2 font-semibold">Build (s)</th>
                        <th className="text-right p-2 font-semibold">Recall@10</th>
                        <th className="text-right p-2 font-semibold">Avg (ms)</th>
                        <th className="text-right p-2 font-semibold">P50 (ms)</th>
                        <th className="text-right p-2 font-semibold">P95 (ms)</th>
                        <th className="text-right p-2 font-semibold">P99 (ms)</th>
                        <th className="text-right p-2 font-semibold">QPS</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b">
                        <td className="p-2">faiss</td>
                        <td className="text-right p-2">237.282</td>
                        <td className="text-right p-2">0.96999</td>
                        <td className="text-right p-2">0.092</td>
                        <td className="text-right p-2">0.095</td>
                        <td className="text-right p-2">0.115</td>
                        <td className="text-right p-2">0.127</td>
                        <td className="text-right p-2">10857.43</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">hnswlib</td>
                        <td className="text-right p-2">241.301</td>
                        <td className="text-right p-2">0.96364</td>
                        <td className="text-right p-2">0.093</td>
                        <td className="text-right p-2">0.092</td>
                        <td className="text-right p-2">0.110</td>
                        <td className="text-right p-2">0.120</td>
                        <td className="text-right p-2">10711.86</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">brinicle</td>
                        <td className="text-right p-2">234.572</td>
                        <td className="text-right p-2">0.97004</td>
                        <td className="text-right p-2">0.095</td>
                        <td className="text-right p-2">0.095</td>
                        <td className="text-right p-2">0.120</td>
                        <td className="text-right p-2">0.133</td>
                        <td className="text-right p-2">10563.05</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* MNIST */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">MNIST (60K, 784 dim)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">System</th>
                        <th className="text-right p-2 font-semibold">Build (s)</th>
                        <th className="text-right p-2 font-semibold">Recall@10</th>
                        <th className="text-right p-2 font-semibold">Avg (ms)</th>
                        <th className="text-right p-2 font-semibold">P50 (ms)</th>
                        <th className="text-right p-2 font-semibold">P95 (ms)</th>
                        <th className="text-right p-2 font-semibold">P99 (ms)</th>
                        <th className="text-right p-2 font-semibold">QPS</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b">
                        <td className="p-2">brinicle</td>
                        <td className="text-right p-2">20.754</td>
                        <td className="text-right p-2">0.99818</td>
                        <td className="text-right p-2">0.161</td>
                        <td className="text-right p-2">0.159</td>
                        <td className="text-right p-2">0.221</td>
                        <td className="text-right p-2">0.255</td>
                        <td className="text-right p-2">6208.06</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">faiss</td>
                        <td className="text-right p-2">19.798</td>
                        <td className="text-right p-2">0.99806</td>
                        <td className="text-right p-2">0.142</td>
                        <td className="text-right p-2">0.139</td>
                        <td className="text-right p-2">0.192</td>
                        <td className="text-right p-2">0.221</td>
                        <td className="text-right p-2">7062.90</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">hnswlib</td>
                        <td className="text-right p-2">21.474</td>
                        <td className="text-right p-2">0.99808</td>
                        <td className="text-right p-2">0.177</td>
                        <td className="text-right p-2">0.176</td>
                        <td className="text-right p-2">0.239</td>
                        <td className="text-right p-2">0.273</td>
                        <td className="text-right p-2">5663.67</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Fashion-MNIST */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Fashion-MNIST (60K, 784 dim)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-semibold">System</th>
                        <th className="text-right p-2 font-semibold">Build (s)</th>
                        <th className="text-right p-2 font-semibold">Recall@10</th>
                        <th className="text-right p-2 font-semibold">Avg (ms)</th>
                        <th className="text-right p-2 font-semibold">P50 (ms)</th>
                        <th className="text-right p-2 font-semibold">P95 (ms)</th>
                        <th className="text-right p-2 font-semibold">P99 (ms)</th>
                        <th className="text-right p-2 font-semibold">QPS</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="border-b">
                        <td className="p-2">hnswlib</td>
                        <td className="text-right p-2">17.800</td>
                        <td className="text-right p-2">0.99778</td>
                        <td className="text-right p-2">0.157</td>
                        <td className="text-right p-2">0.151</td>
                        <td className="text-right p-2">0.202</td>
                        <td className="text-right p-2">0.234</td>
                        <td className="text-right p-2">6362.37</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">brinicle</td>
                        <td className="text-right p-2">17.064</td>
                        <td className="text-right p-2">0.99782</td>
                        <td className="text-right p-2">0.147</td>
                        <td className="text-right p-2">0.144</td>
                        <td className="text-right p-2">0.201</td>
                        <td className="text-right p-2">0.237</td>
                        <td className="text-right p-2">6817.81</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">faiss</td>
                        <td className="text-right p-2">16.787</td>
                        <td className="text-right p-2">0.99770</td>
                        <td className="text-right p-2">0.125</td>
                        <td className="text-right p-2">0.125</td>
                        <td className="text-right p-2">0.167</td>
                        <td className="text-right p-2">0.194</td>
                        <td className="text-right p-2">7976.62</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <hr className="border-border"/>

              {/* What to take away from these results */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  What to take away from these results
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    1) <strong>Survivability under hard RAM caps matters.</strong> In the 256MB MNIST run, multiple
                    database containers were OOMKilled. brinicle completed build and search.
                  </p>
                  <p>
                    2) <strong>Tail latency is a primary metric for search systems.</strong> Average latency is useful,
                    but p95 and p99 are where disk-first and constrained environments tend to show problems. That is why
                    the tables and plots emphasize percentiles.
                  </p>
                  <p>
                    3) <strong>The recall-latency curve is the most informative comparison.</strong> The ef_search sweep
                    shows how each system behaves as you push toward higher recall.
                  </p>
                  <p>
                    4) <strong>brinicle is positioned as an engine.</strong> If you want a full vector database, you
                    should use one. If you want the index layer with a small memory footprint, brinicle is designed for
                    that.
                  </p>
                </div>
              </section>

              <hr className="border-border"/>

              {/* Future work */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Future work: more realistic workload benchmarks
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    This blog focuses on a clean workflow, build the index, then run read-only search, to make
                    comparisons reproducible. Real production systems are more complicated, and the benchmark suite
                    should expand to reflect that.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li><strong>Mixed read/write workloads:</strong> run sustained search traffic while one or more
                      writer processes perform insert/upsert in parallel, and report the impact on p95/p99 latency and
                      recall.
                    </li>
                    <li><strong>Delete-heavy workloads and long-running degradation:</strong> repeatedly delete a
                      fraction of vectors (and optionally reinsert) to measure how tombstones/fragmentation affect
                      recall and tail latency over time, and how often optimize graph is needed to recover performance.
                    </li>
                    <li><strong>Update patterns:</strong> build once with 90% of the dataset and insert the rest of the
                      data to see how recall/latency will be affected by insertion.
                    </li>
                    <li><strong>Bigger and more diverse datasets:</strong> include higher-scale datasets (multi-million
                      to 10M) across a wider range of dimensionalities, plus different query batch sizes and
                      multi-threaded query loads.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Reproducing the benchmarks */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  Reproducing the benchmarks
                </h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    The benchmark harness is public:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li><a href={'https://github.com/bicardinal/db_bench'}
                           target={'_blank'}>https://github.com/bicardinal/db_bench</a></li>
                  </ul>
                  <p>
                    brinicle is here:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-base md:text-lg">
                    <li><a href={'https://github.com/bicardinal/brinicle'}>https://github.com/bicardinal/brinicle</a>
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
