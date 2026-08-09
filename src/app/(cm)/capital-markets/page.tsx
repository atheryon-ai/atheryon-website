import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocBullets, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v2Ma, v3 } from '@/content/site'

const page = v3.pages.capitalMarkets
const s = page.sections

// The three delivery workflows are shared with the retiring M&A pages; the
// data stays in v2Ma until every consumer is gone (spec §6).
const workflows = v2Ma.approach.sections.workflowExamples

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

      <DocSection label={s.outcomes.label} title={s.outcomes.title}>
        <div className="max-w-3xl mb-8">
          <DocBullets items={[...s.outcomes.items]} />
        </div>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.outcomes.body}
        </p>
      </DocSection>

      <DocSection label={s.workflows.label} title={s.workflows.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-10">
          {s.workflows.intro}
        </p>

        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {workflows.items.map((workflow) => (
            <li key={workflow.id} id={workflow.id} className="py-8 md:py-10 scroll-mt-24">
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight mb-6">
                {workflow.name}
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(
                  [
                    ['Input', workflow.input],
                    ['AI agents', workflow.agents],
                    ['Processing', workflow.processing],
                    ['Output', workflow.output],
                  ] as const
                ).map(([label, body]) => (
                  <div key={label}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/60 mb-2">
                      {label}
                    </dt>
                    <dd className="text-sm text-charcoal/85 leading-relaxed">{body}</dd>
                  </div>
                ))}
              </dl>
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

      <DocFooter label="atheryon / capital-markets / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
