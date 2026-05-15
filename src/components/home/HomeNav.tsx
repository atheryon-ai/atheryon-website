'use client'

import Link from 'next/link'
import { BrandLockup } from './BrandLockup'

const links = [
  { label: 'SYSTEM', href: '/system' },
  { label: 'APPROACH', href: '/approach' },
  { label: 'ENGAGEMENTS', href: '/engagements' },
  { label: 'WORKFLOWS', href: '/workflows' },
  { label: 'ABOUT', href: '/about' },
  { label: 'INSIGHTS', href: '/labs' },
]

export function HomeNav() {
  return (
    <nav
      style={{
        padding: '22px 0',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: 'rgba(6, 11, 28, 0.85)',
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
        <Link href="/" style={{ textDecoration: 'none' }}>
          <BrandLockup markSize={52} />
        </Link>

        <div className="home-nav-links" style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                color: 'var(--homev3-text-soft)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="home-nav-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 4,
            background: 'transparent',
            border: '1px solid var(--homev3-blue)',
            color: 'var(--homev3-blue-bright)',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <span className="home-nav-cta-full">BOOK SYSTEM ASSESSMENT</span>
          <span className="home-nav-cta-short">BOOK</span>
          <span>→</span>
        </Link>
      </div>
    </nav>
  )
}
