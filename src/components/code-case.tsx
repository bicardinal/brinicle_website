'use client'
import * as React from 'react'
import { useState } from 'react'
import {
  BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockData,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem
} from './ui/shadcn-io/code-block'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type TabKey = 'vector-search' | 'item-search' | 'autocomplete'

interface TabContent {
  items: CodeBlockData[]
  defaultAlias: string
}

const TABS: Record<TabKey, TabContent> = {
  'vector-search': {
    defaultAlias: 'vector-build-search',
    items: [
      {
        alias: 'vector-build-search',
        language: 'python',
        label: 'Initialize a vector engine, build your index with vectors, and perform similarity search',
        title: 'Build & Search',
        filename: 'vector_search.py',
        code: `import numpy as np
import brinicle

dim = 384
n = 1000

X = np.random.randn(n, dim).astype("float32")
Q = np.random.randn(dim).astype("float32")

engine = brinicle.VectorEngine(
    "vector_index",
    dim=dim,
    M=48,
    ef_construction=1024,
    ef_search=512,
)

engine.init(mode="build")

for i in range(n):
    engine.ingest(str(i), X[i])

engine.finalize()

results = engine.search(Q, k=10)

print(results)`,
      },
      {
        alias: 'vector-insert',
        language: 'python',
        label: 'Add new vectors to an existing index without rebuilding from scratch',
        title: 'Insert',
        filename: 'vector_insert.py',
        code: `import numpy as np
import brinicle

dim = 384
Y = np.random.randn(5, dim).astype("float32")

engine = brinicle.VectorEngine(
    "vector_index",
    dim=dim,
)

engine.init(mode="insert")

for eid in range(5):
    engine.ingest(str(eid) + "_new", Y[eid])

engine.finalize()`,
      },
      {
        alias: 'vector-upsert',
        language: 'python',
        label: "Update existing vectors by ID or insert new ones if they don't exist",
        title: 'Upsert',
        filename: 'vector_upsert.py',
        code: `import numpy as np
import brinicle

dim = 384
Y = np.random.randn(5, dim).astype("float32")

engine = brinicle.VectorEngine(
    "vector_index",
    dim=dim,
)

engine.init(mode="upsert")

for eid in range(5):
    engine.ingest(str(eid), Y[eid])

engine.finalize()`,
      },
      {
        alias: 'vector-delete',
        language: 'python',
        label: 'Remove specific vectors from your index by their IDs',
        title: 'Delete',
        filename: 'vector_delete.py',
        code: `import brinicle

engine = brinicle.VectorEngine(
    "vector_index",
    dim=384,
)

engine.delete_items(["1", "4"])`,
      },
    ],
  },
  'item-search': {
    defaultAlias: 'item-build-search',
    items: [
      {
        alias: 'item-build-search',
        language: 'python',
        label: 'Build an item index with structured fields and semantic vectors, then perform hybrid search',
        title: 'Build & Search',
        filename: 'item_search.py',
        code: `import numpy as np
import brinicle

vector_dim = 384

engine = brinicle.ItemSearchEngine(
    "hybrid_item_index",
    dim=96,
    vector_dim=vector_dim,
    alpha=0.95,
)

engine.init(mode="build")

item_vector = np.random.randn(vector_dim).astype("float32")

engine.ingest(
    external_id="p1",
    title="Apple iPhone 15 Pro Max 256GB",
    category="Electronics",
    subcategory="Smartphones",
    attributes={"brand": "Apple", "storage": "256GB"},
    vector=item_vector,
    normalize=True,
)

engine.finalize()

query_vector = np.random.randn(vector_dim).astype("float32")

results = engine.search(
    "iphone 15 pro",
    category="Electronics",
    attributes={"brand": "Apple"},
    vector=query_vector,
    normalize=True,
    k=10,
)

print(results)`,
      },
      {
        alias: 'item-insert',
        language: 'python',
        label: 'Add new items to an existing index without rebuilding from scratch',
        title: 'Insert',
        filename: 'item_insert.py',
        code: `import numpy as np
import brinicle

vector_dim = 384

engine = brinicle.ItemSearchEngine(
    "hybrid_item_index",
    dim=96,
    vector_dim=vector_dim,
    alpha=0.95,
)

engine.init(mode="insert")

item_vector = np.random.randn(vector_dim).astype("float32")

engine.ingest(
    external_id="p2",
    title="Samsung Galaxy S24 Ultra",
    category="Electronics",
    subcategory="Smartphones",
    attributes={"brand": "Samsung", "storage": "512GB"},
    vector=item_vector,
    normalize=True,
)

engine.finalize()`,
      },
      {
        alias: 'item-upsert',
        language: 'python',
        label: "Update existing items by ID or insert new ones if they don't exist",
        title: 'Upsert',
        filename: 'item_upsert.py',
        code: `import numpy as np
import brinicle

vector_dim = 384

engine = brinicle.ItemSearchEngine(
    "hybrid_item_index",
    dim=96,
    vector_dim=vector_dim,
    alpha=0.95,
)

engine.init(mode="upsert")

item_vector = np.random.randn(vector_dim).astype("float32")

engine.ingest(
    external_id="p1",
    title="Apple iPhone 15 Pro Max 512GB",
    category="Electronics",
    subcategory="Smartphones",
    attributes={"brand": "Apple", "storage": "512GB"},
    vector=item_vector,
    normalize=True,
)

engine.finalize()`,
      },
      {
        alias: 'item-delete',
        language: 'python',
        label: 'Remove specific items from your index by their IDs',
        title: 'Delete',
        filename: 'item_delete.py',
        code: `import brinicle

engine = brinicle.ItemSearchEngine(
    "hybrid_item_index",
    dim=96,
    vector_dim=384,
    alpha=0.95,
)

engine.delete_items(["p1", "p2"])`,
      },
    ],
  },
  'autocomplete': {
    defaultAlias: 'ac-build-search',
    items: [
      {
        alias: 'ac-build-search',
        language: 'python',
        label: 'Initialize an autocomplete engine, ingest suggestions, and perform prefix-oriented search',
        title: 'Build & Search',
        filename: 'autocomplete.py',
        code: `import brinicle

ac = brinicle.AutocompleteEngine(
    "autocomplete_index",
    dim=48,
)

ac.init(mode="build")

ac.ingest("iphone 15 pro max", "iphone 15 pro max")
ac.ingest("iphone 15 case", "iphone 15 case")
ac.ingest("samsung s24 ultra", "samsung s24 ultra")

ac.finalize()

results = ac.search("iphone", k=5)

print(results)`,
      },
      {
        alias: 'ac-insert',
        language: 'python',
        label: 'Add new suggestions to an existing autocomplete index',
        title: 'Insert',
        filename: 'autocomplete_insert.py',
        code: `import brinicle

ac = brinicle.AutocompleteEngine(
    "autocomplete_index",
    dim=48,
)

ac.init(mode="insert")

ac.ingest("macbook pro m3", "macbook pro m3")
ac.ingest("airpods pro 2", "airpods pro 2")

ac.finalize()`,
      },
      {
        alias: 'ac-delete',
        language: 'python',
        label: 'Remove specific suggestions from your autocomplete index',
        title: 'Delete',
        filename: 'autocomplete_delete.py',
        code: `import brinicle

ac = brinicle.AutocompleteEngine(
    "autocomplete_index",
    dim=48,
)

ac.delete_items(["iphone 15 case"])`,
      },
    ],
  },
}

