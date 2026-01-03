'use client'

import * as React from 'react'
import Image from 'next/image'

interface BenchmarkImageProps {
  src: string
  alt: string
  title?: string
  description?: string
}

export function BenchmarkImage({
  src,
  alt,
  title,
  description,
}: BenchmarkImageProps) {
  return (
    <div className="w-full space-y-4">
      {title && (
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <div className="relative w-full aspect-video overflow-hidden rounded-lg border bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
    </div>
  )
}
