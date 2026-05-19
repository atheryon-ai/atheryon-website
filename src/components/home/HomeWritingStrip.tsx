import Link from 'next/link'

/**
 * HomeWritingStrip — subtle tail strip on the homepage surfacing the latest
 * post. Single-row link: caption · title · meta · arrow. Hairline borders
 * top/bottom, no fill. Designed to read as an outro, not a CTA.
 *
 * Data is inlined intentionally: one source of truth for "latest post" lives
 * in the /blog index. This strip is a manual mirror — when a new post lands,
 * update both. Cheaper than a build-time data layer for current volume.
 */
export function HomeWritingStrip() {
  return (
    <section style={{ padding: '0 0 40px', position: 'relative', zIndex: 1 }}>
      <div
        className="home-section-container"
        style={{ maxWidth: 1340, margin: '0 auto', padding: '0 40px' }}
      >
        <Link
          href="/blog/why-claude"
          className="home-writing-strip"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 18,
            padding: '18px 4px',
            borderTop: '1px solid var(--homev3-border)',
            borderBottom: '1px solid var(--homev3-border)',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--mode-accent-bright)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Latest writing
          </span>
          <span
            style={{
              flex: '1 1 auto',
              minWidth: 0,
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
            }}
          >
            Why we built our capital markets agent stack on Claude
          </span>
          <span
            style={{
              fontSize: 12,
              color: 'var(--homev3-text-faint)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              whiteSpace: 'nowrap',
            }}
          >
            <span>19 May 2026 &middot; 6 min</span>
            <span style={{ color: 'var(--mode-accent-bright)' }}>→</span>
          </span>
        </Link>
      </div>
    </section>
  )
}
