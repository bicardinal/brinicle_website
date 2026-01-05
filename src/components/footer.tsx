'use client'

import * as React from 'react'
import Link from 'next/link'
import GithubIcon from '@/components/icons/github-icon'
import LinkedinIcon from '@/components/icons/linkedin-icon'
import TwitterIcon from '@/components/icons/twitter-icon'

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm flex items-center gap-x-1 text-muted-foreground text-center sm:text-left">
            Built by{' '}
            <Link
              href="https://github.com/bicardinal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              bicardinal
            </Link>
            {' '}with <span className="text-2xl">🍻</span>
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/bicardinal/brinicle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="View source code on GitHub"
            >
              <span>The source code is available on GitHub</span>
              <GithubIcon className="h-6 w-6" />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/company/bicardinal/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Visit our LinkedIn page"
              >
                <LinkedinIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/bicardinal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <TwitterIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
