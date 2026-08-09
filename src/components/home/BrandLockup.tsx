import Link from 'next/link'

// Wordmark is type only on firm pages (design standard §2): the legacy
// gradient logo mark does not render in the shell.
export function BrandLockup() {
  return (
    <span className="brand-lockup" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Link
        href="/"
        aria-label="Atheryon home"
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
