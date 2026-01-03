'use client'

import * as React from 'react'
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockItem,
} from '@/components/ui/shadcn-io/code-block'

export function RecallCodeBlock() {
  return (
    <CodeBlock
      data={[
        {
          alias: 'recall',
          language: 'python',
          label: 'Recall computation',
          title: 'Recall@K',
          filename: 'recall.py',
          code: `def compute_recalls(pred_ids: np.ndarray, gt_top: np.ndarray, K: int):
    nq = gt_top.shape[0]
    out = {}
    hits = 0
    for i in range(nq):
        a = pred_ids[i, :K]
        b = gt_top[i, :K]
        hits += len(set(a.tolist()) & set(b.tolist()))
    out[f"recall@{K}"] = hits / (nq * K)
    return out`,
        },
      ]}
      value="recall"
      className="w-full"
    >
      <CodeBlockBody>
        {(item) => (
          <CodeBlockItem
            key={item.alias}
            value={item.alias}
            className="max-h-96 w-full"
          >
            <CodeBlockContent language={item.language as any}>
              {item.code}
            </CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </CodeBlock>
  )
}
