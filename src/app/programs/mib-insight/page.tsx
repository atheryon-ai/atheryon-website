import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { mibInsight } = site.pages

export const metadata: Metadata = {
  title: mibInsight.title,
  description: mibInsight.description,
  openGraph: {
    title: mibInsight.title,
    description: mibInsight.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: mibInsight.title,
    description: mibInsight.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/programs/mib-insight',
  },
}

export default function MibInsightPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / programs / mib-insight"
        title={mibInsight.hero.headline}
        body={mibInsight.hero.subheadline}
      />

      {/* Price + primary action */}
      <DocSection label="§00 / Enrolment" title="">
        <div className="border border-charcoal/30 bg-white p-6 md:p-8 max-w-xl flex flex-col gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60">
            Price
          </div>
          <div className="font-display text-4xl md:text-5xl font-medium text-charcoal tracking-tight leading-none">
            {mibInsight.hero.price}
          </div>
          <div className="font-mono text-xs text-charcoal/60">
            {mibInsight.hero.priceFootnote}
          </div>
          <a
            href={mibInsight.hero.ctaHref}
            className="mt-2 inline-flex self-start items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {mibInsight.hero.ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </DocSection>

      <DocSection label="§01 / Who It's For" title={mibInsight.whoItsFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={mibInsight.whoItsFor.items} />
          <p className="mt-8 text-base text-charcoal/70 italic">
            {mibInsight.whoItsFor.commonThread}
          </p>
        </div>
      </DocSection>

      <DocSection label="§02 / What's Included" title={mibInsight.whatsIncluded.title}>
        <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl mb-10">
          {mibInsight.whatsIncluded.intro}
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
          {mibInsight.whatsIncluded.artifactTypes.map((item, i) => (
            <li key={item.title} className="bg-bone p-6 flex flex-col">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl font-medium text-charcoal tracking-tight leading-snug mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection label="§03 / Outcomes" title={mibInsight.outcomes.title}>
        <div className="max-w-3xl">
          <DocBullets items={mibInsight.outcomes.items} />
        </div>
      </DocSection>

      <DocSection label="§04 / Curriculum" title={mibInsight.curriculum.title}>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
          {mibInsight.curriculum.modules.map((module, idx) => (
            <li key={module.name} className="bg-bone p-6 flex flex-col">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
                module {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl font-medium text-charcoal tracking-tight leading-snug mb-2">
                {module.name}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {module.description}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection label="§05 / FAQ" title={mibInsight.faq.title}>
        <div className="divide-y divide-charcoal/15 border-y border-charcoal/15 max-w-3xl">
          {mibInsight.faq.items.map((item, i) => (
            <details key={i} className="group">
              <summary className="flex items-baseline justify-between cursor-pointer py-5 gap-6 list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg md:text-xl font-medium text-charcoal tracking-tight">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-charcoal/60 group-open:rotate-45 transition-transform select-none"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-base text-charcoal/80 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / programs / mib-insight / end-of-document
          </div>
          <a
            href={mibInsight.finalCta.ctaHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {mibInsight.finalCta.ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </DocPage>
  )
}
