import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocBullets, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

const page = v3.pages.capitalMarkets
const s = page.sections

// TODO(terry): {{CM_PRINCIPLE}} — the arm's principle statement renders
// here once supplied (principles live with the sub pages, 2026-08-09).
const showPrinciple = !isPending(s.principle.statement)

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

      {showPrinciple && (
        <DocSection>
          <div className="max-w-4xl py-4 md:py-8">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal leading-[1.12]">
              {s.principle.statement}
            </p>
          </div>
        </DocSection>
      )}

      <DocSection label={s.outcomes.label} title={s.outcomes.title}>
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

      {/* The arm's experience section — CM cases render here only, never on
          /experience (Terry 2026-08-09). Anchor: /capital-markets#experience */}
      <DocSection id="experience" label={s.cases.label} title={s.cases.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.cases.items.map((entry, i) => (
            <li
              key={entry.id}
              id={entry.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-10 scroll-mt-24"
            >
              <header>
                <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 mb-3">
                  {String(i + 1).padStart(2, '0')}
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

      <DocSection label={s.examples.label} title={s.examples.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.examples.items.map((example) => (
            <li
              key={example.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(16rem,0.5fr)_minmax(0,1.5fr)] gap-2 md:gap-8 py-6"
            >
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {example.name}
              </h3>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
                {example.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection label={s.delivery.label} title={s.delivery.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.delivery.body}
        </p>
      </DocSection>

      <DocSection label={s.depth.label} title={s.depth.title}>
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
