import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocBullets, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

const page = v3.pages.capitalMarkets
const s = page.sections

// Rev 7: standalone capital-markets content only. The cases and examples
// sections stay hidden while their {{...}} blanks are pending, so § numbers
// are assigned to the visible sections at render time — a static sequence
// would show gaps until Terry fills the blanks.
const visibleCases = s.cases.items.filter((entry) => !isPending(entry.body))
const showCases = visibleCases.length > 0
const showExamples = !isPending(s.examples.body)

const sectionOrder = [
  ['outcomes', true],
  ['cases', showCases],
  ['examples', showExamples],
  ['delivery', true],
  ['depth', true],
] as const

const sectionNumber = new Map<string, string>()
let n = 0
for (const [id, visible] of sectionOrder) {
  if (visible) {
    n += 1
    sectionNumber.set(id, `§${String(n).padStart(2, '0')}`)
  }
}

const kicker = (id: string, name: string) => `${sectionNumber.get(id)} / ${name}`

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/capital-markets' },
}

export default function CapitalMarketsPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      <DocSection label={kicker('outcomes', s.outcomes.label)} title={s.outcomes.title}>
        <div className="max-w-3xl mb-8">
          <DocBullets items={[...s.outcomes.items]} />
        </div>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.outcomes.body}
        </p>
        <p className="mt-8">
          <Link
            href={s.outcomes.crossLink.href}
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
          >
            {s.outcomes.crossLink.text}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </DocSection>

      {showCases && (
        <DocSection label={kicker('cases', s.cases.label)} title={s.cases.title}>
          <div className="max-w-3xl space-y-10">
            {visibleCases.map((entry) => (
              <div key={entry.id} className="space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
                {entry.body.split('\n\n').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        </DocSection>
      )}

      {showExamples && (
        <DocSection label={kicker('examples', s.examples.label)} title={s.examples.title}>
          <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
            {s.examples.body.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </DocSection>
      )}

      <DocSection label={kicker('delivery', s.delivery.label)} title={s.delivery.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.delivery.body}
        </p>
      </DocSection>

      <DocSection label={kicker('depth', s.depth.label)} title={s.depth.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {s.depth.intro}
        </p>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.depth.links.map((link) => (
            <li key={link.href} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-2 sm:gap-6 py-5">
              <Link
                href={link.href}
                className="font-display text-lg md:text-xl font-medium text-charcoal border-b border-charcoal/30 hover:border-charcoal transition-colors w-fit"
              >
                {link.label}
              </Link>
              <p className="text-base text-charcoal/75 leading-relaxed">{link.note}</p>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocFooter label="atheryon / capital markets / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
