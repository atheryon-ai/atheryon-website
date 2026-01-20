import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, Card, FeatureGrid, Checklist, CTASection } from '@/components'
import { site } from '@/content/site'

const { aiReadyData } = site.pages

export const metadata: Metadata = {
  title: aiReadyData.title,
  description: aiReadyData.description,
  openGraph: {
    title: aiReadyData.title,
    description: aiReadyData.description,
  },
}

export default function AiReadyDataPage() {
  return (
    <>
      <SimpleHero
        headline={aiReadyData.hero.headline}
        subheadline={aiReadyData.hero.subheadline}
        badge="AI Foundation"
      />

      <SectionDivider />

      {/* Why AI Fails */}
      <Section
        badge={aiReadyData.whyAiFails.badge}
        title={aiReadyData.whyAiFails.title}
      >
        <FeatureGrid columns={3}>
          {aiReadyData.whyAiFails.items.map((item, index) => (
            <Card key={index} title={item.title} description={item.description} />
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      {/* What AI-Ready Means */}
      <Section
        badge={aiReadyData.whatAiReadyMeans.badge}
        title={aiReadyData.whatAiReadyMeans.title}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl">
          <Checklist items={aiReadyData.whatAiReadyMeans.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* How We Enable AI */}
      <Section
        badge={aiReadyData.howWeEnable.badge}
        title={aiReadyData.howWeEnable.title}
      >
        <FeatureGrid columns={3}>
          {aiReadyData.howWeEnable.items.map((item, index) => (
            <Card key={index} title={item.title} description={item.description} />
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      {/* Disclaimer */}
      <Section>
        <div className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl">
          <p className="text-lg text-slate-600 italic">
            {aiReadyData.disclaimer.text}
          </p>
        </div>
      </Section>

      <CTASection
        text="Ready to create the conditions for AI success?"
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
