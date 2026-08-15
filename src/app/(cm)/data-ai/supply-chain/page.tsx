import type { Metadata } from 'next'
import { ArmSubNav } from '@/components/ArmSubNav'
import { DocBanner, DocFooter, DocList, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

const page = v3.pages.dataAiSupplyChain
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
  alternates: { canonical: 'https://atheryon.com.au/data-ai/supply-chain' },
}

export default function DataAiSupplyChainPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />
      {/* Supply chain is an application of function 2, not a fifth sub-nav
          item: the row marks Overview so the visitor can get back (spec §4). */}
      <ArmSubNav base="/data-ai" active="overview" />

      <DocSection label={s.work.label} title={s.work.title}>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.work.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </DocSection>

      <DocSection label={s.history.label} title={s.history.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.history.entries.map((entry, i) => (
            <li
              key={entry.name}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_minmax(16rem,0.6fr)_minmax(0,1.4fr)] gap-x-5 md:gap-x-8 gap-y-2 py-6"
            >
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55 pt-1">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {entry.name}
              </h3>
              <p className="col-start-2 md:col-start-3 text-base text-charcoal/85 leading-relaxed max-w-3xl">
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection label={s.parallel.label} title={s.parallel.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {s.parallel.lead}
        </p>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.parallel.entries.map((entry) => (
            <li
              key={entry.name}
              className="grid grid-cols-1 md:grid-cols-[minmax(16rem,0.5fr)_minmax(0,1.5fr)] gap-2 md:gap-8 py-6"
            >
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {entry.name}
              </h3>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection label={s.services.label} title={s.services.title}>
        <div className="max-w-3xl">
          <DocList items={s.services.items} />
          <p className="mt-8 text-base md:text-lg text-charcoal/85 leading-relaxed">
            {s.services.closing}
          </p>
        </div>
      </DocSection>

      <DocFooter label="atheryon / data-ai / supply-chain / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
