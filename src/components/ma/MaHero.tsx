import Link from 'next/link'

/**
 * MaHero — M&A practice landing hero. Full-width text-led layout (not the
 * home page's split + OrchestrationDiagram). M&A is a consulting practice,
 * not a system; the hero treatment should signal "senior practitioner POV"
 * rather than "productized AI platform". Mode-accent var flows from the
 * route-group layout (data-mode="ma") so colors flip automatically.
 */
export function MaHero() {
  return (
    <section className="home-hero-section" style={{ padding: '60px 0 56px' }}>
      <div
        className="home-section-container"
        style={{
          maxWidth: 1340,
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 880 }}>
          <span
            style={{
              fontSize: 12,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--mode-accent-bright)',
              fontWeight: 600,
            }}
          >
            M&amp;A Execution
          </span>
          <h1
            style={{
              fontSize: 'clamp(36px, 4.4vw, 54px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: '18px 0 22px',
              color: '#ffffff',
            }}
          >
            Talk to us before{' '}
            <span style={{ color: 'var(--mode-accent-bright)' }}>signing.</span>
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: 'var(--homev3-text-soft)',
              margin: '0 0 14px',
              maxWidth: '62ch',
            }}
          >
            Senior execution specialists in the term-sheet room before signing — and in
            the delivery seat from Day-1 through TSA exit. AI agents compress the
            volume work. The senior specialist sets direction and owns the outcome.
          </p>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: 'var(--homev3-text-faint)',
              margin: '0 0 32px',
              maxWidth: '62ch',
              fontStyle: 'italic',
            }}
          >
            This is execution-specialist work, not deal advisory. Bankers price the
            deal and lawyers paper the terms. We tell you what is executable. Then we
            deliver.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/ma/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px',
                borderRadius: 4,
                background: 'var(--mode-accent)',
                border: '1px solid var(--mode-accent)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              BOOK M&amp;A REVIEW <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/ma/approach"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px',
                borderRadius: 4,
                background: 'transparent',
                border: '1px solid var(--mode-accent)',
                color: 'var(--mode-accent-bright)',
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              READ THE APPROACH <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
