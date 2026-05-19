import Link from 'next/link'

/**
 * MaWhenClientsCallUs — mirrors BuiltForGrid structurally (3 cards row with
 * caps headline above) but with consulting-honest content: when clients
 * actually call the practice. The first three triggers are surfaced as
 * cards; the remaining two are mentioned as a deferred-link below.
 */

type Trigger = { kicker: string; title: string; body: string }

const CARDS: ReadonlyArray<Trigger> = [
  {
    kicker: 'The wedge',
    title: 'Late-stage deal negotiation',
    body: 'Draft terms are forming. The execution implications need a specialist read before signing. The highest-leverage moment to engage us.',
  },
  {
    kicker: 'Most common',
    title: 'Transaction delivery',
    body: 'Deal is signed; integration or separation is underway. Senior execution leadership in the delivery seat. AI-velocity on dependency mapping, control tracing, TSA tracking.',
  },
  {
    kicker: 'Capacity',
    title: 'Execution capability gaps',
    body: 'Internal team is competent but stretched. We embed senior specialists alongside, with agent acceleration on the analytical work.',
  },
]

export function MaWhenClientsCallUs() {
  return (
    <section style={{ padding: '16px 0 0', position: 'relative', zIndex: 1 }}>
      <div
        className="home-section-container"
        style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}
      >
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
          When clients call us
        </div>
        <div
          className="home-builtfor-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {CARDS.map((card, i) => (
            <article
              key={card.title}
              style={{
                background: 'var(--homev3-surface)',
                border: '1px solid var(--homev3-border)',
                borderRadius: 8,
                padding: '32px 28px',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--mode-accent-bright)',
                  marginBottom: 14,
                }}
              >
                {String(i + 1).padStart(2, '0')} &middot; {card.kicker}
              </div>
              <h3
                style={{
                  fontSize: 19,
                  fontWeight: 700,
                  lineHeight: 1.25,
                  margin: '0 0 14px',
                  color: '#ffffff',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  color: 'var(--homev3-text-soft)',
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {card.body}
              </p>
            </article>
          ))}
        </div>
        <p
          style={{
            textAlign: 'center',
            marginTop: 24,
            fontSize: 13,
            color: 'var(--homev3-text-faint)',
          }}
        >
          Also: pre-deal planning deficits &middot; data migration risk &middot;{' '}
          <Link
            href="/ma/approach"
            style={{
              color: 'var(--mode-accent-bright)',
              textDecoration: 'none',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontSize: 11,
            }}
          >
            See the full approach →
          </Link>
        </p>
      </div>
    </section>
  )
}
