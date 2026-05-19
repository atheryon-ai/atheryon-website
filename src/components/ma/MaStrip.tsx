import Link from 'next/link'

/**
 * MaStrip — 3-cell strip mirroring HomeStrip structurally, but with
 * consulting-honest content: practice lead, engagement model, approach.
 * No firm-logo lineage cell (that's a tech-product signal that doesn't fit
 * a senior consulting practice); senior-specialist credentials are surfaced
 * as text-led prose instead.
 */

function StripCell({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        background: 'var(--homev3-surface)',
        border: '1px solid var(--homev3-border)',
        borderRadius: 8,
        padding: '26px 24px',
      }}
    >
      <span
        style={{
          display: 'block',
          marginBottom: 18,
          fontSize: 12,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--mode-accent-bright)',
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

const linkStyle: React.CSSProperties = {
  marginTop: 14,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--mode-accent-bright)',
  textDecoration: 'none',
}

const headingStyle: React.CSSProperties = {
  fontWeight: 700,
  fontSize: 16,
  color: '#ffffff',
  letterSpacing: '-0.005em',
  margin: '0 0 10px',
  lineHeight: 1.3,
}

const bodyStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  color: 'var(--homev3-text-soft)',
  margin: 0,
}

const fineStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.55,
  color: 'var(--homev3-text-faint)',
  margin: '8px 0 0',
}

export function MaStrip() {
  return (
    <section style={{ padding: '28px 0 0', position: 'relative', zIndex: 1 }}>
      <div
        className="home-section-container"
        style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}
      >
        <div
          className="home-strip-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          <StripCell label="Practice lead">
            <h3 style={headingStyle}>Anna Contos</h3>
            <p style={bodyStyle}>
              25+ years in financial-services execution. Most recently Head of
              Separation &amp; Integration Advisory at Westpac (2023–2025);
              previously Head of Divestment Execution at Commonwealth Bank for the
              Wealth division.
            </p>
            <p style={fineStyle}>
              The practice is structured around her. AI agents do the volume work;
              the senior specialist sets direction and owns the outcome.
            </p>
            <Link href="/ma/approach" style={linkStyle}>
              Read her track record <span aria-hidden="true">→</span>
            </Link>
          </StripCell>

          <StripCell label="How we engage">
            <h3 style={headingStyle}>Embedded Execution Specialists</h3>
            <p style={bodyStyle}>
              Senior specialists alongside your in-house team — pre-sign if you
              bring us in early, continuous through Day-1, Day-2, and TSA exit.
              Outputs surface where your team can use them.
            </p>
            <p style={fineStyle}>
              Azure-native. APRA CPS 234-aligned controls baseline. Typical
              engagement 6–18 months.
            </p>
            <Link href="/ma/offers" style={linkStyle}>
              See the offer <span aria-hidden="true">→</span>
            </Link>
          </StripCell>

          <StripCell label="Approach">
            <h3 style={headingStyle}>Senior consulting, AI velocity</h3>
            <p style={bodyStyle}>
              Three lifecycle stages — pre-sign execution review, Day-1/Day-2
              readiness, TSA exit. AI agents accelerate dependency mapping,
              control tracing, and TSA tracking that traditionally consume the
              most analyst hours.
            </p>
            <p style={fineStyle}>
              Consulting practice, not a platform. Not licensed software.
            </p>
            <Link href="/ma/approach" style={linkStyle}>
              Read the approach <span aria-hidden="true">→</span>
            </Link>
          </StripCell>
        </div>
      </div>
    </section>
  )
}
