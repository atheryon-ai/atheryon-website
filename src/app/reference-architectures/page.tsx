import type { Metadata } from 'next'
import { Hero, Section, DiagramPlaceholder, CTASection } from '@/components'
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
      <Hero
        headline={referenceArchitectures.hero.headline}
        subheadline={referenceArchitectures.hero.subheadline}
      />

      {/* Intro */}
      <Section>
        <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
          {referenceArchitectures.intro.text}
        </p>
      </Section>

      {/* Architecture Cards */}
      <Section className="bg-gray-50">
        <div className="space-y-12">
          {referenceArchitectures.architectures.map((arch, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
              <DiagramPlaceholder title={arch.title} className="min-h-[250px]" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{arch.title}</h3>
                <p className="text-gray-600 leading-relaxed">{arch.description}</p>
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
