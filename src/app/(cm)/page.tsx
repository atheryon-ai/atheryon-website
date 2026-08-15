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
        cta={s.hero.primaryCta}
      />

      {/* Section 2 — document register opens: supporting copy (Appendix B
          verbatim) and the three equal explore links (Terry 2026-08-09). */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-12 md:py-16">
          <p className="text-lg md:text-xl text-charcoal/85 leading-relaxed max-w-3xl mb-8">
            {s.hero.supporting}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
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

      {/* Parallel function sections (Terry 2026-08-09): the front page splits
          evenly, with the transaction proof under function 1 and the $84M
          proof point under function 2. Principles live with the sub pages. */}
      <DocSection label={s.maSection.label} title={s.maSection.title}>
        <ProofStrip items={s.maSection.proof.items} />
      </DocSection>

      <DocSection label={s.cmSection.label} title={s.cmSection.title}>
        <ProofStrip items={s.cmSection.proof.items} />
        <p className="mt-8 max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
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

      <DocFooter label="atheryon / overview / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
