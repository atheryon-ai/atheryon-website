import type { Metadata } from 'next'
import { Section, SectionDivider, Card, Checklist, FAQ, ArrowRightIcon } from '@/components'
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
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Who it's for */}
      <Section badge={mibInsight.whoItsFor.badge} title={mibInsight.whoItsFor.title}>
        <div className="max-w-3xl mx-auto">
          <Checklist items={mibInsight.whoItsFor.items} />
          <p className="mt-8 text-neutral-600 italic text-center">{mibInsight.whoItsFor.commonThread}</p>
        </div>
      </Section>

      <SectionDivider />

      {/* What's included */}
      <Section badge={mibInsight.whatsIncluded.badge} title={mibInsight.whatsIncluded.title}>
        <p className="text-lg text-neutral-700 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
          {mibInsight.whatsIncluded.intro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mibInsight.whatsIncluded.artifactTypes.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* Outcomes */}
      <Section badge={mibInsight.outcomes.badge} title={mibInsight.outcomes.title}>
        <div className="max-w-3xl mx-auto">
          <Checklist items={mibInsight.outcomes.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* Curriculum */}
      <Section badge={mibInsight.curriculum.badge} title={mibInsight.curriculum.title}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mibInsight.curriculum.modules.map((module, idx) => (
            <div key={module.name} className="bg-white p-6 rounded-2xl border border-neutral-500/10 shadow-soft">
              <div className="text-sm font-semibold text-brand-orange mb-2">Module {idx + 1}</div>
              <h3 className="font-display text-xl font-semibold text-neutral-900 mb-3 tracking-tight">{module.name}</h3>
              <p className="text-neutral-600 leading-relaxed">{module.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* FAQ */}
      <Section badge={mibInsight.faq.badge} title={mibInsight.faq.title}>
        <FAQ items={mibInsight.faq.items} />
      </Section>

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
            <ArrowRightIcon />
          </a>
        </div>
      </Section>
    </main>
  )
}
