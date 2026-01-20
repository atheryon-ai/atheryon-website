'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { site } from '@/content/site'

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/90 backdrop-blur-xl shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-white rounded-xl shadow-card overflow-hidden group-hover:shadow-card-hover transition-shadow">
              <Image
                src="/logo.png"
                alt={site.name}
                width={40}
                height={40}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
              {site.name}
            </span>
          </Link>

          {/* Desktop Navigation - Pill Container */}
          <div className="hidden lg:flex items-center ml-8">
            <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xl rounded-full px-2 py-2 shadow-card border border-slate-100">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-full hover:bg-slate-100/80 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href={site.cta.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-slate-900 px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-card hover:shadow-card-hover"
            >
              {site.cta.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-white/80 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-slate-900"
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

        {/* Mobile Navigation - Full Screen Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-0 bg-white/95 backdrop-blur-xl z-50">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-10 h-10 bg-white rounded-xl shadow-card overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt={site.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
                    {site.name}
                  </span>
                </Link>
                <button
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 px-6 py-8 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  {site.nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-slate-700 hover:text-slate-900 px-4 py-3 rounded-2xl hover:bg-slate-100 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="px-6 py-6 border-t border-slate-100">
                <Link
                  href={site.cta.href}
                  className="flex items-center justify-center gap-2 w-full text-base font-semibold text-white bg-slate-900 px-6 py-4 rounded-2xl hover:bg-slate-800 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {site.cta.label}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
