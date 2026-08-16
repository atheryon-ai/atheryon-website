import type { Metadata } from 'next'
import Link from 'next/link'
import { DocFooter, DocPage, DocSection } from '@/components/Doc'
import { ProofStrip, StatementBand } from '@/components/brand'
import { v3 } from '@/content/site'

const page = v3.pages.home
const s = page.sections

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
      {/* Viewport 1 — the poster band (rev 6). The StatementBand renders
          once site-wide, here. */}
      <StatementBand
        lines={s.hero.lines}
        subheading={s.hero.subheading}
        arms={s.arms.items}
        underpinning={s.arms.underpinning.items}
      />

      {/* Document register: who / what / who for, then firm-level
          credentials, then the two explore links. Case write-ups live
          on the function pages. */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-12 md:py-16">
          <p className="text-lg md:text-xl text-charcoal/85 leading-relaxed max-w-3xl mb-8">
            {s.hero.supporting}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight mb-8">
            {s.trackRecord.title}
          </h2>
          <ProofStrip items={s.trackRecord.items} />
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-4">
            {s.hero.explore.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-3xl">
            {s.hero.explore.items.map((entry) => (
              <Link
                key={entry.id}
                href={entry.href}
                className="inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
              >
                {entry.label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DocSection label={s.maSection.label} title={s.maSection.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {s.maSection.intro}
        </p>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.maSection.supporting}
        </p>
      </DocSection>

      <DocSection label={s.cmSection.label} title={s.cmSection.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {s.cmSection.intro}
        </p>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.cmSection.line}
        </p>
      </DocSection>

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

      <DocFooter label="atheryon / overview / end-of-document" />
    </DocPage>
  )
}
