'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { BrandLockup } from './BrandLockup'
import { shellConfig, type Mode } from '../shellConfig'

/**
 * HomeNav — global header. Renders nav links + CTA from shellConfig keyed
 * by `mode`. The (cm) route-group layout passes its mode so the correct
 * content is server-rendered into the static export. `Mode` has one member
 * since the mortgages shell was removed on 2026-08-12.
 *
 * ≤768px the inline link row is hidden (globals.css) and a disclosure-pattern
 * MENU button reveals the same links + CTA in a panel under the header.
 */
export function HomeNav({ mode = 'cm' }: { mode?: Mode }) {
  const config = shellConfig[mode]
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // Council review 2026-08-10: inside an arm the destination is
  // unambiguous, so the primary CTA deep-links to that arm's contact
  // instead of forking at the /contact chooser.
  const ctaHref =
    pathname === '/ma' || pathname.startsWith('/ma/')
      ? '/ma/contact'
      : pathname === '/capital-markets' || pathname.startsWith('/capital-markets/')
        ? '/capital-markets/contact'
        : config.cta.href

  const isNavItemActive = (href: string) => {
    if (href === '/capital-markets') {
      return (
        pathname === href ||
        pathname.startsWith(`${href}/`) ||
        ['/system', '/labs', '/themes', '/offers'].some(
          (route) => pathname === route || pathname.startsWith(`${route}/`),
        )
      )
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  // Close when the route changes (link selected from the panel).
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    // Close if the viewport grows past the mobile breakpoint while open,
    // otherwise the scroll lock would outlive the hidden panel.
    const mq = window.matchMedia('(min-width: 769px)')
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <nav
      style={{
        padding: '22px 0',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(14, 42, 58, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--homev3-border)',
      }}
    >
      <div
        className="home-nav-grid"
        style={{
          maxWidth: 1340,
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <BrandLockup />

        <div className="home-nav-links" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {config.nav.map((l) => {
            const active = isNavItemActive(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={active ? 'text-warm-white' : 'text-homev3-text-soft'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  minHeight: 44,
                  borderBottom: active ? '2px solid var(--mode-accent)' : '2px solid transparent',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        <Link
          href={ctaHref}
          className="home-nav-cta"
          aria-label={config.cta.label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            minHeight: 44,
            padding: '10px 16px',
            borderRadius: 4,
            background: 'transparent',
            border: '1px solid var(--mode-accent)',
            color: 'var(--mode-accent-bright)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span className="home-nav-cta-full">{config.cta.label}</span>
          <span className="home-nav-cta-short">{config.cta.shortLabel}</span>
          <span aria-hidden="true">→</span>
        </Link>

        {config.nav.length > 0 && (
          <button
            ref={btnRef}
            type="button"
            className="home-nav-menu-btn"
            aria-expanded={open}
            aria-controls="home-nav-mobile-menu"
            onClick={() => setOpen((o) => !o)}
            style={{
              minWidth: 44,
              minHeight: 44,
              padding: '0 12px',
              background: 'transparent',
              border: '1px solid var(--homev3-border)',
              borderRadius: 4,
              color: 'var(--homev3-text-soft)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {open ? 'CLOSE' : 'MENU'}
          </button>
        )}
      </div>

      {open && (
        <div
          id="home-nav-mobile-menu"
          className="home-nav-mobile-panel bg-navy"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            borderBottom: '1px solid var(--homev3-border)',
            maxHeight: 'calc(100dvh - 100px)',
            overflowY: 'auto',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: '8px 16px 16px' }}>
            {config.nav.map((l) => {
              const active = isNavItemActive(l.href)
              return (
                <li key={l.href} style={{ borderBottom: '1px solid var(--homev3-border)' }}>
                  <Link
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className={active ? 'text-warm-white' : 'text-homev3-text-soft'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 48,
                      paddingLeft: active ? 12 : 0,
                      boxShadow: active ? 'inset 3px 0 var(--mode-accent)' : 'none',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                href={ctaHref}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  minHeight: 48,
                  color: 'var(--mode-accent-bright)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                }}
              >
                {config.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
