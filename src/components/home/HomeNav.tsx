'use client'

import Link from 'next/link'
import { BrandLockup } from './BrandLockup'
import { shellConfig, type Mode } from '../shellConfig'

/**
 * HomeNav — global header. Renders nav links + CTA from shellConfig keyed
 * by `mode`. Each route-group layout passes its mode (cm | ma | mortgages)
 * so the correct content is server-rendered into the static export.
 */
export function HomeNav({ mode = 'cm' }: { mode?: Mode }) {
  const config = shellConfig[mode]

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
        <BrandLockup markSize={52} />

        <div className="home-nav-links" style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
          {config.nav.map((l) => (
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
          href={config.cta.href}
          className="home-nav-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
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
          <span>→</span>
        </Link>
      </div>
    </nav>
  )
}
