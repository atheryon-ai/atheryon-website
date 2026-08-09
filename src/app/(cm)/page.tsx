import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBullets, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

const page = v3.pages.home
const s = page.sections

// Poster palette (rev 6, docs/superpowers/specs/atheryon-poster-2026-08-09.svg).
// Scoped to the hero band only — the full-site re-token is phase 4.
const BAND = {
  navy: '#0E2A3A',
  warmWhite: '#FAF9F7',
  bronze: '#B08D57',
}

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/' },
}

export default function HomePage() {
  return (
    <DocPage>
      {/* Viewport 1 — the poster band: three-line serif hero, subheading,
          arms with bronze ticks, foundation rule + strip, primary CTA. */}
      <section style={{ backgroundColor: BAND.navy }}>
        <div className="max-w-container mx-auto px-6 pt-20 md:pt-28 pb-14 md:pb-20">
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.06] max-w-5xl"
            style={{ color: BAND.warmWhite }}
          >
            {s.hero.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 font-display text-xl md:text-2xl leading-snug max-w-3xl"
            style={{ color: BAND.warmWhite, opacity: 0.92 }}
          >
            {s.hero.subheading}
          </p>

          <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 max-w-2xl">
            {s.arms.items.map((arm) => (
              <div key={arm.id}>
                <div
                  aria-hidden="true"
                  className="mb-4"
                  style={{ width: 40, height: 2, backgroundColor: BAND.bronze }}
                />
                <Link
                  href={arm.href}
                  className="font-sans font-semibold text-base md:text-lg tracking-[0.14em] underline-offset-8 hover:underline"
                  style={{ color: BAND.warmWhite }}
                >
                  {arm.label}
                </Link>
              </div>
            ))}
          </div>

          <div
            className="mt-10 md:mt-12 pt-7"
            style={{ borderTop: `1.5px solid rgba(176, 141, 87, 0.6)` }}
          >
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-bronze">
              {s.arms.underpinning.items.join(' · ')}
            </span>
          </div>

          <Link
            href={s.hero.primaryCta.href}
            className="mt-12 md:mt-14 inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium uppercase tracking-[0.10em] transition-colors hover:bg-white/10"
            style={{ color: BAND.warmWhite, border: `1px solid ${BAND.bronze}` }}
          >
            {s.hero.primaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Section 2 — existing ground: supporting copy (Appendix B verbatim),
          secondary CTA, proof strip. */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-12 md:py-16">
          <p className="text-lg md:text-xl text-charcoal/85 leading-relaxed max-w-3xl mb-8">
            {s.hero.supporting}
          </p>
          <Link
            href={s.hero.secondaryCta.href}
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline mb-12"
          >
            {s.hero.secondaryCta.label}
            <span aria-hidden="true">→</span>
          </Link>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-y border-charcoal/15 divide-y sm:divide-y-0 divide-charcoal/15">
            {s.proof.items.map((item) => (
              <li key={item.id} className="py-6 sm:py-8 sm:px-6 first:sm:pl-0 lg:border-l lg:border-charcoal/15 lg:first:border-l-0">
                <div className="font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal">
                  {item.value}
                </div>
                <div className="mt-2 text-sm text-charcoal/70 leading-relaxed">
                  {item.detail}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DocSection label={s.founders.label} title={s.founders.title}>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.founders.items.map((founder) => (
            <li
              key={founder.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(12rem,0.4fr)_minmax(0,1.6fr)] gap-2 md:gap-8 py-6"
            >
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {founder.name}
              </h3>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed">{founder.line}</p>
            </li>
          ))}
        </ul>
        <Link
          href={s.founders.href}
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
        >
          {s.founders.ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </DocSection>

      {/* The core IP statement: once site-wide, large type, founding framing. */}
      <DocSection label={s.principle.label}>
        <div className="max-w-4xl py-4 md:py-8">
          <p className="font-mono text-sm text-charcoal/70 mb-6">{s.principle.framing}</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal leading-[1.12]">
            {s.principle.statement}
          </p>
          <p className="mt-8 text-base md:text-lg text-charcoal/75 leading-relaxed max-w-3xl">
            {s.principle.support}
          </p>
        </div>
      </DocSection>

      <DocSection label={s.why.label} title={s.why.title}>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.why.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 max-w-3xl">
          <p className="text-base md:text-lg text-charcoal/85 mb-4">{s.why.helpIntro}</p>
          <DocBullets items={[...s.why.helpItems]} />
        </div>
      </DocSection>

      <DocSection label={s.values.label} title={s.values.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.values.items.map((value, i) => (
            <li
              key={value.id}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_minmax(14rem,0.6fr)_minmax(0,1.4fr)] gap-x-5 md:gap-x-8 gap-y-2 py-6"
            >
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 pt-1">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {value.name}
              </h3>
              <p className="col-start-2 md:col-start-3 text-base text-charcoal/85 leading-relaxed max-w-3xl">
                {value.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocFooter label="atheryon / overview / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