export function CodeCase() {
  const [activeTab, setActiveTab] = useState<TabKey>('vector-search')
  const [selectedIndex, setSelectedIndex] = useState<Record<TabKey, string>>({
    'vector-search': TABS['vector-search'].defaultAlias,
    'item-search': TABS['item-search'].defaultAlias,
    autocomplete: TABS['autocomplete'].defaultAlias,
  })

  const currentItems = TABS[activeTab].items
  const currentValue = selectedIndex[activeTab]

  return (
    <div className={'w-full py-16 flex flex-col'}>
      <div className="flex items-center justify-center pb-10 w-full flex-col">
        <h2 className="mb-4 font-bold text-2xl text-primary tracking-tight md:text-3xl lg:text-4xl">
          How to Use brinicle
        </h2>
        <p className="mx-auto max-w-2xl text-base text-center md:text-lg text-muted-foreground leading-relaxed">
          Get started with brinicle using these code examples. Perform vector search, item search, and autocomplete.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="vector-search">Vector Search</TabsTrigger>
            <TabsTrigger value="item-search">Item Search</TabsTrigger>
            <TabsTrigger value="autocomplete">Autocomplete</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="scrollbar-none flex gap-2 overflow-x-auto p-4 md:flex-col md:gap-4 md:p-4">
            {currentItems.map((option) => (
              <button
                className={`w-64 cursor-pointer flex-shrink-0 rounded-sm space-y-2 border p-4 text-left transition-colors duration-300 ease-out last:mr-0 md:mr-0 md:w-full md:p-6 ${
                  currentValue === option.alias
                    ? 'bg-box shadow-sm'
                    : 'hover:dark:bg-background-subtle opacity-60'
                }`}
                key={option.alias}
                onClick={() =>
                  setSelectedIndex((prev) => ({ ...prev, [activeTab]: option.alias }))
                }
                type="button"
              >
                <label className="text-muted-foreground cursor-pointer text-sm tracking-tight md:text-md lg:text-md">
                  {option.label}
                </label>
                <h2
                  className={
                    'font-semibold text-foreground text-lg tracking-tight md:text-xl lg:text-2xl' +
                    (currentValue === option.alias ? ' text-primary' : '')
                  }
                >
                  {option.title}
                </h2>
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-start overflow-hidden p-4 max-sm:gap-6 md:col-span-3 md:p-6">
          <div className="w-full flex-none">
            <CodeBlock data={currentItems} value={currentValue} className="w-full">
              <CodeBlockHeader>
                <CodeBlockFiles>
                  {(item) => (
                    <CodeBlockFilename key={item.filename} value={item.alias}>
                      {item.filename}
                    </CodeBlockFilename>
                  )}
                </CodeBlockFiles>
                <CodeBlockCopyButton
                  onCopy={() => console.log('Copied code to clipboard')}
                  onError={() => console.error('Failed to copy code to clipboard')}
                />
              </CodeBlockHeader>

              <ScrollArea className="w-full">
                <CodeBlockBody>
                  {(item) => (
                    <CodeBlockItem
                      key={item.alias}
                      value={item.alias}
                      className="max-h-96 w-full"
                    >
                      <CodeBlockContent language={item.language as BundledLanguage}>
                        {item.code}
                      </CodeBlockContent>
                    </CodeBlockItem>
                  )}
                </CodeBlockBody>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  )
}