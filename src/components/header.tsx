'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ThemeSwitcher } from '@/components/ui/shadcn-io/theme-switcher'
import GithubIcon from '@/components/icons/github-icon'
import { Logo } from '@/components/logo'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

const navLinks = [
  { href: '/benchmark', label: 'Benchmark' },
  { href: '/search_benchmark', label: 'Search Benchmark' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
  }

  return (
    <div className="relative">
      <nav
        className="flex h-14 w-full items-center justify-between px-4"
        dir="ltr"
      >
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-semibold shrink-0"
        >
          <Logo size={25} />
          <span className="font-semibold text-base tracking-tighter">
            brinicle
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-row items-center gap-6 ml-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex flex-row items-center gap-2 ml-auto md:ml-0">
          {/* Theme Toggle */}
          <ThemeSwitcher
            value={theme as 'light' | 'dark' | 'system'}
            onChange={handleThemeChange}
          />

          {/* GitHub Link - Desktop */}
          <Link
            href="https://github.com/bicardinal/brinicle"
            target="_blank"
            aria-label="GitHub"
            className="hidden md:inline-flex items-center justify-center rounded-md p-2"
          >
            <GithubIcon />
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Logo size={20} />
                  <span className="tracking-tighter">brinicle</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4 mt-2">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                        pathname === link.href
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <div className="mt-auto border-t px-4 pt-4 pb-4 flex flex-col gap-3">
                <SheetClose asChild>
                  <Link
                    href="https://github.com/bicardinal/brinicle"
                    target="_blank"
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <GithubIcon />
                    <span>GitHub</span>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  )
}
