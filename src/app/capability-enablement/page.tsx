import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, CTASection } from '@/components'
import { site } from '@/content/site'

const { capabilityEnablement } = site.pages

export const metadata: Metadata = {
  title: capabilityEnablement.title,
  description: capabilityEnablement.description,
  openGraph: {
    title: capabilityEnablement.title,
    description: capabilityEnablement.description,
  },
}

export default function CapabilityEnablementPage() {
  return (
    <>
      <SimpleHero
        headline={capabilityEnablement.hero.headline}
        subheadline={capabilityEnablement.hero.subheadline}
        badge="Capability Enablement"
      />

      <SectionDivider />

      {/* Intro */}
      <Section>
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-3xl">
          {capabilityEnablement.intro.text.split('\n\n').map((paragraph, index) => (
            <p key={index} className={`text-lg text-slate-600 leading-relaxed${index > 0 ? ' mt-4' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* Capability Cards */}
      <Section
        badge="Capabilities"
        title="What we enable"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {capabilityEnablement.capabilities.map((capability, index) => (
            <div key={index} className="p-6 bg-white border border-slate-200/60 rounded-2xl shadow-card">
              <h3 className="font-display text-lg font-semibold text-slate-900 mb-3 tracking-tight">{capability.title}</h3>
              <p className="text-slate-600 leading-relaxed">{capability.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        text="Discuss your capability challenge"
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
