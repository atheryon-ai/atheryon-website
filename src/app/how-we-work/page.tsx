import type { Metadata } from 'next'
import { Hero, Section, Stepper, Checklist, CTASection } from '@/components'
import { site } from '@/content/site'

const { howWeWork } = site.pages

export const metadata: Metadata = {
  title: howWeWork.title,
  description: howWeWork.description,
  openGraph: {
    title: howWeWork.title,
    description: howWeWork.description,
  },
}

export default function HowWeWorkPage() {
  return (
    <>
      <Hero
        headline={howWeWork.hero.headline}
        subheadline={howWeWork.hero.subheadline}
      />

      {/* 5-Step Method */}
      <Section
        badge="Our Method"
        title="Five steps to production"
      >
        <div className="max-w-3xl">
          <Stepper steps={howWeWork.steps} />
        </div>
      </Section>

      {/* What Done Looks Like */}
      <Section className="bg-gray-50">
        <div className="grid md:grid-cols-2 gap-12">
          <Checklist
            title={howWeWork.whatDoneLooksLike.title}
            items={howWeWork.whatDoneLooksLike.items}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {howWeWork.whyItReducesCost.title}
            </h3>
            <ul className="space-y-3">
              {howWeWork.whyItReducesCost.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTASection
        text="Ready to move from potential to production?"
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
