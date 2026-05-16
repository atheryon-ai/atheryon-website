import Link from 'next/link'

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

          <StripCell label="Offers">
            <div className="home-strip-engagement-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { id: 'code',    title: 'Buy the code',    desc: 'License the labs platform code',  href: '/offers/code' },
                { id: 'prompts', title: 'License prompts', desc: 'Directorial archive + bundles',   href: '/offers/prompts' },
                { id: 'consult', title: 'Consult',         desc: 'Senior-led advisory engagement',   href: '/offers/consult' },
              ].map((o) => (
                <Link
                  key={o.id}
                  href={o.href}
                  style={{
                    background: 'var(--homev3-surface)',
                    border: '1px solid var(--homev3-border)',
                    borderRadius: 6,
                    padding: '14px 16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    minHeight: 84,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>{o.title}</span>
                  <span style={{ fontSize: 11, color: 'var(--homev3-text-soft)' }}>{o.desc}</span>
                </Link>
              ))}
            </div>
          </StripCell>
        </div>
      </div>
    </section>
  )
}
