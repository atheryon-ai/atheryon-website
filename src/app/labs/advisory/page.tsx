import type { Metadata } from 'next'
import { Section, SectionDivider, BulletList, ArrowRightIcon } from '@/components'
import { site } from '@/content/site'

const { labsAdvisory } = site.pages

export const metadata: Metadata = {
  title: labsAdvisory.title,
  description: labsAdvisory.description,
  openGraph: { title: labsAdvisory.title, description: labsAdvisory.description },
  twitter: {
    card: 'summary_large_image',
    title: labsAdvisory.title,
    description: labsAdvisory.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/labs/advisory',
  },
}

export default function LabsAdvisoryPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-warm-50 to-warm-100">
        <div className="max-w-container mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange mb-4">
            {labsAdvisory.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            {labsAdvisory.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl leading-relaxed">
            {labsAdvisory.hero.lede}
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* What you get */}
      <Section badge={labsAdvisory.whatYouGet.badge} title={labsAdvisory.whatYouGet.title}>
        <div className="max-w-3xl">
          <BulletList items={labsAdvisory.whatYouGet.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* Best for */}
      <Section badge={labsAdvisory.bestFor.badge} title={labsAdvisory.bestFor.title}>
        <div className="max-w-3xl">
          <BulletList items={labsAdvisory.bestFor.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* Pricing */}
      <Section badge={labsAdvisory.pricing.badge} title={labsAdvisory.pricing.title}>
        <div className="max-w-3xl">
          <p className="text-lg text-neutral-700 leading-relaxed">{labsAdvisory.pricing.body}</p>
        </div>
      </Section>

      <SectionDivider />

      {/* Final CTA */}
      <Section>
        <div className="text-center">
          <a
            href={labsAdvisory.cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-button"
          >
            {labsAdvisory.cta.label}
            <ArrowRightIcon />
          </a>
        </div>
      </Section>
    </div>
  )
}
