import type { Metadata } from 'next'
import Image from 'next/image'
import { SimpleHero, Section, SectionDivider, Card, FeatureCard, FeatureGrid, Checklist, CTASection } from '@/components'
import { site } from '@/content/site'

const { cdmPlatform } = site.pages

export const metadata: Metadata = {
  title: cdmPlatform.title,
  description: cdmPlatform.description,
  openGraph: {
    title: cdmPlatform.title,
    description: cdmPlatform.description,
  },
}

// Icons for capability sections
const ValidationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const TransformIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
)

const AIIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const GraphIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
)

const capabilityIcons = [<ValidationIcon key="v" />, <TransformIcon key="t" />, <AIIcon key="a" />, <GraphIcon key="g" />]

// Challenge icons
const ChallengeIcons = [
  // Manual Reconciliation
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Inconsistent Formats
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  // Regulatory Complexity
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>,
  // Integration Friction
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>,
]

// Persona icons
const PersonaIcons = [
  // Risk Managers
  <svg key="risk" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>,
  // Compliance Officers
  <svg key="compliance" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Quantitative Analysts
  <svg key="quant" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>,
  // Operations Teams
  <svg key="ops" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Technology Teams
  <svg key="tech" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
]

export default function CDMPlatformPage() {
  return (
    <>
      <SimpleHero
        headline={cdmPlatform.hero.headline}
        subheadline={cdmPlatform.hero.subheadline}
        badge="Platform"
      />

      <SectionDivider />

      {/* The Challenge */}
      <Section
        badge={cdmPlatform.challenge.badge}
        title={cdmPlatform.challenge.title}
      >
        <FeatureGrid columns={2}>
          {cdmPlatform.challenge.cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={ChallengeIcons[index]}
            />
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      {/* The Solution */}
      <Section
        badge={cdmPlatform.solution.badge}
        title={cdmPlatform.solution.title}
        description={cdmPlatform.solution.description}
      >
        {/* Architecture Diagram */}
        <div className="mb-12 p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card">
          <div className="relative w-full aspect-[16/9] max-w-4xl mx-auto">
            <Image
              src="/cdm-platform-architecture.svg"
              alt="CDM Platform Architecture"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cdmPlatform.solution.stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white border border-neutral-500/10 rounded-2xl shadow-card">
              <div className="text-4xl md:text-5xl font-bold text-brand-orange tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* Core Capabilities */}
      <Section
        badge={cdmPlatform.capabilities.badge}
        title={cdmPlatform.capabilities.title}
      >
        <div className="space-y-16">
          {cdmPlatform.capabilities.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Capability Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-warm-200 flex items-center justify-center">
                  <div className="w-6 h-6 text-neutral-500">
                    {capabilityIcons[sectionIndex]}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">{section.title}</h3>
                  <p className="text-neutral-600">{section.description}</p>
                </div>
              </div>

              {/* Features */}
              <FeatureGrid columns={3}>
                {section.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="p-6 bg-white border border-neutral-500/10 rounded-2xl shadow-card card-hover"
                  >
                    <h4 className="font-semibold text-neutral-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-neutral-600">{feature.description}</p>
                  </div>
                ))}
              </FeatureGrid>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* Regulatory Compliance */}
      <Section
        badge={cdmPlatform.regulatory.badge}
        title={cdmPlatform.regulatory.title}
        description={cdmPlatform.regulatory.description}
      >
        {/* Jurisdictions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {cdmPlatform.regulatory.jurisdictions.map((jurisdiction, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-neutral-500/10 rounded-xl shadow-card text-center"
            >
              <div className="font-semibold text-neutral-900">{jurisdiction.name}</div>
              <div className="text-sm text-neutral-500">{jurisdiction.region}</div>
            </div>
          ))}
        </div>

        {/* Features Checklist */}
        <div className="p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card max-w-2xl">
          <Checklist items={cdmPlatform.regulatory.features} />
        </div>
      </Section>

      <SectionDivider />

      {/* Performance Metrics */}
      <Section
        badge={cdmPlatform.performance.badge}
        title={cdmPlatform.performance.title}
        centered
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cdmPlatform.performance.stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white border border-neutral-500/10 rounded-2xl shadow-card">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* Who It's For */}
      <Section
        badge={cdmPlatform.personas.badge}
        title={cdmPlatform.personas.title}
      >
        <FeatureGrid columns={3}>
          {cdmPlatform.personas.items.map((persona, index) => (
            <Card
              key={index}
              title={persona.title}
              description={persona.description}
              icon={PersonaIcons[index]}
            />
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      {/* Standards & Technology */}
      <Section
        badge={cdmPlatform.standards.badge}
        title={cdmPlatform.standards.title}
        centered
      >
        <div className="flex flex-wrap justify-center gap-4">
          {cdmPlatform.standards.items.map((item, index) => (
            <div
              key={index}
              className="px-6 py-4 bg-white border border-neutral-500/10 rounded-xl shadow-card text-center min-w-[140px]"
            >
              <div className="font-semibold text-neutral-900">{item.name}</div>
              <div className="text-xs text-neutral-500">{item.description}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust Line */}
      <div className="flex justify-center">
        <p className="text-sm text-neutral-600 text-center tracking-wide mt-8">
          Microsoft Partner • Experience aligned to S&P Global frameworks.
        </p>
      </div>

      <CTASection
        text="Ready to transform your derivatives operations?"
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
