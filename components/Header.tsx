'use client'

import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // simple client-side heuristic — adjust to your auth solution (cookie, JWT, next-auth, etc.)
    const token =
      typeof window !== 'undefined' &&
      (localStorage.getItem('token') || sessionStorage.getItem('token'))
    setIsAuthenticated(Boolean(token))
  }, [])

  let headerClass = 'w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  const pathname = usePathname()

  return (
    <header className={headerClass}>
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-0">
        {/* Top row: logo / title (left) — search + account (right) */}
        <div className="flex items-center justify-between py-6">
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center">
              <div className="mr-3">
                <Logo />
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="text-2xl font-semibold">{siteMetadata.headerTitle}</div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>

          <div className="flex items-center space-x-3">
            <SearchButton />

            {/* Theme switch — visible on sm and larger, placed next to Search */}
            <div className="hidden sm:inline-flex">
              <ThemeSwitch />
            </div>

            {/* Auth link: text + destination change based on auth state */}
            <Link
              href={isAuthenticated ? '/account' : '/signin'}
              className="hidden text-sm font-medium tracking-widest text-gray-900 uppercase sm:inline-block dark:text-gray-100"
            >
              {isAuthenticated ? 'Account' : 'Sign in'}
            </Link>

            {/* mobile menu button */}
            <MobileNav />
          </div>
        </div>

        {/* Divider under top row (subtle and full-width) */}
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />

        {/* Secondary nav row */}
        <nav>
          <div className="no-scrollbar hidden w-full items-center overflow-x-auto py-3 text-sm font-medium tracking-widest uppercase sm:flex">
            <div className="flex items-center space-x-8">
              {headerNavLinks.map((link) => {
                const isActive =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)

                return (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`hover:text-primary-500 dark:hover:text-primary-400 text-sm font-bold tracking-widest ${isActive
                      ? 'text-primary-500 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-100'
                      }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
