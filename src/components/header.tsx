'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { ThemeSwitcher } from '@/components/ui/shadcn-io/theme-switcher'
import GithubIcon from '@/components/icons/github-icon';


export function Header() {
  const {theme, setTheme} = useTheme()

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
  }

  return (
    <div className="relative">
      <nav
        data-orientation="horizontal"
        className="flex h-14 w-full items-center px-4"
        dir="ltr"
      >
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-semibold"
        >
          <span className="font-semibold text-base tracking-tighter">
            Brinicle
          </span>
        </Link>


        {/* Right Side Actions - Desktop */}
        <div className="flex flex-row items-center justify-end gap-3 flex-1 ">

          {/* Theme Toggle */}
          <ThemeSwitcher
            value={theme as 'light' | 'dark' | 'system'}
            onChange={handleThemeChange}
          />

          {/* GitHub Link */}
          <div className="flex flex-row items-center empty:hidden">
            <div>
              <Link
                href="https://github.com/bicardinal/brinicle"
                target="_blank"
                aria-label="GitHub"
                className="mr-1 inline-flex items-center justify-center rounded-md p-2"
              >
                <GithubIcon/>
              </Link>


            </div>

          </div>
        </div>


      </nav>


    </div>
  )
}
