import type { Metadata } from 'next'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

// One Experience page (Terry 2026-08-15): full Context / Role / Outcome for
// both functions, function 1 first. Function-path URLs 301 here with hashes.
const page = v3.pages.experience
const s = page.sections

const SOURCES = {
  maExperience: v3.pages.maExperience,
  cmExperience: v3.pages.cmExperience,
} as const

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

      {s.arms.map((arm) => {
        const source = SOURCES[arm.sourceKey]
        const cases = source.sections.cases
        return (
          <DocSection key={arm.id} id={arm.id} label={arm.label} title={cases.title}>
            {'provenance' in cases && cases.provenance && (
              <p className="max-w-3xl font-mono text-sm text-charcoal/70 leading-relaxed mb-10">
                {cases.provenance}
              </p>
            )}

            <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
              {cases.items.map((entry, i) => (
                <li
                  key={entry.id}
                  id={entry.id}
                  className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-10 scroll-mt-24"
                >
                  <header>
                    <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55 mb-3">
                      {'index' in entry ? entry.index : String(i + 1).padStart(2, '0')}
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
        )
      })}

      <DocFooter label="atheryon / experience / end-of-document" />
    </DocPage>
  )
}
