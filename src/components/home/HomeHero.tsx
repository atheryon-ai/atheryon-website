import Link from 'next/link'
import { OrchestrationDiagram } from './OrchestrationDiagram'

export function HomeHero() {
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
        <div
          className="home-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 12,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--mode-accent-bright)',
                fontWeight: 600,
              }}
            >
              Capital Markets AI Systems
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
              Designing and delivering capital markets AI systems using{' '}
              <span style={{ color: 'var(--mode-accent-bright)' }}>AI agents.</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                color: 'var(--homev3-text-soft)',
                margin: '0 0 32px',
                maxWidth: '50ch',
              }}
            >
              Atheryon builds production-grade, front-to-back systems and data platforms that
              transform how financial institutions operate.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link
                href="/system"
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
                EXPLORE THE SYSTEM ARCHITECTURE <span>→</span>
              </Link>
              <Link
                href="/contact"
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
                BOOK SYSTEM ASSESSMENT <span>→</span>
              </Link>
            </div>
          </div>

          <OrchestrationDiagram />
        </div>
      </div>
    </section>
  )
}
