import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { BenchmarkTable } from '@/components/benchmark-table'
import { BenchmarkImage } from '@/components/benchmark-image'
import { JsonLd } from '@/components/json-ld'

export const metadata: Metadata = {
  title: 'Search Benchmark - brinicle',
  description: 'Hybrid search benchmark comparing Brinicle with Weaviate, Meilisearch, Typesense, and OpenSearch on WANDS and Amazon ESCI datasets. Single-graph hybrid retrieval for product search.',
  keywords: [
    'brinicle search benchmark',
    'hybrid search benchmark',
    'product search retrieval',
    'HNSW hybrid retrieval',
    'WANDS benchmark',
    'Amazon ESCI benchmark',
    'Weaviate comparison',
    'Meilisearch comparison',
    'Typesense comparison',
    'OpenSearch comparison',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'}/search_benchmark`,
    siteName: 'brinicle',
    title: 'Hybrid Search Benchmark - brinicle',
    description: 'Hybrid search benchmark comparing Brinicle with Weaviate, Meilisearch, Typesense, and OpenSearch on WANDS and Amazon ESCI datasets.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hybrid Search Benchmark - brinicle',
    description: 'Hybrid search benchmark comparing Brinicle with other search systems on product search datasets.',
  },
}

export default function SearchBenchmarkPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brinicle.bicardinal.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Hybrid Search Benchmark - brinicle',
    description: 'Hybrid search benchmark comparing Brinicle single-graph hybrid retrieval with Weaviate, Meilisearch, Typesense, and OpenSearch on WANDS and Amazon ESCI datasets.',
    url: `${siteUrl}/search_benchmark`,
    mainEntity: {
      '@type': 'Dataset',
      name: 'Brinicle Hybrid Search Benchmark Results',
      description: 'Performance benchmarks comparing Brinicle hybrid search with other search systems across WANDS and Amazon ESCI product search datasets.',
      keywords: 'hybrid search benchmark, product search retrieval, HNSW, WANDS, Amazon ESCI, Weaviate, Meilisearch, Typesense, OpenSearch',
      creator: {
        '@type': 'Organization',
        name: 'Bicardinal',
        url: 'https://bicardinal.com',
      },
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Search Benchmark', item: `${siteUrl}/search_benchmark` },
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
            <div className="container space-y-16 max-w-4xl mx-auto">

              {/* Hero */}
              <div className="flex items-center justify-center pb-10 w-full flex-col">
                <h1 className="mb-4 font-bold text-3xl text-primary tracking-tight md:text-4xl lg:text-5xl">
                  Hybrid Search Benchmark
                </h1>
                <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-center">
                  Single-graph hybrid retrieval for product search: evaluating Brinicle against Weaviate, Meilisearch, Typesense, and OpenSearch
                </p>
              </div>

              {/* ==================== ABSTRACT ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Abstract</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  Hybrid search is commonly implemented by combining lexical retrieval over an inverted index with semantic retrieval over a vector index, followed by score fusion or reranking. This paper studies an alternative formulation: representing lexical and semantic product-search signals inside a single HNSW graph. Brinicle encodes product-title tokens and dense title embeddings into one searchable representation. A custom distance function combines symbolic title matching and vector similarity during graph traversal, allowing lexical, semantic, and hybrid retrieval behavior to be expressed through the same graph structure. We evaluate this approach on WANDS and US-filtered Amazon ESCI using title-based hybrid product retrieval. Brinicle is compared with Weaviate, Meilisearch, Typesense, and OpenSearch under shared resource limits and the same precomputed embedding model. Across both datasets, Brinicle achieves competitive retrieval quality while reducing search memory usage and P99 latency relative to the compared systems. These results indicate that, for title-based product retrieval, hybrid search can be modeled as a single-graph retrieval problem rather than as post-hoc fusion over separate lexical and vector retrieval structures.
                </p>
              </section>

              {/* ==================== 1. INTRODUCTION ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    Hybrid retrieval is commonly implemented as a coordination problem between two search systems. A lexical index retrieves documents through exact or near-exact term matching, while a vector index retrieves documents through dense semantic similarity. The final ranking is then produced by score fusion, reranking, or another combination strategy.
                  </p>
                  <p>
                    This architecture has become a practical default for modern search applications. Lexical retrieval preserves exact terms, identifiers, numbers, and product-specific fragments. Vector retrieval improves tolerance to vocabulary mismatch and natural-language variation. Used together, they often provide better retrieval behavior than either method alone.
                  </p>
                  <p>
                    The architectural cost is that hybrid retrieval usually requires multiple retrieval structures. A system may need to store and operate an inverted index, a vector index, and a fusion layer with its own scoring assumptions. This increases memory usage, tuning surface area, and operational complexity.
                  </p>
                  <p>
                    This paper studies a different formulation of hybrid retrieval: representing lexical and semantic signals inside a single HNSW graph.
                  </p>
                </div>

                {/* 1.1 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">1.1 Hybrid Retrieval as a Graph-Distance Problem</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle treats hybrid product retrieval as a distance-function problem over one encoded representation. Each item is encoded with symbolic title evidence and, in hybrid mode, a dense title embedding. Queries are encoded in the same representation family. Search is then performed through one HNSW graph using a custom distance function that combines title-token agreement and vector similarity during graph traversal.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The retrieval mode is controlled by the distance configuration. A lexical configuration emphasizes title-token matching. A vector configuration emphasizes embedding similarity. A hybrid configuration combines both signals inside the same graph search process. This differs from the common architecture in which lexical and vector retrieval produce separate candidate sets that are merged afterward. In Brinicle, candidate exploration itself is hybrid-aware because the graph traversal uses the combined distance.
                  </p>
                </div>

                {/* 1.2 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">1.2 Product Search as a Motivating Task</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Product retrieval is a useful setting for evaluating this idea because it requires both exactness and tolerance. A product query may contain short fragments that carry precise meaning:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>iphone 15 256gb</p>
                    <p>rtx 4060</p>
                    <p>sony wh-1000xm5</p>
                    <p>m2 macbook air</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    In these cases, numbers, model identifiers, and capacities are not incidental text. They are part of the user&rsquo;s intent. A semantically related result with the wrong model or capacity may be commercially incorrect.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    At the same time, product titles are often long and noisy. They may contain brands, colors, editions, years, bundle descriptions, packaging terms, seller formatting, and marketing phrases. Users rarely type the full title. A retrieval system therefore needs to tolerate partial queries and vocabulary mismatch without losing exact symbolic evidence. This makes product search a natural hybrid retrieval task. Lexical matching helps preserve exact constraints. Dense embeddings help recover semantically related titles when surface forms differ.
                  </p>
                </div>

                {/* 1.3 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">1.3 Brinicle&rsquo;s Approach</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle encodes product-title tokens and dense embeddings into a single HNSW-searchable representation. The graph is built over this representation, and a custom scorer defines how the symbolic and semantic components contribute to distance.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    At a high level, the method consists of three parts:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>encoded item representation</p>
                    <p>+ single HNSW graph</p>
                    <p>+ hybrid-aware distance function</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The encoded representation stores title-token evidence and, when enabled, a dense vector. The HNSW graph provides approximate nearest-neighbor traversal. The distance function determines whether the search behaves lexically, semantically, or as a hybrid of both.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    This paper focuses on title-based hybrid retrieval. The evaluated configuration uses product titles and precomputed title embeddings for both documents and queries. Brinicle&rsquo;s broader item-search representation can include structured fields such as category, subcategory, and attributes, but the benchmark isolates the title + vector retrieval setting.
                  </p>
                </div>

                {/* 1.4 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">1.4 Evaluation Overview</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    We evaluate Brinicle on WANDS and US-filtered Amazon ESCI, comparing it with Weaviate, Meilisearch, Typesense, and OpenSearch. All systems are tested under shared CPU and memory limits using the same precomputed embedding model.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The evaluation reports ranking quality, search latency, throughput, memory usage, and build cost. The main result is a system-level trade-off: Brinicle achieves competitive retrieval quality while reducing search memory usage and P99 latency in the tested setup. The results support the architectural claim that hybrid product retrieval can be expressed through one graph and one distance function, rather than requiring post-hoc fusion over separate lexical and vector retrieval structures.
                  </p>
                </div>

                {/* 1.5 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">1.5 Contributions</h3>
                  <p className="text-base md:text-lg leading-relaxed">This paper makes four contributions.</p>
                  <ol className="list-decimal list-inside space-y-3 ml-4 text-base md:text-lg leading-relaxed">
                    <li>
                      It presents a single-graph formulation for hybrid product retrieval, where lexical and semantic evidence are represented inside one HNSW-searchable object.
                    </li>
                    <li>
                      It describes Brinicle&rsquo;s encoded item representation and hybrid-aware distance function, including symbolic title matching, dense-vector similarity, and the alpha mechanism used to control semantic bias.
                    </li>
                    <li>
                      It evaluates the approach on two product-search benchmarks against four established hybrid search systems under shared resource limits.
                    </li>
                    <li>
                      It reports the resulting trade-off between retrieval quality, memory usage, and search latency, showing that a single-graph design can provide competitive hybrid retrieval behavior with a smaller search-time resource footprint.
                    </li>
                  </ol>
                </div>
              </section>

              {/* ==================== 2. ONE-GRAPH HYBRID RETRIEVAL ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">2. One-Graph Hybrid Retrieval</h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    Hybrid retrieval is often described as a fusion problem: lexical retrieval produces one ranked list, semantic retrieval produces another, and a combination layer merges the two into a final ranking. Brinicle uses a different formulation. It treats hybrid retrieval as graph traversal over a representation that contains both symbolic and semantic evidence.
                  </p>
                  <p>
                    In this formulation, each item is encoded into one HNSW-searchable object. The object contains lexical title evidence and, in hybrid mode, a dense embedding. The HNSW graph is built over these encoded objects, and retrieval is controlled by a distance function that can read and combine the different regions of the representation.
                  </p>
                  <p>
                    At a high level, the retrieval pipeline is: 1. document title + optional dense embedding 2. encoded item representation 3. single HNSW graph 4. hybrid-aware distance function 5. ranked results. The key design choice is that lexical and semantic evidence participate in the same graph traversal. Candidate exploration is therefore influenced by the combined distance, rather than by a post-processing step over independently retrieved lexical and vector candidates.
                  </p>
                </div>

                {/* 2.1 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">2.1 Retrieval as Distance over Structured Representations</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle represents each item as a structured numeric object rather than as an ordinary dense vector alone. The representation contains enough information for the distance function to interpret different components separately.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    For title-based hybrid retrieval, the relevant components are:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>title-token evidence</p>
                    <p>+ dense title embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The query is encoded in the same representation family:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>query-token evidence</p>
                    <p>+ dense query embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The distance function then compares the query and document through both symbolic and semantic components. Title-token overlap contributes lexical evidence. Vector similarity contributes semantic evidence. The final distance is a weighted combination of these signals.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    This makes the HNSW graph a retrieval structure over hybrid-search objects. The graph organizes items according to the distance function used during construction, and the same family of distance functions is used during search.
                  </p>
                </div>

                {/* 2.2 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">2.2 Unified Candidate Exploration</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    In a two-index hybrid system, candidate generation is usually split across retrieval structures. A lexical index explores term-based candidates, while a vector index explores embedding-based candidates. Fusion happens after those candidate sets have already been produced. Brinicle moves the hybrid decision earlier. Since graph traversal uses a distance function that includes both title-token matching and vector similarity, lexical and semantic evidence affect candidate exploration directly. This changes the role of the hybrid scorer. It is not only a final ranking function. It also helps define local neighborhoods in the graph and influences which candidates are reached during approximate search. The result is a single candidate-exploration structure: 1. encoded query 2. HNSW traversal using hybrid distance 3. candidate set 4. ranked results.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    This is the central architectural distinction. Hybrid behavior is part of the graph-search process itself.
                  </p>
                </div>

                {/* 2.3 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">2.3 Retrieval Modes as Distance Configurations</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle&rsquo;s retrieval modes are expressed through distance configuration. The same encoded representation can support lexical, vector, or hybrid retrieval by changing the active components and their weights:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border bg-card space-y-2">
                      <h4 className="font-semibold text-foreground">Lexical Retrieval</h4>
                      <p className="text-sm text-muted-foreground">Title distance active</p>
                      <p className="text-sm text-muted-foreground">Vector distance inactive</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card space-y-2">
                      <h4 className="font-semibold text-foreground">Vector Retrieval</h4>
                      <p className="text-sm text-muted-foreground">Vector distance active</p>
                      <p className="text-sm text-muted-foreground">Title distance inactive</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card space-y-2">
                      <h4 className="font-semibold text-foreground">Hybrid Retrieval</h4>
                      <p className="text-sm text-muted-foreground">Title distance active</p>
                      <p className="text-sm text-muted-foreground">Vector distance active</p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This gives the system a single conceptual model:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>same representation family</p>
                    <p>same graph structure</p>
                    <p>different distance configurations</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    In lexical mode, retrieval is driven by symbolic title evidence. In vector mode, retrieval is driven by embedding similarity. In hybrid mode, both signals contribute to the distance used during graph traversal. The benchmark in this paper focuses on the hybrid configuration, where product titles and title embeddings are both active.
                  </p>
                </div>

                {/* 2.4 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">2.4 Product-Title Hybrid Retrieval</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Product titles provide a useful test case for one-graph hybrid retrieval because they combine short exact identifiers with longer noisy descriptions. A title may contain model numbers, capacities, color names, brand names, technical variants, and marketing text. Some tokens are highly specific and must be matched carefully. Other parts of the title provide broader semantic context.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle&rsquo;s representation preserves title-token evidence explicitly while also attaching dense semantic vectors. This allows the distance function to reward exact symbolic matches and semantic proximity within the same graph search. For example, a query such as &ldquo;iphone 15 256gb&rdquo; benefits from exact matching on <code className="bg-muted px-1 rounded">iphone</code>, <code className="bg-muted px-1 rounded">15</code>, and <code className="bg-muted px-1 rounded">256gb</code>, while vector similarity can still help when relevant product titles use different surrounding language.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The same principle applies to product queries involving model identifiers, abbreviated names, or partial descriptions. The graph does not need to choose between symbolic and semantic retrieval as separate execution paths. Both signals are available to the distance function.
                  </p>
                </div>

                {/* 2.5 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">2.5 Summary</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    One-graph hybrid retrieval can be summarized as follows:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-3">
                    <div>
                      <p className="font-semibold text-foreground">encoded item =</p>
                      <p className="ml-4">lexical title evidence</p>
                      <p className="ml-4">+ optional dense vector</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">retrieval structure =</p>
                      <p className="ml-4">one HNSW graph over encoded items</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">retrieval behavior =</p>
                      <p className="ml-4">distance configuration over lexical and vector components</p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This formulation makes hybrid product search a graph-distance problem. The next section describes how Brinicle encodes items and queries so that the distance function can compare symbolic and semantic evidence inside one representation.
                  </p>
                </div>
              </section>

              {/* ==================== 3. ENCODING ITEMS AND QUERIES ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">3. Encoding Items and Queries</h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    One-graph hybrid retrieval requires documents and queries to be represented in a form that can be compared by a single distance function. Brinicle uses a structured numeric representation for this purpose. The representation is compact enough to be indexed by HNSW, while preserving separate regions for lexical, structured, and semantic evidence.
                  </p>
                  <p>
                    In the benchmarked configuration, each document is represented by its product title and a dense embedding of that title. Each query is represented by query text and a dense query embedding. Both are encoded into the same representation family, allowing the distance function to compare symbolic and semantic evidence during graph traversal.
                  </p>
                </div>

                {/* 3.1 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">3.1 Encoded Object Layout</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Each encoded object begins with a fixed-size header followed by a variable-length payload. The header stores metadata needed by the distance function:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>[version, title_count, attr_pair_count, category_id, subcategory_id, vector_dim, payload...]</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The payload stores the searchable content:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>title token ids</p>
                    <p>+ optional attribute key/value ids</p>
                    <p>+ optional dense vector</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The header allows the scorer to parse the representation without external metadata. It can determine how many title tokens are present, whether structured fields exist, whether a dense vector is attached, and where each region begins.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    For title-based hybrid retrieval, the active regions are:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>title token ids</p>
                    <p>+ dense title embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This layout keeps the representation numeric while preserving internal structure. The scorer can interpret title evidence and vector evidence separately instead of treating the object as an opaque dense vector.
                  </p>
                </div>

                {/* 3.2 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">3.2 Title-Token Encoding</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Product titles are converted into sorted token identifiers. The title encoding pipeline is: 1. title text 2. normalization 3. isolated tokenization 4. token-id extraction 5. special-token filtering 6. term-frequency packing 7. sorted title-token representation.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The tokenizer preserves short product-specific fragments such as numbers, model names, and compact identifiers. These fragments are important in product retrieval because small textual differences can change the target item. Examples include:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>4060 &nbsp;&nbsp; 256gb &nbsp;&nbsp; 13 inch &nbsp;&nbsp; a54 &nbsp;&nbsp; m2 &nbsp;&nbsp; wh-1000xm5</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    Dense embeddings can place related products near each other, but exact fragments still need to remain available to the scorer. Brinicle therefore stores symbolic title evidence explicitly as part of the indexed representation.
                  </p>
                </div>

                {/* 3.3 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">3.3 Term-Frequency Packing</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Title tokens include a small saturated term-frequency signal. Conceptually, each stored title token combines a token id with a compact frequency component:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>packed_title_token = token_id + small_tf_component</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The frequency component allows repeated title terms to contribute additional evidence without making repetition dominate the score. This is useful for product titles, where repeated words may reflect emphasis, formatting, or seller-side noise rather than true relevance. The term-frequency signal is intentionally bounded. A repeated token can matter slightly more than a single occurrence, but excessive repetition is saturated by the scorer.
                  </p>
                </div>

                {/* 3.4 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">3.4 Dense Vector Attachment</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    In hybrid mode, Brinicle appends a dense embedding to the lexical representation. The benchmark uses title embeddings for documents and query embeddings for queries.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    A document is encoded as:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>header + title-token representation + dense title embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    A query is encoded as:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>header + query-token representation + dense query embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The vector region is parsed using the <code className="bg-muted px-1 rounded">vector_dim</code> value stored in the header. This allows the same distance function to combine token-based title matching with vector similarity. The resulting object is still a single HNSW-searchable representation, but the scorer can evaluate its regions separately.
                  </p>
                </div>

                {/* 3.5 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">3.5 Optional Structured Fields</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle&rsquo;s general item representation can also encode structured fields:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>category</p>
                    <p>subcategory</p>
                    <p>attributes</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    Category and subcategory are stored as stable identifiers. Attributes are stored as sorted key/value id pairs:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>[key_id_1, value_id_1, key_id_2, value_id_2, ...]</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This allows structured evidence to participate in the same distance function as title tokens and dense vectors. For example, a product item may include title evidence, category identity, and attribute matches inside one encoded object. The experiments in this paper use the title + vector configuration, but the same representation layout supports richer item-search configurations.
                  </p>
                </div>

                {/* 3.6 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">3.6 Shared Representation Family</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Documents and queries are encoded into the same representation family. This is what allows HNSW traversal to operate over hybrid-search objects directly.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    A document may contain:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>product-title tokens + product-title embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    A query may contain:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>query tokens + query embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The distance function compares the two encoded objects by reading their corresponding regions:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>title-token agreement</p>
                    <p>+ optional structured-field agreement</p>
                    <p>+ vector similarity</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This shared representation is central to the one-graph design. The graph stores encoded items, and the query enters the graph as a comparable encoded object.
                  </p>
                </div>

                {/* 3.7 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">3.7 Encoding Summary</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle&rsquo;s item/query representation can be summarized as:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>encoded object =</p>
                    <p>&nbsp;&nbsp;header</p>
                    <p>&nbsp;&nbsp;+ lexical title evidence</p>
                    <p>&nbsp;&nbsp;+ optional structured evidence</p>
                    <p>&nbsp;&nbsp;+ optional dense vector</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The representation is numeric, but not unstructured. Its internal layout allows the distance function to combine symbolic and semantic evidence during graph traversal. The next section defines the distance function used to compare these encoded objects.
                  </p>
                </div>
              </section>

              {/* ==================== 4. DISTANCE FUNCTION ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">4. Distance Function</h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    Brinicle&rsquo;s encoded representation becomes searchable through a custom distance function. The distance function reads the structured regions of the encoded query and document, computes component-wise distances, and combines them into a single value used by HNSW during graph construction and search.
                  </p>
                  <p>
                    For the general item-search representation, the distance has the form:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>D(q, d) =</p>
                    <p>&nbsp;&nbsp;w_title      &middot; D_title(q, d)</p>
                    <p>&nbsp;&nbsp;+ w_attr     &middot; D_attr(q, d)</p>
                    <p>&nbsp;&nbsp;+ w_category &middot; D_category(q, d)</p>
                    <p>&nbsp;&nbsp;+ w_subcat   &middot; D_subcat(q, d)</p>
                    <p>&nbsp;&nbsp;+ w_vector   &middot; D_vector(q, d)</p>
                  </div>
                  <p>
                    where <code className="bg-muted px-1 rounded">q</code> is the encoded query, <code className="bg-muted px-1 rounded">d</code> is the encoded document, and each component measures one region of the representation. The benchmarked hybrid configuration uses the title and vector components:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>D(q, d) = w_title &middot; D_title(q, d) + w_vector &middot; D_vector(q, d)</p>
                  </div>
                  <p>
                    Structured-field components are part of the broader scorer, but the main experiments isolate title-based hybrid retrieval.
                  </p>
                </div>

                {/* 4.1 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.1 Title Distance</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The title component measures symbolic agreement between query tokens and document-title tokens. Product queries are usually shorter than product titles, so the title scorer uses an asymmetric overlap measure. Brinicle uses a Tversky-style similarity:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>S_title(q, d) = matched / (matched + &alpha;_title &middot; only_query + &beta;_title &middot; extra_document)</p>
                    <p>D_title(q, d) = 1 - S_title(q, d)</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    Here:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>matched        = weighted title-token matches</p>
                    <p>only_query     = query tokens missing from the document title</p>
                    <p>extra_document = document-title tokens not present in the query</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The parameters <code className="bg-muted px-1 rounded">&alpha;_title</code> and <code className="bg-muted px-1 rounded">&beta;_title</code> control the relative cost of missing query tokens and extra document tokens. This is useful for product retrieval because a relevant product title may contain all query terms plus additional descriptive text. For example, query &ldquo;iphone 15 256gb&rdquo;, and document title &ldquo;Apple iPhone 15 256GB Blue Unlocked Smartphone 2023&rdquo;. The extra document terms provide context, but missing query terms usually represent a stronger mismatch. The asymmetric title distance reflects this behavior.
                  </p>
                </div>

                {/* 4.2 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.2 Term-Frequency Saturation</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Title-token matches use the packed term-frequency signal described in Section 3. Repeated terms are passed through a saturation function before contributing to the title score:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>tf_sat(tf) = (tf &middot; (k1 + 1)) / (tf + k1)</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The saturation limits the effect of repeated title terms. A repeated token can increase the contribution of a match, but repeated words do not scale linearly without bound. This gives the title component a controlled lexical signal. Token match is positive evidence, repeated token is slightly stronger evidence, and excess repetition is saturated contribution.
                  </p>
                </div>

                {/* 4.3 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.3 Build-Time and Search-Time Title Configuration</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle can use different title-distance settings during graph construction and query-time search.
                  </p>
                  <BenchmarkTable
                    title="Title Distance Configuration by Phase"
                    headers={['Phase', '&alpha;_title', '&beta;_title', 'Behavior']}
                    data={[
                      { Phase: 'Build', '&alpha;_title': 1.0, '&beta;_title': 1.0, Behavior: 'Symmetric overlap' },
                      { Phase: 'Search', '&alpha;_title': 1.0, '&beta;_title': 0.06, Behavior: 'Stronger penalty for missing query tokens' },
                    ]}
                  />
                  <p className="text-base md:text-lg leading-relaxed">
                    The build-time configuration shapes graph neighborhoods using balanced title overlap. The search-time configuration gives more weight to query coverage, which is appropriate for short product queries matched against longer product titles.
                  </p>
                </div>

                {/* 4.4 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.4 Vector Distance</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The vector component measures semantic similarity between the query embedding and the document embedding. Brinicle uses scaled cosine distance:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>D_vector(q, d) = 0.5 &middot; (1 - cos(q, d))</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The scaling maps cosine distance into a range compatible with the lexical distance components. Since cosine similarity lies in [-1, 1], the unscaled expression 1 - cos(q, d) lies in [0, 2]; multiplying by 0.5 maps it to [0, 1]. When vectors are normalized, cosine similarity can be computed through a dot product. The distance function can also use the general cosine path when normalization is not assumed.
                  </p>
                </div>

                {/* 4.5 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.5 Structured-Field Distances</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The general Brinicle scorer can also compare structured fields. Category and subcategory are treated as identifier matches. Attribute fields are treated as sorted key/value pairs.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    For category-like identifiers, the distance is direct:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>D_id(a, b) =</p>
                    <p>&nbsp;&nbsp;0                if a or b is unknown</p>
                    <p>&nbsp;&nbsp;0                if a = b</p>
                    <p>&nbsp;&nbsp;field_penalty    otherwise</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    For attributes, the scorer compares matching keys and evaluates whether their values agree:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>same key + same value       &rarr; no penalty</p>
                    <p>same key + different value  &rarr; mismatch penalty</p>
                    <p>missing field information   &rarr; neutral or soft contribution</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    These structured components allow category, subcategory, and attribute evidence to participate in the same distance function as title tokens and dense vectors. In the experiments reported in this paper, the active retrieval configuration uses title and vector evidence.
                  </p>
                </div>

                {/* 4.6 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.6 Hybrid Weighting</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The general distance function is controlled through component weights. In title-based hybrid retrieval, the active weights are <code className="bg-muted px-1 rounded">w_title</code> and <code className="bg-muted px-1 rounded">w_vector</code>.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    A lexical configuration sets the vector contribution to zero:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>w_title &gt; 0, w_vector = 0</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    A vector configuration sets the title contribution to zero:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>w_title = 0, w_vector &gt; 0</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    A hybrid configuration activates both:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>w_title &gt; 0, w_vector &gt; 0</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This makes retrieval behavior a property of the distance configuration. The same encoded representation can be searched with different component weights depending on the desired retrieval mode.
                  </p>
                </div>

                {/* 4.7 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.7 Brinicle Alpha</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle uses an alpha parameter to control the balance between semantic distance and lexical correction. For 0 &lt; p &lt; 1, alpha p is converted into:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>w_vector = 1</p>
                    <p>w_lexical = (1 - p) / p</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The vector component keeps full weight, while the lexical components are scaled by w_lexical. At the boundaries:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>p = 1 &rarr; vector retrieval</p>
                    <p>p = 0 &rarr; lexical retrieval</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    For example, when p = 0.90:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>w_lexical = (1 - 0.90) / 0.90 = 0.1111</p>
                    <p>If the base title weight is 0.45, the effective title weight becomes:</p>
                    <p>0.45 &middot; 0.1111 = 0.0500</p>
                    <p>while the vector weight remains: w_vector = 1.0</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This parameterization treats dense-vector distance as the primary semantic geometry and uses lexical evidence as a correction term. Lower alpha values increase the strength of lexical correction. Higher alpha values make retrieval more vector-oriented.
                  </p>
                </div>

                {/* 4.8 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.8 Alpha and Graph Construction</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    In Brinicle, the distance function is used during graph construction as well as query-time search. Therefore, the selected hybrid configuration affects both neighborhood formation and query traversal.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The build process uses the configured distance function to decide how items connect inside the HNSW graph. A more lexical configuration creates neighborhoods influenced more strongly by title-token overlap. A more semantic configuration creates neighborhoods influenced more strongly by vector similarity.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The same principle applies during search: the query traverses the graph using the configured distance function, and candidates are ranked according to the resulting distances. This makes alpha part of the index configuration. In the benchmark, Brinicle indexes are built with the selected alpha value for each dataset.
                  </p>
                </div>

                {/* 4.9 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">4.9 Distance-Function Summary</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle&rsquo;s distance function combines interpretable regions of the encoded representation:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>title tokens        &rarr; Tversky-style symbolic distance</p>
                    <p>dense vector        &rarr; scaled cosine distance</p>
                    <p>structured fields   &rarr; identifier and key/value penalties</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    For title-based hybrid retrieval, the main distance is:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>D(q, d) = w_title &middot; D_title(q, d) + w_vector &middot; D_vector(q, d)</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This distance is used by HNSW for graph construction and search, making hybrid behavior part of candidate exploration rather than a separate fusion stage.
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-2">
                    <div>
                      <p className="font-semibold text-foreground">encoded item:</p>
                      <p>&nbsp;&nbsp;title tokens + optional structured fields + optional dense vector</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">distance function:</p>
                      <p>&nbsp;&nbsp;title Tversky distance + optional structured penalties + scaled cosine vector distance</p>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">retrieval behavior:</p>
                      <p>&nbsp;&nbsp;lexical, vector, or hybrid depending on weights</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ==================== 5. EXPERIMENTAL SETUP ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">5. Experimental Setup</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  The experiments evaluate title-based hybrid product retrieval. Each engine receives a product query and returns a ranked list of product identifiers from a fixed corpus. Documents are indexed using product titles and precomputed dense title embeddings. Queries are represented using query text and precomputed dense query embeddings. The benchmark compares Brinicle with four existing search systems under the same host environment, container resource limits, embedding model, indexed field, and top-k retrieval setting.
                </p>

                {/* 5.1 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.1 Retrieval Task</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    For each query, the engine receives:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>query text + query embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The corpus contains documents represented as:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>product title + product title embedding</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    Each engine returns the top K product identifiers. The returned identifiers are compared against the relevance judgments provided by the dataset. All experiments use top_k = 100. Metrics are reported at K = 1, 5, 10, 20, 50, 100.
                  </p>
                </div>

                {/* 5.2 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.2 Datasets</h3>
                  <BenchmarkTable
                    title="Dataset Configuration"
                    headers={['Dataset', 'Documents', 'Queries', 'Tuning Queries', 'Evaluation Queries', 'Indexed Field']}
                    data={[
                      { Dataset: 'WANDS', Documents: '42,994', Queries: '450', 'Tuning Queries': '30', 'Evaluation Queries': '420', 'Indexed Field': 'Title' },
                      { Dataset: 'Amazon ESCI, US locale', Documents: '1,215,854', Queries: '20,458', 'Tuning Queries': '2,000', 'Evaluation Queries': '18,458', 'Indexed Field': 'Title' },
                    ]}
                    note="Both datasets are evaluated using exact-match relevance only. For Amazon ESCI, only products labeled E are treated as relevant. S, C, and I labels are treated as non-relevant."
                  />
                </div>

                {/* 5.3 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.3 Compared Systems</h3>
                  <BenchmarkTable
                    title="Search Systems"
                    headers={['System', 'Retrieval Configuration']}
                    data={[
                      { System: 'Brinicle', 'Retrieval Configuration': 'Single-graph hybrid retrieval' },
                      { System: 'Weaviate', 'Retrieval Configuration': 'Hybrid BM25/vector retrieval' },
                      { System: 'Meilisearch', 'Retrieval Configuration': 'Hybrid keyword/vector retrieval' },
                      { System: 'Typesense', 'Retrieval Configuration': 'Hybrid keyword/vector retrieval' },
                      { System: 'OpenSearch', 'Retrieval Configuration': 'Hybrid BM25/vector retrieval' },
                    ]}
                    note="All systems index the same product title field and use the same precomputed dense embeddings. Brinicle is evaluated through its server adapter."
                  />
                </div>

                {/* 5.4 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.4 Embedding Model</h3>
                  <div className="space-y-2 text-base">
                    <p>Dense embeddings are generated using <code className="bg-muted px-1 rounded">nomic-ai/nomic-embed-text-v1.5</code>:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Document prefix: <code className="bg-muted px-1 rounded">search_document: {'{title}'}</code></li>
                      <li>Query prefix: <code className="bg-muted px-1 rounded">search_query: {'{query}'}</code></li>
                    </ul>
                    <p className="text-muted-foreground text-sm italic">Embeddings are computed before the benchmark runs. Search latency measurements therefore cover retrieval-engine behavior and do not include embedding generation.</p>
                  </div>
                </div>

                {/* 5.5 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.5 Indexed Fields</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    All engines index the product title as the lexical search field. For hybrid retrieval, each document also contains a dense vector field holding the precomputed title embedding.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The Brinicle configuration used in the benchmark activates title-token evidence and dense-vector evidence. Structured fields such as category, subcategory, and attributes are part of Brinicle&rsquo;s general item representation, but they are not active in this benchmark configuration.
                  </p>
                </div>

                {/* 5.6 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.6 Runtime Environment</h3>
                  <BenchmarkTable
                    title="Host Configuration"
                    headers={['Component', 'Value']}
                    data={[
                      { Component: 'Host OS', Value: 'Ubuntu 25.10' },
                      { Component: 'CPU', Value: 'Intel Core i7-13650HX' },
                      { Component: 'Host RAM', Value: '32 GiB' },
                      { Component: 'Storage', Value: 'NVMe SSD' },
                      { Component: 'Docker version', Value: '29.2.1' },
                      { Component: 'Docker storage driver', Value: 'overlay2' },
                    ]}
                  />
                  <BenchmarkTable
                    title="Container Resource Limits"
                    headers={['Resource', 'Limit']}
                    data={[
                      { Resource: 'CPU cores', Limit: '16' },
                      { Resource: 'RAM', Limit: '16 GiB' },
                    ]}
                    note="Only one engine container is active during each benchmark run."
                  />
                </div>

                {/* 5.7 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.7 Retrieval Parameters</h3>
                  <BenchmarkTable
                    title="HNSW and Brinicle Configuration"
                    headers={['Parameter', 'Value']}
                    data={[
                      { Parameter: 'M', Value: '8' },
                      { Parameter: 'ef_construction', Value: '512' },
                      { Parameter: 'ef_search', Value: '1024' },
                      { Parameter: 'top_k', Value: '100' },
                      { Parameter: 'Lexical dimension (Brinicle)', Value: '70' },
                    ]}
                    note="Lexical dimension specifies how many slots are available for storage. More space means less title truncation but more memory usage."
                  />
                </div>

                {/* 5.8 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.8 Hybrid Parameter Tuning</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Each system exposes its own parameter for controlling the lexical-semantic balance. The parameters are tuned separately for each engine and dataset using the held-out tuning queries.
                  </p>
                  <BenchmarkTable
                    title="Tuned Hybrid Parameters"
                    headers={['Dataset', 'Brinicle', 'Meilisearch', 'OpenSearch', 'Typesense', 'Weaviate']}
                    data={[
                      { Dataset: 'WANDS', Brinicle: 0.95, Meilisearch: 0.55, OpenSearch: 0.60, Typesense: 0.80, Weaviate: 0.70 },
                      { Dataset: 'ESCI', Brinicle: 0.90, Meilisearch: 0.40, OpenSearch: 0.40, Typesense: 0.20, Weaviate: 0.50 },
                    ]}
                    note="For Brinicle, the selected alpha is part of the index configuration because the distance function is used during graph construction."
                  />
                </div>

                {/* 5.9 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.9 Benchmark Procedure</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Each benchmark run has two phases. First, the engine builds or ingests the index. During this phase, the benchmark records build time and build memory. Second, the benchmark runs the evaluation queries. During this phase, the benchmark records returned product identifiers, per-query latency, throughput, and search memory.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The measured search outputs include:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>ranked product ids</p>
                    <p>per-query latency</p>
                    <p>total query time</p>
                    <p>container memory profile</p>
                  </div>
                </div>

                {/* 5.10 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.10 Memory Measurement</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Memory is measured separately for build and search. The benchmark records multiple memory counters, including:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>raw peak memory</p>
                    <p>working-set peak memory</p>
                    <p>anonymous memory</p>
                    <p>file-backed memory</p>
                    <p>kernel memory</p>
                    <p>slab memory</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    The main results report peak search memory. Additional memory counters are included in the appendix.
                  </p>
                </div>

                {/* 5.11 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">5.11 Evaluation Metrics</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The benchmark reports ranking metrics at K = 1, 5, 10, 20, 50, 100.
                  </p>
                  <BenchmarkTable
                    title="Relevance Metrics"
                    headers={['Metric', 'Description']}
                    data={[
                      { Metric: 'Hit@K', Description: 'Whether at least one relevant product appears in the top K' },
                      { Metric: 'Recall@K', Description: 'Fraction of relevant products retrieved in the top K' },
                      { Metric: 'nDCG@K', Description: 'Graded ranking quality in the top K' },
                      { Metric: 'MRR@K', Description: 'Reciprocal rank of the first relevant product' },
                    ]}
                  />
                  <BenchmarkTable
                    title="System Metrics"
                    headers={['Metric', 'Description']}
                    data={[
                      { Metric: 'Build time', Description: 'Time required to build or ingest the index' },
                      { Metric: 'Search latency', Description: 'Per-query retrieval latency' },
                      { Metric: 'QPS', Description: 'Queries processed per second' },
                      { Metric: 'Build memory', Description: 'Peak memory during index construction' },
                      { Metric: 'Search memory', Description: 'Peak memory during query execution' },
                    ]}
                    note="The main results focus on ranking quality, P99 latency, and peak search memory. Full metric tables are reported in the appendix."
                  />
                </div>
              </section>

              {/* ==================== 6. RESULTS ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">6. Results</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  This section reports the main retrieval and system results on WANDS and US-filtered Amazon ESCI. The main text focuses on exact-relevance retrieval quality, P99 search latency, and peak search memory. Full metric tables, throughput measurements, build-time measurements, and additional memory counters are reported in the appendix.
                </p>

                {/* 6.1 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">6.1 WANDS Results</h3>
                  <BenchmarkTable
                    title="Table 1. WANDS Main Results"
                    headers={['Engine', 'Hit@1', 'nDCG@10', 'Hit@100', 'P99 Latency', 'Peak Search Memory']}
                    data={[
                      { Engine: 'Brinicle', 'Hit@1': 0.4844, 'nDCG@10': 0.5851, 'Hit@100': 0.7444, 'P99 Latency': '0.516 ms', 'Peak Search Memory': '129 MB' },
                      { Engine: 'Meilisearch', 'Hit@1': 0.4844, 'nDCG@10': 0.5724, 'Hit@100': 0.7311, 'P99 Latency': '7.433 ms', 'Peak Search Memory': '239 MB' },
                      { Engine: 'OpenSearch', 'Hit@1': 0.4956, 'nDCG@10': 0.5855, 'Hit@100': 0.7467, 'P99 Latency': '1.480 ms', 'Peak Search Memory': '9,552 MB' },
                      { Engine: 'Typesense', 'Hit@1': 0.4844, 'nDCG@10': 0.5779, 'Hit@100': 0.7311, 'P99 Latency': '7.574 ms', 'Peak Search Memory': '1,016 MB' },
                      { Engine: 'Weaviate', 'Hit@1': 0.4622, 'nDCG@10': 0.5631, 'Hit@100': 0.7333, 'P99 Latency': '10.758 ms', 'Peak Search Memory': '597 MB' },
                    ]}
                    note="Relevance is evaluated using exact-match labels. Latency is reported as per-query P99 latency. Memory is reported as peak search memory."
                  />
                  <p className="text-base md:text-lg leading-relaxed">
                    On WANDS, OpenSearch has the highest Hit@1, nDCG@10, and Hit@100. Brinicle is close on all three relevance metrics, with the lowest P99 latency and the lowest peak search memory among the compared systems.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The WANDS results show a narrow relevance spread among the strongest systems. OpenSearch reaches 0.4956 Hit@1, while Brinicle, Meilisearch, and Typesense each reach 0.4844. At Hit@100, OpenSearch reaches 0.7467, while Brinicle reaches 0.7444.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The system measurements show a larger separation. Brinicle records 0.516 ms P99 latency and 129 MB peak search memory. The closest non-Brinicle P99 latency is OpenSearch at 1.480 ms, while the closest non-Brinicle search memory is Meilisearch at 239 MB.
                  </p>
                </div>

                {/* 6.2 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">6.2 ESCI Results</h3>
                  <BenchmarkTable
                    title="Table 2. ESCI Main Results"
                    headers={['Engine', 'Hit@1', 'nDCG@10', 'Hit@100', 'P99 Latency', 'Peak Search Memory']}
                    data={[
                      { Engine: 'Brinicle', 'Hit@1': 0.4280, 'nDCG@10': 0.3661, 'Hit@100': 0.8932, 'P99 Latency': '0.773 ms', 'Peak Search Memory': '1,731 MB' },
                      { Engine: 'Meilisearch', 'Hit@1': 0.4175, 'nDCG@10': 0.3566, 'Hit@100': 0.8862, 'P99 Latency': '19.768 ms', 'Peak Search Memory': '5,671 MB' },
                      { Engine: 'OpenSearch', 'Hit@1': 0.4226, 'nDCG@10': 0.3601, 'Hit@100': 0.9009, 'P99 Latency': '3.407 ms', 'Peak Search Memory': '11,716 MB' },
                      { Engine: 'Typesense', 'Hit@1': 0.4191, 'nDCG@10': 0.3525, 'Hit@100': 0.8793, 'P99 Latency': '12.160 ms', 'Peak Search Memory': '8,041 MB' },
                      { Engine: 'Weaviate', 'Hit@1': 0.4203, 'nDCG@10': 0.3588, 'Hit@100': 0.9054, 'P99 Latency': '9.483 ms', 'Peak Search Memory': '4,794 MB' },
                    ]}
                    note="Relevance is evaluated using exact labels only. Latency is reported as per-query P99 latency. Memory is reported as peak search memory."
                  />
                  <p className="text-base md:text-lg leading-relaxed">
                    On ESCI, Brinicle has the highest Hit@1 and nDCG@10. Weaviate has the highest Hit@100, followed by OpenSearch. This indicates a difference between early exact-match ranking and deeper top-k retrieval.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle records 0.4280 Hit@1 and 0.3661 nDCG@10. The strongest non-Brinicle Hit@1 is OpenSearch at 0.4226, and the strongest non-Brinicle nDCG@10 is also OpenSearch at 0.3601. At Hit@100, Weaviate reaches 0.9054, OpenSearch reaches 0.9009, and Brinicle reaches 0.8932.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The system measurements again show the largest differences in latency and memory. Brinicle records 0.773 ms P99 latency and 1,731 MB peak search memory. The closest non-Brinicle P99 latency is OpenSearch at 3.407 ms. The closest non-Brinicle peak search memory is Weaviate at 4,794 MB.
                  </p>
                </div>

                {/* 6.3 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">6.3 P99 Search Latency</h3>
                  <BenchmarkImage src="/blow/wands_p99_latency_bw.png" alt="P99 search latency on WANDS" title="Figure 1. P99 search latency on WANDS" />
                  <BenchmarkImage src="/blow/esci_p99_latency_bw.png" alt="P99 search latency on ESCI" title="Figure 2. P99 search latency on ESCI" />
                  <BenchmarkTable
                    title="Table 3. P99 Search Latency"
                    headers={['Dataset', 'Brinicle', 'Meilisearch', 'OpenSearch', 'Typesense', 'Weaviate']}
                    data={[
                      { Dataset: 'WANDS', Brinicle: '0.516 ms', Meilisearch: '7.433 ms', OpenSearch: '1.480 ms', Typesense: '7.574 ms', Weaviate: '10.758 ms' },
                      { Dataset: 'ESCI', Brinicle: '0.773 ms', Meilisearch: '19.768 ms', OpenSearch: '3.407 ms', Typesense: '12.160 ms', Weaviate: '9.483 ms' },
                    ]}
                  />
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle has the lowest measured P99 latency on both datasets. On WANDS, its P99 latency is 0.516 ms, compared with 1.480 ms for OpenSearch, the closest non-Brinicle system. On ESCI, its P99 latency is 0.773 ms, compared with 3.407 ms for OpenSearch.
                  </p>
                </div>

                {/* 6.4 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">6.4 Search Memory</h3>
                  <BenchmarkImage src="/blow/wands_search_memory_bw.png" alt="Peak search memory on WANDS" title="Figure 3. Peak search memory on WANDS" />
                  <BenchmarkImage src="/blow/esci_search_memory_bw.png" alt="Peak search memory on ESCI" title="Figure 4. Peak search memory on ESCI" />
                  <BenchmarkTable
                    title="Table 4. Peak Search Memory"
                    headers={['Dataset', 'Brinicle', 'Meilisearch', 'OpenSearch', 'Typesense', 'Weaviate']}
                    data={[
                      { Dataset: 'WANDS', Brinicle: '129 MB', Meilisearch: '239 MB', OpenSearch: '9,552 MB', Typesense: '1,016 MB', Weaviate: '597 MB' },
                      { Dataset: 'ESCI', Brinicle: '1,731 MB', Meilisearch: '5,671 MB', OpenSearch: '11,716 MB', Typesense: '8,041 MB', Weaviate: '4,794 MB' },
                    ]}
                  />
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle has the lowest measured search memory on both datasets. On WANDS, Brinicle uses 129 MB, followed by Meilisearch at 239 MB. On ESCI, Brinicle uses 1,731 MB, followed by Weaviate at 4,794 MB. The memory difference is larger on ESCI, where the corpus is substantially larger. In that setting, Brinicle&rsquo;s peak search memory is less than half of the closest non-Brinicle measurement.
                  </p>
                </div>

                {/* 6.5 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">6.5 Hit@K Curves</h3>
                  <BenchmarkImage src="/blow/wands_hit_curve_bw.png" alt="Hit@K curve on WANDS using exact relevance" title="Figure 5. Hit@K curve on WANDS" />
                  <BenchmarkImage src="/blow/esci_hit_curve_bw.png" alt="Hit@K curve on ESCI using exact relevance" title="Figure 6. Hit@K curve on ESCI" />
                  <p className="text-base md:text-lg leading-relaxed">
                    Figures 5 and 6 report Hit@K curves across K = 1, 5, 10, 20, 50, 100. On WANDS, OpenSearch is slightly ahead across the main reported relevance points, while Brinicle remains close. On ESCI, Brinicle leads at early ranking points reported in Table 2, while Weaviate and OpenSearch reach higher Hit@100. The full Hit@K, Recall@K, nDCG@K, and MRR@K tables are provided in the appendix.
                  </p>
                </div>

                {/* 6.6 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">6.6 Result Summary</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Across both datasets, the results show three main patterns.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    First, relevance is competitive across systems. On WANDS, OpenSearch has the strongest exact-relevance metrics among the reported values. On ESCI, Brinicle has the strongest Hit@1 and nDCG@10, while Weaviate has the strongest Hit@100.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Second, Brinicle has the lowest measured P99 search latency on both datasets.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Third, Brinicle has the lowest measured peak search memory on both datasets.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    These results support the single-graph formulation as a practical retrieval design for title-based hybrid product search: lexical and semantic evidence can be combined during graph traversal while maintaining competitive exact-relevance quality and a smaller search-time resource footprint.
                  </p>
                </div>
              </section>

              {/* ==================== 7. DISCUSSION ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">7. Discussion</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  The results show that hybrid product retrieval can be implemented through a single HNSW graph while preserving competitive exact-relevance quality. Brinicle&rsquo;s main distinction is not a single isolated relevance score, but the combination of retrieval quality, low search memory, and low search latency under the tested configuration. This section discusses the implications of the benchmark results for hybrid retrieval design, product-title search, and deployment trade-offs.
                </p>

                {/* 7.1 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">7.1 Interpreting the Retrieval Trade-Off</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The relevance results differ across datasets and ranking depths. On WANDS, OpenSearch has the strongest reported exact-relevance metrics. Brinicle remains close across the main relevance points, with a small difference in Hit@1, nDCG@10, and Hit@100.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    On ESCI, Brinicle has the strongest Hit@1 and nDCG@10, while Weaviate has the strongest Hit@100. This indicates that Brinicle performs strongly in early ranking, while other systems retrieve more exact matches at deeper top-k positions.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    This pattern is useful because it separates two retrieval behaviors:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>early ranking quality</p>
                    <p>deep candidate coverage</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    For product search, both behaviors can matter. Early ranking is important when results are shown directly to users. Deeper candidate coverage is important when the retrieval stage feeds reranking, recommendation, or downstream selection. The benchmark results therefore describe an operating profile rather than a single leaderboard. Brinicle&rsquo;s profile is strongest in search-time efficiency and early exact-match ranking on the larger ESCI benchmark, while other systems show advantages in specific relevance metrics and deeper retrieval settings.
                  </p>
                </div>

                {/* 7.2 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">7.2 Hybrid Retrieval Inside Graph Traversal</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The central architectural result is that lexical and semantic evidence can participate in the same graph traversal. In a conventional hybrid system, lexical and vector retrieval are usually performed through separate structures, and hybrid behavior is introduced through score fusion or reranking. Brinicle moves this combination into the distance function used by HNSW.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    This has two consequences. First, hybrid scoring affects candidate exploration, not only final ranking. The graph traversal is guided by a distance function that includes both symbolic title evidence and dense-vector similarity. Second, the retrieval system has a smaller structural surface. The benchmarked Brinicle configuration uses one encoded representation, one HNSW graph, and one hybrid-aware distance function for title-based hybrid retrieval.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    The results suggest that this design is sufficient to produce competitive retrieval behavior on the evaluated product-search tasks.
                  </p>
                </div>

                {/* 7.3 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">7.3 Early Ranking and Deeper Top-K Behavior</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The ESCI results show a clear distinction between early ranking and deeper top-k retrieval. Brinicle leads the reported early-ranking metrics:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>Hit@1</p>
                    <p>nDCG@10</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    Weaviate leads the reported deeper metric:
                  </p>
                  <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                    <p>Hit@100</p>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed">
                    This distinction is important for interpreting hybrid retrieval systems. A method can be strong at placing an exact result near the top while another method can be stronger at retrieving more exact results somewhere inside a larger candidate set. The appropriate retrieval profile depends on the application. A direct product-search interface benefits from strong early ranking. A multi-stage ranking system may prefer broader top-k coverage before reranking. In this benchmark, Brinicle&rsquo;s strongest relevance behavior appears in early exact-match ranking on ESCI, while its strongest system behavior appears consistently in latency and memory across both datasets.
                  </p>
                </div>

                {/* 7.4 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">7.4 Search-Time Resource Profile</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The memory and latency measurements show the clearest separation between Brinicle and the compared systems. Brinicle has the lowest measured peak search memory on both WANDS and ESCI. The difference is especially visible on ESCI, where Brinicle uses less than half the search memory of the closest non-Brinicle system. Brinicle also has the lowest measured P99 latency on both datasets. This result is consistent across the smaller WANDS corpus and the larger ESCI corpus. Together, these measurements show that the single-graph design changes the search-time resource profile of hybrid retrieval. The system does not maintain separate lexical and vector retrieval structures for the benchmarked hybrid task, and the measured search memory reflects that architectural choice.
                  </p>
                </div>

                {/* 7.5 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">7.5 Alpha as Index Configuration</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle&rsquo;s alpha affects graph construction as well as query-time search. This makes the hybrid parameter part of the index configuration rather than only a runtime fusion parameter. When the graph is built, the configured distance function influences neighborhood formation. A more semantic configuration creates graph neighborhoods shaped more strongly by vector similarity. A stronger lexical correction changes how symbolic title evidence contributes to those neighborhoods.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    This is different from hybrid systems where the lexical and vector indexes are built independently and the hybrid parameter only affects query-time score combination. In the benchmark, each Brinicle index is built using the tuned alpha selected for that dataset. This means the reported Brinicle results reflect both the encoded representation and the graph topology produced by the selected hybrid distance.
                  </p>
                </div>

                {/* 7.6 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">7.6 Deployment Implications</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The measured trade-off is relevant for deployments where search memory and latency are important constraints. A lower search-time memory footprint can reduce infrastructure cost, allow more indexes to run on the same machine, or leave more memory available for application logic. Lower latency can improve interactive search behavior and increase the headroom available for additional downstream processing.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed">
                    Brinicle&rsquo;s design is therefore most directly relevant to search systems where hybrid retrieval is needed but maintaining multiple retrieval structures is expensive. The benchmarked setting is title-based product retrieval, but the architectural pattern is broader: encode multiple retrieval signals into one comparable object, then use a distance function that combines those signals during graph traversal.
                  </p>
                </div>

                {/* 7.7 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">7.7 Discussion Summary</h3>
                  <p className="text-base md:text-lg leading-relaxed">
                    The results support three main observations. First, title-based hybrid product retrieval can be expressed through one HNSW graph and one hybrid-aware distance function. Second, Brinicle achieves competitive exact-relevance quality on both evaluated datasets, with stronger early-ranking results on ESCI and close relevance results on WANDS. Third, Brinicle shows a consistent search-time resource advantage in the reported measurements, with the lowest P99 latency and lowest peak search memory on both datasets. These observations support the paper&rsquo;s main claim: hybrid product retrieval can be modeled as a single-graph retrieval problem, with lexical and semantic evidence combined during graph traversal rather than through post-hoc fusion over separate retrieval structures.
                  </p>
                </div>
              </section>

              {/* ==================== 8. LIMITATIONS ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">8. Limitations</h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    This benchmark evaluates title-based hybrid product retrieval using precomputed embeddings and exact-match relevance labels. It does not measure multi-field ranking, faceted filtering, personalized retrieval, distributed deployment, or reranking pipelines. The results should therefore be interpreted as evidence for the tested title + vector retrieval setting, not as a complete evaluation of every product-search workload.
                  </p>
                  <p>
                    The compared systems were tuned through held-out queries under a shared benchmark configuration, but each engine has additional parameters and deployment modes that may change its behavior. Brinicle&rsquo;s alpha also affects graph construction, so changing the hybrid balance requires rebuilding the index. Future experiments should evaluate richer metadata, structured filters, additional datasets, and multi-stage retrieval pipelines.
                  </p>
                </div>
              </section>

              {/* ==================== 9. CONCLUSION ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">9. Conclusion</h2>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    This paper studied a single-graph formulation for hybrid product retrieval. Instead of combining separate lexical and vector retrieval results through post-hoc fusion, Brinicle encodes title-token evidence and dense embeddings into one HNSW-searchable representation. A custom distance function then combines symbolic and semantic evidence during graph construction and search.
                  </p>
                  <p>
                    The experiments on WANDS and US-filtered Amazon ESCI show that this approach achieves competitive exact-relevance quality under the tested title + vector configuration. Brinicle has the lowest measured P99 latency and peak search memory on both datasets, while relevance leadership varies by dataset and metric.
                  </p>
                  <p>
                    The main result is architectural: hybrid product retrieval can be modeled as graph traversal over a structured representation, rather than as coordination between separate retrieval structures. For workloads where exact product identifiers and semantic tolerance both matter, this opens a practical design space for lower-memory and lower-latency hybrid search.
                  </p>
                  <p>
                    Future work should evaluate the same approach with richer product metadata, structured filters, additional datasets, different embedding models, and multi-stage reranking pipelines.
                  </p>
                </div>
              </section>

              {/* ==================== APPENDIX A ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix A. Code, Data, and Citations</h2>
                <BenchmarkTable
                  title="Repositories and Datasets"
                  headers={['Resource', 'Repository']}
                  data={[
                    { Resource: 'Brinicle', Repository: 'github.com/bicardinal/brinicle' },
                    { Resource: 'Benchmark Harness', Repository: 'github.com/bicardinal/item_search_bench' },
                    { Resource: 'Amazon ESCI Dataset', Repository: 'github.com/amazon-science/esci-data' },
                    { Resource: 'WANDS Dataset', Repository: 'github.com/wayfair/WANDS' },
                  ]}
                />
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">WANDS Citation</h3>
                  <pre className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto whitespace-pre-wrap">{"@InProceedings{wands,\n  title = {WANDS: Dataset for Product Search Relevance Assessment},\n  author = {Chen, Yan and Liu, Shujian and Liu, Zheng and Sun, Weiyi and Baltrunas, Linas and Schroeder, Benjamin},\n  booktitle = {Proceedings of the 44th European Conference on Information Retrieval},\n  year = {2022},\n  numpages = {12}\n}"}</pre>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Amazon ESCI Citation</h3>
                  <pre className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto whitespace-pre-wrap">{"@article{reddy2022shopping,\n  title = {Shopping Queries Dataset: A Large-Scale {ESCI} Benchmark for Improving Product Search},\n  author = {Chandan K. Reddy and Llu\\'{i}s M\\'{a}rquez and Fran Valero and Nikhil Rao and Hugo Zaragoza and Sambaran Bandyopadhyay and Arnab Biswas and Anlu Xing and Karthik Subbian},\n  year = {2022},\n  eprint = {2206.06588},\n  archivePrefix = {arXiv}\n}"}</pre>
                </div>
              </section>

              {/* ==================== APPENDIX B ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix B. Benchmark Configuration</h2>
                <BenchmarkTable
                  title="B.1 Dataset Configuration"
                  headers={['Dataset', 'Documents', 'Queries', 'Tuning Queries', 'Evaluation Queries', 'Indexed Field']}
                  data={[
                    { Dataset: 'WANDS', Documents: '42,994', Queries: '450', 'Tuning Queries': '30', 'Evaluation Queries': '420', 'Indexed Field': 'Title' },
                    { Dataset: 'Amazon ESCI, US locale', Documents: '1,215,854', Queries: '20,458', 'Tuning Queries': '2,000', 'Evaluation Queries': '18,458', 'Indexed Field': 'Title' },
                  ]}
                />
                <BenchmarkTable
                  title="B.2 Shared Retrieval Configuration"
                  headers={['Parameter', 'Value']}
                  data={[
                    { Parameter: 'Indexed lexical field', Value: 'Title' },
                    { Parameter: 'Retrieval mode', Value: 'Hybrid title + vector' },
                    { Parameter: 'top_k', Value: '100' },
                    { Parameter: 'Reported K values', Value: '1, 5, 10, 20, 50, 100' },
                  ]}
                />
                <BenchmarkTable
                  title="B.3 Embedding Configuration"
                  headers={['Parameter', 'Value']}
                  data={[
                    { Parameter: 'Embedding model', Value: 'nomic-ai/nomic-embed-text-v1.5' },
                    { Parameter: 'Document prefix', Value: 'search_document: {title}' },
                    { Parameter: 'Query prefix', Value: 'search_query: {query}' },
                    { Parameter: 'Embedding timing', Value: 'Precomputed before benchmark' },
                  ]}
                  note="Search latency does not include embedding generation."
                />
                <BenchmarkTable
                  title="B.4 Runtime Environment"
                  headers={['Component', 'Value']}
                  data={[
                    { Component: 'Host OS', Value: 'Ubuntu 25.10' },
                    { Component: 'CPU', Value: 'Intel Core i7-13650HX' },
                    { Component: 'Host RAM', Value: '32 GiB' },
                    { Component: 'Storage', Value: 'NVMe SSD' },
                    { Component: 'Docker version', Value: '29.2.1' },
                    { Component: 'Docker storage driver', Value: 'overlay2' },
                  ]}
                />
                <BenchmarkTable
                  title="B.5 HNSW and Brinicle Configuration"
                  headers={['Parameter', 'Value']}
                  data={[
                    { Parameter: 'M', Value: '8' },
                    { Parameter: 'ef_construction', Value: '512' },
                    { Parameter: 'ef_search', Value: '1024' },
                    { Parameter: 'top_k', Value: '100' },
                    { Parameter: 'Lexical dimension (Brinicle)', Value: '70' },
                  ]}
                />
              </section>

              {/* ==================== APPENDIX C ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix C. Hybrid Parameter Tuning</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  Each engine&rsquo;s hybrid parameter is selected using held-out tuning queries and then applied to the evaluation split.
                </p>
                <BenchmarkTable
                  headers={['Dataset', 'Brinicle', 'Meilisearch', 'OpenSearch', 'Typesense', 'Weaviate']}
                  data={[
                    { Dataset: 'WANDS', Brinicle: 0.95, Meilisearch: 0.55, OpenSearch: 0.60, Typesense: 0.80, Weaviate: 0.70 },
                    { Dataset: 'ESCI', Brinicle: 0.90, Meilisearch: 0.40, OpenSearch: 0.40, Typesense: 0.20, Weaviate: 0.50 },
                  ]}
                  note="For Brinicle, the selected alpha is part of the index configuration because the distance function is used during graph construction."
                />
              </section>

              {/* ==================== APPENDIX D ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix D. Full Relevance Metrics</h2>
                <p className="text-base text-muted-foreground">All relevance metrics are computed using exact relevance only. Metrics reported at K = 1, 5, 10, 20, 50, 100.</p>

                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">D.1 WANDS Hit@K</h3>
                  <BenchmarkTable headers={['Engine', '@1', '@5', '@10', '@20', '@50', '@100']} data={[
                    { Engine: 'Brinicle', '@1': 0.4844, '@5': 0.5911, '@10': 0.6356, '@20': 0.6911, '@50': 0.7222, '@100': 0.7444 },
                    { Engine: 'Meilisearch', '@1': 0.4844, '@5': 0.5844, '@10': 0.6267, '@20': 0.6778, '@50': 0.7133, '@100': 0.7311 },
                    { Engine: 'OpenSearch', '@1': 0.4956, '@5': 0.6022, '@10': 0.6467, '@20': 0.6867, '@50': 0.7333, '@100': 0.7467 },
                    { Engine: 'Typesense', '@1': 0.4844, '@5': 0.5956, '@10': 0.6333, '@20': 0.6822, '@50': 0.7156, '@100': 0.7311 },
                    { Engine: 'Weaviate', '@1': 0.4622, '@5': 0.5778, '@10': 0.6356, '@20': 0.6733, '@50': 0.7089, '@100': 0.7333 },
                  ]} /></div>

                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">D.2 WANDS Recall@K</h3>
                  <BenchmarkTable headers={['Engine', '@1', '@5', '@10', '@20', '@50', '@100']} data={[
                    { Engine: 'Brinicle', '@1': 0.1238, '@5': 0.2074, '@10': 0.2637, '@20': 0.3545, '@50': 0.4949, '@100': 0.6122 },
                    { Engine: 'Meilisearch', '@1': 0.1250, '@5': 0.2054, '@10': 0.2576, '@20': 0.3395, '@50': 0.4630, '@100': 0.5730 },
                    { Engine: 'OpenSearch', '@1': 0.1271, '@5': 0.2112, '@10': 0.2701, '@20': 0.3549, '@50': 0.4870, '@100': 0.6008 },
                    { Engine: 'Typesense', '@1': 0.1223, '@5': 0.2107, '@10': 0.2653, '@20': 0.3488, '@50': 0.4720, '@100': 0.5803 },
                    { Engine: 'Weaviate', '@1': 0.1198, '@5': 0.1990, '@10': 0.2537, '@20': 0.3355, '@50': 0.4557, '@100': 0.5518 },
                  ]} /></div>

                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">D.3 WANDS nDCG@K</h3>
                  <BenchmarkTable headers={['Engine', '@1', '@5', '@10', '@20', '@50', '@100']} data={[
                    { Engine: 'Brinicle', '@1': 0.6124, '@5': 0.5910, '@10': 0.5851, '@20': 0.5827, '@50': 0.5804, '@100': 0.5937 },
                    { Engine: 'Meilisearch', '@1': 0.6124, '@5': 0.5812, '@10': 0.5724, '@20': 0.5659, '@50': 0.5560, '@100': 0.5642 },
                    { Engine: 'OpenSearch', '@1': 0.6264, '@5': 0.5925, '@10': 0.5855, '@20': 0.5799, '@50': 0.5731, '@100': 0.5838 },
                    { Engine: 'Typesense', '@1': 0.6124, '@5': 0.5869, '@10': 0.5779, '@20': 0.5724, '@50': 0.5620, '@100': 0.5707 },
                    { Engine: 'Weaviate', '@1': 0.5843, '@5': 0.5685, '@10': 0.5631, '@20': 0.5569, '@50': 0.5468, '@100': 0.5472 },
                  ]} /></div>

                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">D.4 WANDS MRR@K</h3>
                  <BenchmarkTable headers={['Engine', '@1', '@5', '@10', '@20', '@50', '@100']} data={[
                    { Engine: 'Brinicle', '@1': 0.4844, '@5': 0.5249, '@10': 0.5308, '@20': 0.5345, '@50': 0.5354, '@100': 0.5357 },
                    { Engine: 'Meilisearch', '@1': 0.4844, '@5': 0.5244, '@10': 0.5304, '@20': 0.5340, '@50': 0.5352, '@100': 0.5355 },
                    { Engine: 'OpenSearch', '@1': 0.4956, '@5': 0.5349, '@10': 0.5411, '@20': 0.5440, '@50': 0.5456, '@100': 0.5457 },
                    { Engine: 'Typesense', '@1': 0.4844, '@5': 0.5262, '@10': 0.5313, '@20': 0.5348, '@50': 0.5359, '@100': 0.5362 },
                    { Engine: 'Weaviate', '@1': 0.4622, '@5': 0.5094, '@10': 0.5172, '@20': 0.5199, '@50': 0.5211, '@100': 0.5215 },
                  ]} /></div>

                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">D.5 ESCI Hit@K</h3>
                  <BenchmarkTable headers={['Engine', '@1', '@5', '@10', '@20', '@50', '@100']} data={[
                    { Engine: 'Brinicle', '@1': 0.4280, '@5': 0.6631, '@10': 0.7444, '@20': 0.8068, '@50': 0.8634, '@100': 0.8932 },
                    { Engine: 'Meilisearch', '@1': 0.4175, '@5': 0.6438, '@10': 0.7243, '@20': 0.7876, '@50': 0.8506, '@100': 0.8862 },
                    { Engine: 'OpenSearch', '@1': 0.4226, '@5': 0.6600, '@10': 0.7416, '@20': 0.8046, '@50': 0.8653, '@100': 0.9009 },
                    { Engine: 'Typesense', '@1': 0.4191, '@5': 0.6493, '@10': 0.7244, '@20': 0.7875, '@50': 0.8475, '@100': 0.8793 },
                    { Engine: 'Weaviate', '@1': 0.4203, '@5': 0.6652, '@10': 0.7475, '@20': 0.8090, '@50': 0.8727, '@100': 0.9054 },
                  ]} /></div>

                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">D.6 ESCI Recall@K</h3>
                  <BenchmarkTable headers={['Engine', '@1', '@5', '@10', '@20', '@50', '@100']} data={[
                    { Engine: 'Brinicle', '@1': 0.0631, '@5': 0.1952, '@10': 0.2859, '@20': 0.3826, '@50': 0.4991, '@100': 0.5789 },
                    { Engine: 'Meilisearch', '@1': 0.0625, '@5': 0.1898, '@10': 0.2774, '@20': 0.3689, '@50': 0.4769, '@100': 0.5518 },
                    { Engine: 'OpenSearch', '@1': 0.0630, '@5': 0.1930, '@10': 0.2815, '@20': 0.3775, '@50': 0.4917, '@100': 0.5701 },
                    { Engine: 'Typesense', '@1': 0.0610, '@5': 0.1869, '@10': 0.2718, '@20': 0.3618, '@50': 0.4674, '@100': 0.5398 },
                    { Engine: 'Weaviate', '@1': 0.0628, '@5': 0.1919, '@10': 0.2809, '@20': 0.3775, '@50': 0.4944, '@100': 0.5760 },
                  ]} /></div>

                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">D.7 ESCI nDCG@K</h3>
                  <BenchmarkTable headers={['Engine', '@1', '@5', '@10', '@20', '@50', '@100']} data={[
                    { Engine: 'Brinicle', '@1': 0.4280, '@5': 0.3847, '@10': 0.3661, '@20': 0.3773, '@50': 0.4268, '@100': 0.4585 },
                    { Engine: 'Meilisearch', '@1': 0.4175, '@5': 0.3747, '@10': 0.3566, '@20': 0.3656, '@50': 0.4110, '@100': 0.4406 },
                    { Engine: 'OpenSearch', '@1': 0.4226, '@5': 0.3784, '@10': 0.3601, '@20': 0.3710, '@50': 0.4190, '@100': 0.4498 },
                    { Engine: 'Typesense', '@1': 0.4191, '@5': 0.3733, '@10': 0.3525, '@20': 0.3604, '@50': 0.4046, '@100': 0.4332 },
                    { Engine: 'Weaviate', '@1': 0.4203, '@5': 0.3772, '@10': 0.3588, '@20': 0.3702, '@50': 0.4196, '@100': 0.4516 },
                  ]} /></div>

                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">D.8 ESCI MRR@K</h3>
                  <BenchmarkTable headers={['Engine', '@1', '@5', '@10', '@20', '@50', '@100']} data={[
                    { Engine: 'Brinicle', '@1': 0.4280, '@5': 0.5176, '@10': 0.5285, '@20': 0.5329, '@50': 0.5348, '@100': 0.5352 },
                    { Engine: 'Meilisearch', '@1': 0.4175, '@5': 0.5037, '@10': 0.5146, '@20': 0.5190, '@50': 0.5211, '@100': 0.5216 },
                    { Engine: 'OpenSearch', '@1': 0.4226, '@5': 0.5124, '@10': 0.5234, '@20': 0.5279, '@50': 0.5299, '@100': 0.5304 },
                    { Engine: 'Typesense', '@1': 0.4191, '@5': 0.5067, '@10': 0.5169, '@20': 0.5213, '@50': 0.5233, '@100': 0.5238 },
                    { Engine: 'Weaviate', '@1': 0.4203, '@5': 0.5136, '@10': 0.5247, '@20': 0.5291, '@50': 0.5312, '@100': 0.5316 },
                  ]} /></div>
              </section>

              {/* ==================== APPENDIX E ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix E. Latency and Throughput</h2>
                <p className="text-base text-muted-foreground">Latency values are reported in milliseconds. Total query time is reported in seconds.</p>
                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">E.1 WANDS Latency and Throughput</h3>
                  <BenchmarkTable headers={['Engine', 'Avg ms', 'P50 ms', 'P95 ms', 'P99 ms', 'QPS', 'Total Query Time']} data={[
                    { Engine: 'Brinicle', 'Avg ms': 0.427, 'P50 ms': 0.428, 'P95 ms': 0.516, 'P99 ms': 0.516, QPS: 2357.6, 'Total Query Time': '0.192 s' },
                    { Engine: 'Meilisearch', 'Avg ms': 7.090, 'P50 ms': 7.093, 'P95 ms': 7.433, 'P99 ms': 7.433, QPS: 141.1, 'Total Query Time': '3.191 s' },
                    { Engine: 'OpenSearch', 'Avg ms': 1.083, 'P50 ms': 1.029, 'P95 ms': 1.480, 'P99 ms': 1.480, QPS: 926.8, 'Total Query Time': '0.487 s' },
                    { Engine: 'Typesense', 'Avg ms': 6.774, 'P50 ms': 6.696, 'P95 ms': 7.574, 'P99 ms': 7.574, QPS: 147.7, 'Total Query Time': '3.048 s' },
                    { Engine: 'Weaviate', 'Avg ms': 9.427, 'P50 ms': 9.565, 'P95 ms': 10.758, 'P99 ms': 10.758, QPS: 106.2, 'Total Query Time': '4.242 s' },
                  ]} /></div>
                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">E.2 ESCI Latency and Throughput</h3>
                  <BenchmarkTable headers={['Engine', 'Avg ms', 'P50 ms', 'P95 ms', 'P99 ms', 'QPS', 'Total Query Time']} data={[
                    { Engine: 'Brinicle', 'Avg ms': 0.556, 'P50 ms': 0.549, 'P95 ms': 0.692, 'P99 ms': 0.773, QPS: 1800.1, 'Total Query Time': '11.366 s' },
                    { Engine: 'Meilisearch', 'Avg ms': 15.057, 'P50 ms': 15.122, 'P95 ms': 17.408, 'P99 ms': 19.768, QPS: 66.4, 'Total Query Time': '308.043 s' },
                    { Engine: 'OpenSearch', 'Avg ms': 2.704, 'P50 ms': 2.671, 'P95 ms': 3.053, 'P99 ms': 3.407, QPS: 371.0, 'Total Query Time': '55.321 s' },
                    { Engine: 'Typesense', 'Avg ms': 9.334, 'P50 ms': 9.202, 'P95 ms': 10.379, 'P99 ms': 12.160, QPS: 107.1, 'Total Query Time': '190.950 s' },
                    { Engine: 'Weaviate', 'Avg ms': 8.597, 'P50 ms': 8.749, 'P95 ms': 9.283, 'P99 ms': 9.483, QPS: 116.3, 'Total Query Time': '175.882 s' },
                  ]} /></div>
              </section>

              {/* ==================== APPENDIX F ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix F. Search Memory</h2>
                <p className="text-base text-muted-foreground">Memory values are reported in MB.</p>
                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">F.1 WANDS Search Memory</h3>
                  <BenchmarkTable headers={['Engine', 'Raw Peak', 'Working Set', 'Anonymous', 'File-Backed', 'Kernel', 'Slab']} data={[
                    { Engine: 'Brinicle', 'Raw Peak': 129.3, 'Working Set': 128.4, Anonymous: 79.8, 'File-Backed': 41.3, Kernel: 4.8, Slab: 3.5 },
                    { Engine: 'Meilisearch', 'Raw Peak': 238.8, 'Working Set': 238.8, Anonymous: 124.9, 'File-Backed': 107.4, Kernel: 4.2, Slab: 1.6 },
                    { Engine: 'OpenSearch', 'Raw Peak': 9551.5, 'Working Set': 9544.2, Anonymous: 9390.0, 'File-Backed': 128.9, Kernel: 29.6, Slab: 7.3 },
                    { Engine: 'Typesense', 'Raw Peak': 1016.4, 'Working Set': 1016.4, Anonymous: 637.6, 'File-Backed': 349.7, Kernel: 26.3, Slab: 9.2 },
                    { Engine: 'Weaviate', 'Raw Peak': 596.8, 'Working Set': 596.8, Anonymous: 471.4, 'File-Backed': 119.1, Kernel: 2.6, Slab: 0.9 },
                  ]} /></div>
                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">F.2 ESCI Search Memory</h3>
                  <BenchmarkTable headers={['Engine', 'Raw Peak', 'Working Set', 'Anonymous', 'File-Backed', 'Kernel', 'Slab']} data={[
                    { Engine: 'Brinicle', 'Raw Peak': 1731.1, 'Working Set': 1714.7, Anonymous: 480.8, 'File-Backed': 1203.7, Kernel: 43.7, Slab: 39.0 },
                    { Engine: 'Meilisearch', 'Raw Peak': 5671.0, 'Working Set': 5671.0, Anonymous: 955.0, 'File-Backed': 4687.0, Kernel: 26.3, Slab: 12.1 },
                    { Engine: 'OpenSearch', 'Raw Peak': 11716.2, 'Working Set': 11704.5, Anonymous: 10171.0, 'File-Backed': 1505.4, Kernel: 35.7, Slab: 10.9 },
                    { Engine: 'Typesense', 'Raw Peak': 8040.5, 'Working Set': 8040.3, Anonymous: 1601.3, 'File-Backed': 6391.7, Kernel: 44.4, Slab: 24.8 },
                    { Engine: 'Weaviate', 'Raw Peak': 4794.0, 'Working Set': 4794.0, Anonymous: 2326.7, 'File-Backed': 2446.1, Kernel: 17.3, Slab: 6.6 },
                  ]} /></div>
              </section>

              {/* ==================== APPENDIX G ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix G. Build Time and Build Memory</h2>
                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">G.1 Build Time</h3>
                  <BenchmarkTable headers={['Dataset', 'Brinicle', 'Meilisearch', 'OpenSearch', 'Typesense', 'Weaviate']} data={[
                    { Dataset: 'WANDS', Brinicle: '11.4 s', Meilisearch: '15.4 s', OpenSearch: '27.7 s', Typesense: '8.9 s', Weaviate: '4.8 s' },
                    { Dataset: 'ESCI', Brinicle: '405.8 s', Meilisearch: '3136.3 s', OpenSearch: '697.9 s', Typesense: '339.2 s', Weaviate: '227.8 s' },
                  ]} /></div>
                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">G.2 WANDS Build Memory (MB)</h3>
                  <BenchmarkTable headers={['Engine', 'Raw Peak', 'Working Set', 'Anonymous', 'File-Backed', 'Kernel', 'Slab']} data={[
                    { Engine: 'Brinicle', 'Raw Peak': 160.2, 'Working Set': 126.9, Anonymous: 82.1, 'File-Backed': 76.7, Kernel: 5.5, Slab: 4.4 },
                    { Engine: 'Meilisearch', 'Raw Peak': 849.4, 'Working Set': 849.4, Anonymous: 733.5, 'File-Backed': 111.5, Kernel: 5.5, Slab: 1.7 },
                    { Engine: 'OpenSearch', 'Raw Peak': 9522.8, 'Working Set': 9515.4, Anonymous: 9317.3, 'File-Backed': 178.5, Kernel: 28.2, Slab: 7.0 },
                    { Engine: 'Typesense', 'Raw Peak': 897.0, 'Working Set': 897.0, Anonymous: 312.0, 'File-Backed': 574.1, Kernel: 25.6, Slab: 9.9 },
                    { Engine: 'Weaviate', 'Raw Peak': 535.2, 'Working Set': 535.2, Anonymous: 410.4, 'File-Backed': 117.6, Kernel: 2.5, Slab: 0.9 },
                  ]} /></div>
                <div className="space-y-4"><h3 className="text-xl font-semibold text-foreground">G.3 ESCI Build Memory (MB)</h3>
                  <BenchmarkTable headers={['Engine', 'Raw Peak', 'Working Set', 'Anonymous', 'File-Backed', 'Kernel', 'Slab']} data={[
                    { Engine: 'Brinicle', 'Raw Peak': 2600.7, 'Working Set': 1665.9, Anonymous: 320.4, 'File-Backed': 2204.2, Kernel: 74.0, Slab: 68.3 },
                    { Engine: 'Meilisearch', 'Raw Peak': 7059.7, 'Working Set': 6989.1, Anonymous: 2276.1, 'File-Backed': 4795.6, Kernel: 31.2, Slab: 15.3 },
                    { Engine: 'OpenSearch', 'Raw Peak': 12963.4, 'Working Set': 12953.9, Anonymous: 9645.5, 'File-Backed': 3616.9, Kernel: 36.8, Slab: 15.0 },
                    { Engine: 'Typesense', 'Raw Peak': 8432.8, 'Working Set': 8432.5, Anonymous: 1708.3, 'File-Backed': 7106.8, Kernel: 44.0, Slab: 26.4 },
                    { Engine: 'Weaviate', 'Raw Peak': 6228.4, 'Working Set': 6228.4, Anonymous: 3770.3, 'File-Backed': 2720.5, Kernel: 16.5, Slab: 7.2 },
                  ]} /></div>
              </section>

              {/* ==================== APPENDIX H ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix H. Figure Data</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  The main figures can be generated from the appendix tables as follows:
                </p>
                <BenchmarkTable
                  headers={['Figure', 'Source Table']}
                  data={[
                    { Figure: 'P99 latency comparison', 'Source Table': 'Appendix E' },
                    { Figure: 'Peak search memory comparison', 'Source Table': 'Appendix F' },
                    { Figure: 'Hit@K curves', 'Source Table': 'Appendix D.1 and Appendix D.5' },
                  ]}
                />
              </section>

              {/* ==================== APPENDIX I ==================== */}
              <section className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Appendix I. Raw Result Fields</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  The benchmark output uses the following fields:
                </p>
                <BenchmarkTable
                  headers={['Field', 'Meaning']}
                  data={[
                    { Field: 'nDCG@K', Meaning: 'Normalized discounted cumulative gain at K' },
                    { Field: 'Recall@K', Meaning: 'Fraction of exact-relevant products retrieved in the top K' },
                    { Field: 'Hit@K', Meaning: 'Whether at least one exact-relevant product appears in the top K' },
                    { Field: 'MRR@K', Meaning: 'Reciprocal rank of the first exact-relevant product in the top K' },
                    { Field: 'search_avg_latency', Meaning: 'Mean per-query search latency, in seconds' },
                    { Field: 'search_p50_latency', Meaning: '50th percentile per-query search latency, in seconds' },
                    { Field: 'search_p95_latency', Meaning: '95th percentile per-query search latency, in seconds' },
                    { Field: 'search_p99_latency', Meaning: '99th percentile per-query search latency, in seconds' },
                    { Field: 'qps', Meaning: 'Queries processed per second' },
                    { Field: 'search_total_query_time', Meaning: 'Total measured search time, in seconds' },
                    { Field: 'raw_peak_mb', Meaning: 'Peak raw memory usage, in MB' },
                    { Field: 'working_set_peak_mb', Meaning: 'Peak working-set memory usage, in MB' },
                    { Field: 'anon_peak_mb', Meaning: 'Peak anonymous memory usage, in MB' },
                    { Field: 'file_peak_mb', Meaning: 'Peak file-backed memory usage, in MB' },
                    { Field: 'kernel_peak_mb', Meaning: 'Peak kernel memory usage, in MB' },
                    { Field: 'slab_peak_mb', Meaning: 'Peak slab memory usage, in MB' },
                    { Field: 'build_latency', Meaning: 'Index build or ingestion time, in seconds' },
                    { Field: 'build_memory_profile', Meaning: 'Memory profile recorded during index build or ingestion' },
                  ]}
                />
              </section>

            </div>
          </div>
        </main>
      </div>
    </>
  )
}
