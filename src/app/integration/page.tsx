import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Section,
  SectionDivider,
  Card,
  FeatureCard,
  FeatureGrid,
  Checklist,
} from '@/components'
import { site } from '@/content/site'

const { integration } = site.pages

export const metadata: Metadata = {
  title: integration.title,
  description: integration.description,
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: integration.title,
    description: integration.description,
  },
}

export default function IntegrationPage() {
  return (
    <>
      {/* Hero with CTAs */}
      <section className="relative py-24 md:py-32 overflow-hidden pt-32 md:pt-40">
        <div className="absolute inset-0 bg-gradient-warm" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-500/10 rounded-full shadow-soft">
              <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
              <span className="text-sm font-medium text-neutral-700">S&amp;P Global Integration</span>
            </div>
          </div>

          <h1 className="text-balance text-4xl md:text-5xl lg:text-display font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            {integration.hero.headline}
          </h1>

          <p className="text-lg md:text-subheading text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-10">
            {integration.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={integration.hero.primaryCta.href} className="btn-primary">
              {integration.hero.primaryCta.label}
            </Link>
            <Link href={integration.hero.secondaryCta.href} className="btn-secondary">
              {integration.hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      <Section
        badge={integration.problem.badge}
        title={integration.problem.title}
        description={integration.problem.description}
      >
        <p className="text-base text-neutral-600 max-w-3xl">
          More on this:{' '}
          <Link href={integration.problem.link.href} className="text-brand-orange font-medium hover:underline">
            {integration.problem.link.label}
          </Link>
          .
        </p>
      </Section>

      <SectionDivider />

      <Section
        badge={integration.specialism.badge}
        title={integration.specialism.title}
      >
        <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl mb-6">
          {integration.specialism.body}
        </p>
        <p className="text-base text-neutral-600 max-w-3xl">
          More on our delivery method:{' '}
          <Link href={integration.specialism.methodLink.href} className="text-brand-orange font-medium hover:underline">
            {integration.specialism.methodLink.label}
          </Link>
          .
        </p>
      </Section>

      <SectionDivider />

      <Section
        badge={integration.teraHelix.badge}
        title={integration.teraHelix.title}
        dark
      >
        <p className="text-lg text-neutral-300 leading-relaxed max-w-3xl mb-12">
          {integration.teraHelix.intro}
        </p>
        <FeatureGrid columns={3}>
          {integration.teraHelix.capabilities.map((c) => (
            <Card key={c.title} title={c.title} description={c.description} />
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      <Section
        badge={integration.competitive.badge}
        title={integration.competitive.title}
      >
        <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl">
          {integration.competitive.body}
        </p>
      </Section>

      <SectionDivider />

      <Section
        badge={integration.outcomes.badge}
        title={integration.outcomes.title}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl mb-6">
          <Checklist items={integration.outcomes.items} />
        </div>
        <p className="text-base text-neutral-600 max-w-3xl">
          <Link href={integration.outcomes.link.href} className="text-brand-orange font-medium hover:underline">
            {integration.outcomes.link.label}
          </Link>
          .
        </p>
      </Section>

      <SectionDivider />

      <Section
        badge={integration.engagement.badge}
        title={integration.engagement.title}
      >
        <FeatureGrid columns={3}>
          {integration.engagement.items.map((e) => (
            <FeatureCard
              key={e.title}
              title={e.title}
              description={e.description}
              duration={e.duration}
            />
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      <Section>
        <div className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl">
          <p className="text-base text-slate-600 italic leading-relaxed">
            {integration.disclosure.text}
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-slate-700 mb-10 leading-relaxed">
            {integration.cta.text}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={integration.cta.primary.href} className="btn-primary">
              {integration.cta.primary.label}
            </Link>
            <Link href={integration.cta.secondary.href} className="btn-secondary">
              {integration.cta.secondary.label}
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
