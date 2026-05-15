import Link from 'next/link'

type Card = {
  title: string
  body: string
  href: string
  icon: React.ReactNode
}

const cards: Card[] = [
  {
    title: 'Capital Markets Systems',
    body: 'Front-to-back trading, risk, pricing and operations systems built for financial institutions.',
    href: '/system',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="6" width="18" height="4" rx="1" />
        <rect x="3" y="14" width="18" height="4" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Data Platforms',
    body: 'Structured, real-time financial data platforms that power analytics, reporting and AI workflows.',
    href: '/system',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
  },
  {
    title: 'AI Agent Systems',
    body: 'AI agents orchestrate workflows, make decisions and automate complex financial processes.',
    href: '/workflows',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <path d="M6 7l4 4M18 7l-4 4M6 17l4-4M18 17l-4-4" />
      </svg>
    ),
  },
]

export function BuiltForGrid() {
  return (
    <section style={{ padding: '16px 0 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            textAlign: 'center',
            fontSize: 14,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--homev3-text-soft)',
            fontWeight: 500,
            marginBottom: 32,
          }}
        >
          Built for the complexity of capital markets
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {cards.map((c) => (
            <article
              key={c.title}
              style={{
                background: 'var(--homev3-surface)',
                border: '1px solid var(--homev3-border)',
                borderRadius: 8,
                padding: '32px 28px',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'var(--homev3-surface-2)',
                  border: '1px solid var(--homev3-border)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 22,
                  color: 'var(--homev3-blue-bright)',
                }}
              >
                <span style={{ width: 26, height: 26, display: 'block' }}>{c.icon}</span>
              </div>
              <h3
                style={{
                  fontSize: 13,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  margin: '0 0 14px',
                  color: '#ffffff',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  color: 'var(--homev3-text-soft)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: '0 0 22px',
                }}
              >
                {c.body}
              </p>
              <Link
                href={c.href}
                style={{
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--homev3-blue-bright)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                LEARN MORE →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
