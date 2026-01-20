import type { Metadata } from 'next'
import Image from 'next/image'
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
              {index === 0 ? (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 rounded-2xl p-6 flex items-center justify-center min-h-[250px]">
                  <Image
                    src="/canonical-data-model.png"
                    alt="Canonical data model layer diagram showing business entities connected to a shared semantic layer"
                    width={500}
                    height={350}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : index === 1 ? (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 rounded-2xl p-6 flex items-center justify-center min-h-[250px]">
                  <Image
                    src="/bronze-silver-gold-pipeline.png"
                    alt="Bronze/Silver/Gold pipeline diagram showing data progression from raw to business-ready"
                    width={500}
                    height={350}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : index === 2 ? (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 rounded-2xl p-6 flex items-center justify-center min-h-[250px]">
                  <Image
                    src="/validation-and-controls.png"
                    alt="Validation and controls diagram showing schema validation, business rules, and anomaly detection"
                    width={500}
                    height={350}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <DiagramPlaceholder title={arch.title} className="min-h-[250px]" />
              )}
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
