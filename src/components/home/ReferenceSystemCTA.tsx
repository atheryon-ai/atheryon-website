import Link from 'next/link'
import { BrandMark } from './BrandMark'

export function ReferenceSystemCTA() {
  return (
    <section style={{ padding: '32px 0 60px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}>
        <div
          style={{
            background:
              'linear-gradient(90deg, var(--homev3-surface) 0%, var(--homev3-surface-2) 100%)',
            border: '1px solid var(--homev3-border-strong)',
            borderRadius: 8,
            padding: '30px 36px',
            display: 'grid',
            gridTemplateColumns: '88px 1fr auto',
            gap: 28,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at center, rgba(59,130,246,0.35), transparent 65%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(59,130,246,0.35)',
            }}
          >
            <BrandMark size={56} alt="" />
          </div>
          <div>
            <h3
              style={{
                fontSize: 19,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                margin: '0 0 8px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              A Reference System. Proven Architecture.
            </h3>
            <p
              style={{
                margin: 0,
                color: 'var(--homev3-text-soft)',
                fontSize: 14,
                lineHeight: 1.55,
                maxWidth: '60ch',
              }}
            >
              Our end-to-end capital markets AI reference system demonstrates how AI agents,
              data and workflows come together in production.
            </p>
          </div>
          <Link
            href="/system"
            style={{
              color: 'var(--homev3-blue-bright)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            SEE THE SYSTEM ARCHITECTURE →
          </Link>
        </div>
      </div>
    </section>
  )
}
