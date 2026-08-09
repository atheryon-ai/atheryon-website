import type { Metadata } from 'next'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

const page = v3.pages.experience
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
  alternates: { canonical: 'https://atheryon.com.au/experience' },
}

export default function ExperiencePage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      <DocSection label={s.cases.label} title={s.cases.title}>
        <p className="max-w-3xl font-mono text-sm text-charcoal/70 leading-relaxed mb-10">
          {s.cases.provenance}
        </p>

        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.cases.items.map((entry) => (
            <li
              key={entry.id}
              id={entry.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-10 scroll-mt-24"
            >
              <header>
                <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 mb-3">
                  {entry.index}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight mb-3">
                  {entry.name}
                </h3>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 leading-relaxed">
                  {entry.engagement}
                  <br />
                  {entry.client}
                </div>
              </header>

              <dl className="divide-y divide-charcoal/15 border-t border-charcoal/15 md:border-t-0">
                {entry.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-2 sm:gap-6 py-5 first:pt-5 md:first:pt-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
                      {detail.label}
                    </dt>
                    <dd className="text-base md:text-lg text-charcoal/85 leading-relaxed">
                      {detail.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </DocSection>

      {/* Rev 7: Capital Markets cases (Appendix C, verbatim) after the five
          transaction cases — never mixed into the transaction list. Indices
          continue the page's case numbering. */}
      <DocSection label={s.capitalMarketsCases.label} title={s.capitalMarketsCases.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.capitalMarketsCases.items.map((entry, i) => (
            <li
              key={entry.id}
              id={entry.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-10 scroll-mt-24"
            >
              <header>
                <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 mb-3">
                  {String(s.cases.items.length + i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight mb-3">
                  {entry.name}
                </h3>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 leading-relaxed">
                  {entry.engagement}
                  <br />
                  {entry.client}
                </div>
              </header>

              <dl className="divide-y divide-charcoal/15 border-t border-charcoal/15 md:border-t-0">
                {entry.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-2 sm:gap-6 py-5 first:pt-5 md:first:pt-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
                      {detail.label}
                    </dt>
                    <dd className="text-base md:text-lg text-charcoal/85 leading-relaxed">
                      {detail.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocFooter label="atheryon / experience / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
