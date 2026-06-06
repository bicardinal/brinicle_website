'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ThemeSwitcher } from '@/components/ui/shadcn-io/theme-switcher'
import GithubIcon from '@/components/icons/github-icon'
import { Logo } from '@/components/logo'
import { Menu, ChevronDown, ExternalLink } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

const navItems = [
  { href: '/', label: 'Home' },
  {
    label: 'Benchmarks',
    children: [
      { href: '/search_benchmark', label: 'Search Benchmark' },
      { href: '/benchmark', label: 'Vector Benchmark' },
    ],
  },
  {
    href: 'https://docs.brinicle.bicardinal.com/',
    label: 'Documentation',
    external: true,
  },
  { href: '/about', label: 'About' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileBenchOpen, setMobileBenchOpen] = React.useState(false)

  // desktop hover state
  const [benchOpen, setBenchOpen] = React.useState(false)
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const handleEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setBenchOpen(true)
  }

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setBenchOpen(false)
    }, 120)
  }

  const isBenchActive =
    pathname === '/benchmark' || pathname === '/search_benchmark'

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
  }

  const benchItem = navItems.find((i) => i.label === 'Benchmarks')

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

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-row items-center gap-6 ml-6">
          {navItems.map((item) => {
            if ('children' in item && item.children) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                >
                  <button
                    className={`text-sm inline-flex items-center gap-1 transition-colors ${
                      isBenchActive
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>

                  {benchOpen && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md border bg-background shadow-md z-50">
                      {benchItem?.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-3 py-2 text-sm hover:bg-muted ${
                            pathname === child.href ? 'font-medium' : ''
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href!}
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className={`text-sm transition-colors inline-flex items-center gap-1 ${
                  item.href === pathname
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {item.external && (
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <ThemeSwitcher value={theme as any} onChange={handleThemeChange} />

          <Link
            href="https://github.com/bicardinal/brinicle"
            target="_blank"
            className="hidden md:inline-flex p-2"
          >
            <GithubIcon />
          </Link>

          {/* Mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Logo size={20} />
                  <span>brinicle</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1 px-4 mt-2">
                {navItems.map((item) => {
                  if ('children' in item && item.children) {
                    return (
                      <div key={item.label}>
                        <button
                          onClick={() =>
                            setMobileBenchOpen((prev) => !prev)
                          }
                          className="flex justify-between w-full px-3 py-2 text-sm"
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform ${
                              mobileBenchOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {mobileBenchOpen &&
                          item.children.map((child) => (
                            <SheetClose asChild key={child.href}>
                              <Link
                                href={child.href}
                                className="ml-4 block px-3 py-2 text-sm"
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          ))}
                      </div>
                    )
                  }

                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.href!}
                        {...(item.external
                          ? {
                            target: '_blank',
                            rel: 'noopener noreferrer',
                          }
                          : {})}
                        className="block px-3 py-2 text-sm"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  )
}