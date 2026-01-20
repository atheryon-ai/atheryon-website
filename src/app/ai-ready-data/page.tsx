import type { Metadata } from 'next'
import { Hero, Section, Card, FeatureGrid, Checklist, CTASection } from '@/components'
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
      <Hero
        headline={aiReadyData.hero.headline}
        subheadline={aiReadyData.hero.subheadline}
      />

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

      {/* What AI-Ready Means */}
      <Section
        badge={aiReadyData.whatAiReadyMeans.badge}
        title={aiReadyData.whatAiReadyMeans.title}
        className="bg-gray-50"
      >
        <Checklist items={aiReadyData.whatAiReadyMeans.items} />
      </Section>

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

      {/* Disclaimer */}
      <Section className="bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-600 italic">
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
