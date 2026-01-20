import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, DiagramPlaceholder, CTASection } from '@/components'
import { site } from '@/content/site'

const { referenceArchitectures } = site.pages

export const metadata: Metadata = {
  title: referenceArchitectures.title,
  description: referenceArchitectures.description,
  openGraph: {
    title: referenceArchitectures.title,
    description: referenceArchitectures.description,
  },
}

export default function ReferenceArchitecturesPage() {
  return (
    <>
      <SimpleHero
        headline={referenceArchitectures.hero.headline}
        subheadline={referenceArchitectures.hero.subheadline}
        badge="Architecture"
      />

      <SectionDivider />

      {/* Intro */}
      <Section>
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-3xl">
          <p className="text-lg text-slate-600 leading-relaxed">
            {referenceArchitectures.intro.text}
          </p>
        </div>
      </Section>

      <SectionDivider />

      {/* Architecture Cards */}
      <Section
        badge="Patterns"
        title="Production-tested architectures"
      >
        <div className="space-y-12">
          {referenceArchitectures.architectures.map((arch, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
              <DiagramPlaceholder title={arch.title} className="min-h-[250px]" />
              <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card">
                <h3 className="font-display text-xl font-semibold text-slate-900 mb-3 tracking-tight">{arch.title}</h3>
                <p className="text-slate-600 leading-relaxed">{arch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        text="Want to see how these patterns apply to your context?"
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
