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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


const VALUE_ITEMS: CodeBlockData[] = [
  {
    alias: 'usage',
    language: 'python',
    label: 'Initialize a vector engine, build your index with vectors, and perform similarity search',
    title: 'Build & Search',
    filename: 'usage.py',
    code: `import numpy as np
import brinicle

D = 2
n = 5
X = np.random.randn(n, D).astype(np.float32)
Q = np.random.randn(D).astype(np.float32)

engine = brinicle.VectorEngine("test_index", dim=D, delta_ratio=0.1)

engine.init(mode="build")
for eid in range(n):
    engine.ingest(str(eid), X[eid])
engine.finalize()

print(engine.search(Q, k=10)) # returns a list of ids`,
  },
  {
    language: 'python',
    label: 'Add new vectors to an existing index without rebuilding from scratch',
    title: 'Insert',
    alias: 'insert',
    filename: 'insert.py',
    code: `Y = np.random.randn(5, D).astype(np.float32)
engine.init(mode="insert")
for eid in range(5):
    engine.ingest(str(eid) + "x", Y[eid])
engine.finalize()
print(engine.search(Q, k=10))`,

  },
  {
    language: 'python',
    label: 'Update existing vectors by ID or insert new ones if they don\'t exist',
    title: 'Upsert',
    alias: 'upsert',
    filename: 'upsert.py',
    code: `Y = np.random.randn(5, D).astype(np.float32)
engine.init(mode="upsert")
for eid in range(5):
    engine.ingest(str(eid), Y[eid])
engine.finalize()
print(engine.search(Q, k=10))`,
  },
  {
    language: 'python',
    label: 'Remove specific vectors from your index by their IDs',
    title: 'Delete',
    alias: 'delete',
    filename: 'delete.py',
    code: `engine.delete_items(["1", "4"])
print(engine.search(Q, k=10))`,

  }
] as const;


export function CodeCase() {
  const [selectedIndex, setSelectedIndex] = useState<string>('usage');
  return (
    <div className={'w-full py-16 flex-col flex'}>
      <div className={"flex items-center justify-center pb-10 w-full flex-col"}>
        <h2 className={"mb-4 font-bold text-2xl text-primary tracking-tight md:text-3xl lg:text-4xl"}>
          How to Use brinicle
        </h2>
        <p className={"mx-auto max-w-2xl text-base text-center md:text-lg text-muted-foreground leading-relaxed"}>
          Get started with brinicle using these code examples. Build, insert, update, and delete vectors in your index.
        </p>
      </div>
      <div className="relative grid grid-cols-1  md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="scrollbar-none flex gap-2 overflow-x-auto p-4 md:flex-col md:gap-4 md:p-4">
            {VALUE_ITEMS.map((option, index) => (
              <button
                className={`w-64 flex-shrink-0 rounded-sm space-y-2 border p-4 text-left transition-colors duration-300 ease-out last:mr-0 md:mr-0 md:w-full md:p-6 ${
                  selectedIndex === option.alias
                    ? 'bg-box  shadow-sm'
                    : 'hover:dark:bg-background-subtle opacity-60'
                }`}
                key={option.label}
                onClick={() => setSelectedIndex(option.alias)}
                type="button"
              >
                <label className="text-muted-foreground text-sm tracking-tight md:text-md lg:text-md">
                  {option.label}
                </label>
                <h2 className={
                  'font-semibold text-foreground text-lg tracking-tight md:text-xl lg:text-2xl'
                  + (selectedIndex === option.alias ? ' text-primary' : '')
                }>
                  {option.title}
                </h2>
              </button>
            ))}
          </div>
        </div>
        <div
          className="col-span-1 flex flex-col items-center justify-start overflow-hidden p-4 max-sm:gap-6 md:col-span-3 md:p-6">
          <div className=" w-full flex-none">

            <CodeBlock data={VALUE_ITEMS} value={selectedIndex || 'usage'}
                       className="w-full">
              <CodeBlockHeader>
                <CodeBlockFiles>
                  {(item) => (
                    <CodeBlockFilename
                      key={item.filename}
                      value={item.alias}
                    >
                      {item.filename}
                    </CodeBlockFilename>
                  )}
                </CodeBlockFiles>
                <CodeBlockCopyButton
                  onCopy={() => console.log('Copied code to clipboard')}
                  onError={() =>
                    console.error('Failed to copy code to clipboard')
                  }
                />
              </CodeBlockHeader>

              <ScrollArea className="w-full">
                <CodeBlockBody >
                  {(item) => (
                    <CodeBlockItem
                      key={item.alias}
                      value={item.alias}
                      className="max-h-96 w-full"
                    >
                      <CodeBlockContent
                        language={item.language as BundledLanguage}
                      >
                        {item.code}
                      </CodeBlockContent>
                    </CodeBlockItem>
                  )}
                </CodeBlockBody>
                <ScrollBar orientation="horizontal"/>
              </ScrollArea>
            </CodeBlock>
          </div>

        </div>
      </div>

    </div>
  )
}
