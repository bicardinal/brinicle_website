'use client'

import * as React from 'react'
import Link from 'next/link'
import GithubIcon from '@/components/icons/github-icon'

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            Built by{' '}
            <Link
              href="https://github.com/bicardinal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              bicardinal
            </Link>
            {' '}with <span className="text-red-500">❤️</span>
          </p>
          <Link
            href="https://github.com/bicardinal/brinicle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-label="View source code on GitHub"
          >
            <span>The source code is available on GitHub</span>
            <GithubIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
