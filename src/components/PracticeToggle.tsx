'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Mode = 'cm' | 'ma' | 'mortgages'

const ITEMS: { mode: Mode; label: string; href: string; color: string }[] = [
  { mode: 'cm', label: 'CAPITAL MARKETS.', href: '/', color: 'var(--homev3-orange-bright)' },
  { mode: 'ma', label: 'M&A.', href: '/ma', color: 'var(--homev3-blue-bright)' },
  { mode: 'mortgages', label: 'MORTGAGES.', href: '/mortgages', color: '#ffffff' },
]

function modeFromPath(pathname: string): Mode {
  if (pathname === '/ma' || pathname.startsWith('/ma/')) return 'ma'
  if (pathname === '/mortgages' || pathname.startsWith('/mortgages/')) return 'mortgages'
  return 'cm'
}

/**
 * PracticeToggle — three Links derived from the URL. Replaces the static
 * BrandLockup tagline spans. Tagline colour stays literal per item (CM=orange,
 * M&A=blue, Mortgages=white) so all three practices are visible at once;
 * --mode-accent reflects the ACTIVE practice (set by ModeSetter on <html>).
 */
export function PracticeToggle() {
  const pathname = usePathname()
  const active = modeFromPath(pathname)

  return (
    <nav
      aria-label="Practice area"
      className="brand-lockup-tagline"
      style={{
        fontSize: 9,
        letterSpacing: '0.22em',
        fontWeight: 500,
        marginTop: 6,
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
    >
      {ITEMS.map((item, idx) => (
        <span key={item.mode} style={{ display: 'inline-flex', alignItems: 'baseline' }}>
          {idx > 0 && (
            <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.35)', padding: '0 6px' }}>
              |
            </span>
          )}
          <Link
            href={item.href}
            aria-current={active === item.mode ? 'page' : undefined}
            style={{
              color: item.color,
              textDecoration: 'none',
              opacity: active === item.mode ? 1 : 0.85,
            }}
          >
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  )
}
