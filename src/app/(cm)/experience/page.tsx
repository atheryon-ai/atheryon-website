import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

// Stacked, not a chooser (Terry 2026-08-15). This route used to be a title and
// two links: a fork the visitor had to resolve before seeing anything. It now
// lists both arms' cases in order, M&A first, with each arm's own page holding
// the full context / role / outcome detail.
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
        const source = SOURCES[arm.sourceKey as keyof typeof SOURCES]
        const cases = source.sections.cases
        return (
          <DocSection key={arm.href} label={arm.label} title={cases.title}>
            <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
              {cases.items.map((item, index) => (
                <li
                  key={item.id}
                  className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_minmax(0,1fr)] gap-x-5 md:gap-x-8 gap-y-2 py-6"
                >
                  <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55 pt-1">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-charcoal/60">
                      {item.client} · {item.engagement}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href={arm.href}
              className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/70 hover:text-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              {arm.label} in full
              <span aria-hidden="true">→</span>
            </Link>
          </DocSection>
        )
      })}

      <DocFooter label="atheryon / experience / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
