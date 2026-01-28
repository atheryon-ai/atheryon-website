import type { Metadata } from 'next'
import { Hero, Section, Card, FeatureCard, FeatureGrid, Checklist, CTASection } from '@/components'
import { site } from '@/content/site'

const { whatWeDeliver } = site.pages

export const metadata: Metadata = {
  title: whatWeDeliver.title,
  description: whatWeDeliver.description,
  openGraph: {
    title: whatWeDeliver.title,
    description: whatWeDeliver.description,
  },
}

export default function WhatWeDeliverPage() {
  return (
    <>
      <Hero
        headline={whatWeDeliver.hero.headline}
        subheadline={whatWeDeliver.hero.subheadline}
      />

      {/* Outcomes */}
      <Section
        badge={whatWeDeliver.outcomes.badge}
        title={whatWeDeliver.outcomes.title}
      >
        <FeatureGrid columns={2}>
          {whatWeDeliver.outcomes.items.map((item, index) => (
            <Card key={index} title={item.title} description={item.description} />
          ))}
        </FeatureGrid>
      </Section>

      {/* Deliverables */}
      <Section
        badge={whatWeDeliver.deliverables.badge}
        title={whatWeDeliver.deliverables.title}
        className="bg-gray-50"
      >
        <Checklist items={whatWeDeliver.deliverables.items} />
      </Section>

      {/* Engagement Shapes */}
      <Section
        badge={whatWeDeliver.engagementShapes.badge}
        title={whatWeDeliver.engagementShapes.title}
      >
        <FeatureGrid columns={3}>
          {whatWeDeliver.engagementShapes.items.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              duration={item.duration}
              description={item.description}
            />
          ))}
        </FeatureGrid>
      </Section>

      <CTASection
        text="Let's discuss what you need to deliver."
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
