import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, Checklist, Card, FeatureGrid, CTASection } from '@/components'
import { site } from '@/content/site'

const { maExecution } = site.pages

export const metadata: Metadata = {
  title: maExecution.title,
  description: maExecution.description,
  openGraph: {
    title: maExecution.title,
    description: maExecution.description,
  },
}

export default function MAExecutionPage() {
  return (
    <>
      <SimpleHero
        headline={maExecution.hero.headline}
        subheadline={maExecution.hero.subheadline}
        badge="M&A Execution"
      />

      <SectionDivider />

      {/* Intro */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
            {maExecution.intro.text}
          </p>
        </div>
      </Section>

      <SectionDivider />

      {/* When Clients Call Us */}
      <Section
        badge={maExecution.whenClientsCallUs.badge}
        title={maExecution.whenClientsCallUs.title}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl">
          <ul className="space-y-4">
            {maExecution.whenClientsCallUs.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SectionDivider />

      {/* Execution */}
      <Section
        badge={maExecution.execution.badge}
        title={maExecution.execution.title}
        description={maExecution.execution.description}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl">
          <Checklist items={maExecution.execution.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* Capabilities */}
      <Section
        badge="Capabilities"
        title="What we bring"
      >
        <FeatureGrid columns={3}>
          {maExecution.capabilities.map((capability, index) => (
            <Card
              key={index}
              title={capability.title}
              description={capability.description}
            />
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      {/* Outcomes */}
      <Section
        badge="Outcomes"
        title={maExecution.outcomes.title}
        description={maExecution.outcomes.description}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl">
          <Checklist items={maExecution.outcomes.items} />
        </div>
      </Section>

      <CTASection
        text="Have an M&A execution challenge? Let's talk."
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
