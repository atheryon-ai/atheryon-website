import type { Metadata } from 'next'
import { Section, SectionDivider, BulletList, ArrowRightIcon } from '@/components'
import { site } from '@/content/site'

const { labsPrompts } = site.pages

export const metadata: Metadata = {
  title: labsPrompts.title,
  description: labsPrompts.description,
  openGraph: { title: labsPrompts.title, description: labsPrompts.description },
  twitter: {
    card: 'summary_large_image',
    title: labsPrompts.title,
    description: labsPrompts.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/labs/prompts',
  },
}

export default function LabsPromptsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-warm-50 to-warm-100">
        <div className="max-w-container mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-orange mb-4">
            {labsPrompts.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            {labsPrompts.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-neutral-700 max-w-3xl leading-relaxed">
            {labsPrompts.hero.lede}
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* What you get */}
      <Section badge={labsPrompts.whatYouGet.badge} title={labsPrompts.whatYouGet.title}>
        <div className="max-w-3xl">
          <BulletList items={labsPrompts.whatYouGet.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* Best for */}
      <Section badge={labsPrompts.bestFor.badge} title={labsPrompts.bestFor.title}>
        <div className="max-w-3xl">
          <BulletList items={labsPrompts.bestFor.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* Pricing */}
      <Section badge={labsPrompts.pricing.badge} title={labsPrompts.pricing.title}>
        <div className="max-w-3xl">
          <p className="text-lg text-neutral-700 leading-relaxed">{labsPrompts.pricing.body}</p>
        </div>
      </Section>

      <SectionDivider />

      {/* Final CTA */}
      <Section>
        <div className="text-center">
          <a
            href={labsPrompts.cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all shadow-button"
          >
            {labsPrompts.cta.label}
            <ArrowRightIcon />
          </a>
        </div>
      </Section>
    </main>
  )
}
