import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, Stepper, CTASection } from '@/components'
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
      <SimpleHero
        headline={howWeWork.hero.headline}
        subheadline={howWeWork.hero.subheadline}
        badge="Our Method"
      />

      <SectionDivider />

      {/* Five-Step Method */}
      <Section
        badge="Our Five-Step Method"
        title="From strategy to production capability"
        description="A repeatable approach for complex data, AI, and regulatory initiatives."
      >
        <div className="max-w-3xl">
          <Stepper steps={howWeWork.steps} />
        </div>
      </Section>

      <SectionDivider />

      {/* What Done Looks Like */}
      <Section
        badge="Outcomes"
        title={howWeWork.whatDoneLooksLike.title}
      >
        <div className="max-w-3xl">
          <ul className="space-y-3 text-neutral-800">
            {howWeWork.whatDoneLooksLike.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SectionDivider />

      {/* Why It Reduces Cost */}
      <Section
        badge="Value"
        title={howWeWork.whyItReducesCost.title}
      >
        <div className="max-w-3xl">
          <ul className="space-y-3 text-neutral-800">
            {howWeWork.whyItReducesCost.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
