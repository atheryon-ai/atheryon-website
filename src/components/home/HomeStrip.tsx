import { v2 } from '@/content/site'

// Engagement names come from v2.engagement (canonical, per CLAUDE.md).
// Short homepage-tuned descriptions and icons stay here — they're tighter
// than v2.engagement.body for card display.
type EngagementId = (typeof v2.engagement)[number]['id']

const engagementMeta: Record<EngagementId, { desc: string; icon: React.ReactNode }> = {
  advisory: {
    desc: 'System strategy and architecture design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  enablement: {
    desc: 'Reference architectures and AI workflows',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <polygon points="12,3 21,8 12,13 3,8" />
        <polyline points="3,12 12,17 21,12" />
        <polyline points="3,16 12,21 21,16" />
      </svg>
    ),
  },
  delivery: {
    desc: 'End-to-end system delivery and deployment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  'licensed-system': {
    desc: 'Deployable reference system architecture',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h6M9 15h4" />
      </svg>
    ),
  },
}

function StripCell({ label, children }: { label: string; children: React.ReactNode }) {
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
          marginBottom: 22,
          fontSize: 12,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--homev3-blue-bright)',
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

export function HomeStrip() {
  return (
    <section style={{ padding: '28px 0 0', position: 'relative', zIndex: 1 }}>
      <div className="home-section-container" style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}>
        <div
          className="home-strip-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 0.85fr 1.4fr',
            gap: 24,
          }}
        >
          <StripCell label="Proven Capital Markets Experience">
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', marginBottom: 18 }}>
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontWeight: 700,
                  fontSize: 17,
                  color: '#ffffff',
                  lineHeight: 1.1,
                }}
              >
                Goldman
                <br />
                Sachs
              </span>
              <span style={{ fontWeight: 700, fontSize: 17, color: '#ffffff', lineHeight: 1.1 }}>
                CREDIT
                <br />
                SUISSE
              </span>
              <span style={{ fontWeight: 700, fontSize: 17, color: '#ffffff', lineHeight: 1.1 }}>
                BARCLAYS
                <br />
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--homev3-text-faint)',
                    marginTop: 2,
                    display: 'block',
                  }}
                >
                  CAPITAL
                </span>
              </span>
            </div>
            <p style={{ color: 'var(--homev3-text-soft)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>
              Deep experience building large-scale capital markets systems at leading global
              institutions.
            </p>
          </StripCell>

          <StripCell label="Ecosystem Partners">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 1,
                      width: 18,
                      height: 18,
                    }}
                  >
                    <span style={{ background: '#f25022' }} />
                    <span style={{ background: '#7fba00' }} />
                    <span style={{ background: '#00a4ef' }} />
                    <span style={{ background: '#ffb900' }} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: 16, color: '#ffffff' }}>
                    Microsoft
                    <br />
                    Azure
                  </span>
                </div>
                <p style={{ fontSize: 12, color: 'var(--homev3-text-faint)', margin: 0, lineHeight: 1.5 }}>
                  Cloud infrastructure
                  <br />
                  and AI services
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#e02020' }}>S&amp;P Global</span>
                <p style={{ fontSize: 12, color: 'var(--homev3-text-faint)', margin: 0, lineHeight: 1.5 }}>
                  Market data
                  <br />
                  and intelligence
                </p>
              </div>
            </div>
          </StripCell>

          <StripCell label="Engagement Model">
            <div className="home-strip-engagement-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {v2.engagement.map((e) => {
                const meta = engagementMeta[e.id]
                return (
                <div
                  key={e.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      background: 'var(--homev3-surface-2)',
                      border: '1px solid var(--homev3-border)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 4,
                      color: 'var(--homev3-blue-bright)',
                    }}
                  >
                    <span style={{ width: 20, height: 20, display: 'block' }}>{meta.icon}</span>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#ffffff',
                    }}
                  >
                    {e.name}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--homev3-text-faint)', lineHeight: 1.45 }}>
                    {meta.desc}
                  </span>
                </div>
                )
              })}
            </div>
          </StripCell>
        </div>
      </div>
    </section>
  )
}
