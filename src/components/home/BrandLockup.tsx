import Link from 'next/link'
import { BrandMark } from './BrandMark'

// The lockup pairs the sanctioned logo mark (design standard §2 exception,
// 2026-08-10) with the type wordmark. Wordmark colours come from tokens.
export function BrandLockup({ markSize = 52 }: { markSize?: number }) {
  return (
    <span className="brand-lockup" style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
      <Link href="/" aria-label="Atheryon home" style={{ display: 'inline-flex', textDecoration: 'none' }}>
        <BrandMark size={markSize} />
      </Link>
      <Link
        href="/"
        className="brand-lockup-wordmark font-serif-cap text-warm-white"
        style={{
          fontWeight: 600,
          fontSize: 24,
          letterSpacing: '0.08em',
          textDecoration: 'none',
        }}
      >
        ATHERYON
      </Link>
    </span>
  )
}
