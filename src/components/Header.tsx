'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { site } from '@/content/site'

// Streamlined navigation with Services dropdown
const mainNav = [
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'Reference Architectures', href: '/reference-architectures' },
  { label: 'About', href: '/about' },
]

// Services dropdown items
const servicesNav = site.servicesNav

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
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
          ? 'py-3 bg-warm-100/95 backdrop-blur-xl shadow-soft'
          : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-white rounded-xl shadow-soft overflow-hidden group-hover:shadow-card transition-shadow">
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
          <div className="hidden lg:flex items-center gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {/* How We Work */}
              <Link href={mainNav[0].href} className="nav-link">
                {mainNav[0].label}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="nav-link flex items-center gap-1.5"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  Services
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-neutral-500/10 py-2 transition-all duration-200 ${
                    servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  {servicesNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 hover:bg-warm-100 transition-colors mx-2 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Reference Architectures */}
              <Link href={mainNav[1].href} className="nav-link">
                {mainNav[1].label}
              </Link>

              {/* About */}
              <Link href={mainNav[2].href} className="nav-link">
                {mainNav[2].label}
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-neutral-900 px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-all shadow-soft hover:shadow-button"
            >
              Request a discussion
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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

        {/* Mobile Navigation - Full Screen Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-0 bg-warm-100/98 backdrop-blur-xl z-50">
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-500/10">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-10 h-10 bg-white rounded-xl shadow-soft overflow-hidden">
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
                  {/* How We Work */}
                  <Link
                    href={mainNav[0].href}
                    className="text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {mainNav[0].label}
                  </Link>

                  {/* Services Expandable Section */}
                  <div>
                    <button
                      className="w-full text-left text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all flex items-center justify-between"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      Services
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Services Sub-menu */}
                    <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-4 pt-2 space-y-1">
                        {servicesNav.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-base font-medium text-neutral-600 hover:text-neutral-900 px-4 py-2.5 rounded-xl hover:bg-white/60 transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reference Architectures */}
                  <Link
                    href={mainNav[1].href}
                    className="text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {mainNav[1].label}
                  </Link>

                  {/* About */}
                  <Link
                    href={mainNav[2].href}
                    className="text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {mainNav[2].label}
                  </Link>

                  {/* Contact */}
                  <Link
                    href="/contact"
                    className="text-lg font-medium text-neutral-700 hover:text-neutral-900 px-4 py-3 rounded-2xl hover:bg-white/60 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="px-6 py-6 border-t border-neutral-500/10">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full text-base font-semibold text-white bg-neutral-900 px-6 py-4 rounded-full hover:bg-neutral-800 transition-all shadow-button"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Request a discussion
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
