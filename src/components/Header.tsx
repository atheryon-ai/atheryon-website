'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { site } from '@/content/site'

// Flat navigation reflecting new IA (Reality + 3 pillars + Labs + About)
const mainNav = site.nav

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-bone/90 backdrop-blur-xl ${
        scrolled
          ? 'py-3 shadow-[0_1px_0_0_rgba(10,26,47,0.06)]'
          : 'py-4'
      }`}
    >
      <nav className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-white rounded-md overflow-hidden group-hover:shadow-card transition-shadow">
              <Image
                src="/logo.png"
                alt={site.name}
                width={40}
                height={40}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-semibold text-xl text-neutral-900 tracking-tight">
              {site.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-white/60 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-neutral-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>

    {/* Mobile Navigation - Full Screen Overlay.
        Rendered outside <header> because the header's backdrop-blur-xl
        creates a containing block, which would constrain `fixed inset-0`
        on a descendant to the header's height instead of the viewport. */}
    {mobileMenuOpen && (
      <div className="lg:hidden fixed inset-0 bg-bone/98 backdrop-blur-xl z-50">
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-500/10">
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-10 h-10 bg-white rounded-md overflow-hidden">
                <Image
                  src="/logo.png"
                  alt={site.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <span className="font-semibold text-xl text-neutral-900 tracking-tight">
                {site.name}
              </span>
            </Link>
            <button
              className="p-2 rounded-xl hover:bg-white/60 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 px-6 py-8 overflow-y-auto">
            <div className="flex flex-col gap-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
