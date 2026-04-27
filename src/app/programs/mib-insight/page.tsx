import type { Metadata } from 'next'
import { Section, SectionDivider } from '@/components'
import { site } from '@/content/site'

const { mibInsight } = site.pages

export const metadata: Metadata = {
  title: mibInsight.title,
  description: mibInsight.description,
  openGraph: {
    title: mibInsight.title,
    description: mibInsight.description,
  },
}

export default function MibInsightPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-warm-50 to-warm-100">
        <div className="max-w-container mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange mb-4">
            {mibInsight.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            {mibInsight.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-10">
            {mibInsight.hero.subheadline}
          </p>
          <div className="inline-flex flex-col items-center gap-3 bg-white px-8 py-6 rounded-3xl shadow-card">
            <div className="text-4xl md:text-5xl font-bold text-neutral-900">
              {mibInsight.hero.price}
            </div>
            <div className="text-sm text-neutral-600">{mibInsight.hero.priceFootnote}</div>
            <a
              href={mibInsight.hero.ctaHref}
              className="mt-2 inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-button"
            >
              {mibInsight.hero.ctaLabel}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Final CTA */}
      <Section title={mibInsight.finalCta.title}>
        <div className="text-center">
          <p className="text-lg text-neutral-700 mb-8">{mibInsight.finalCta.subtitle}</p>
          <a
            href={mibInsight.finalCta.ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-button"
          >
            {mibInsight.finalCta.ctaLabel}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </Section>
    </main>
  )
}
