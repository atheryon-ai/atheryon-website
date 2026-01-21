import type { Metadata } from 'next'
import Link from 'next/link'
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

      {/* Model Selector */}
      <Section
        title={howWeWork.intro.title}
        description={howWeWork.intro.description}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href={howWeWork.intro.ctas[0].href}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-full shadow-button hover:bg-neutral-800 transition-all"
          >
            {howWeWork.intro.ctas[0].label}
          </Link>
          <Link
            href={howWeWork.intro.ctas[1].href}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-neutral-900 bg-white border border-neutral-200 rounded-full hover:bg-warm-100 transition-all"
          >
            {howWeWork.intro.ctas[1].label}
          </Link>
        </div>
      </Section>

      {/* Method A: Data & AI Delivery */}
      <div id={howWeWork.methods[0].id}>
        <SectionDivider />

        <Section
          badge={howWeWork.methods[0].badge}
          title={howWeWork.methods[0].title}
          description={howWeWork.methods[0].subheadline}
        >
          <div className="max-w-3xl">
            <Stepper steps={howWeWork.methods[0].steps} />

            {/* Done outcomes */}
            <div className="mt-8 rounded-2xl border border-warm-200 bg-white/60 p-6">
              <h3 className="text-neutral-900 font-semibold">{howWeWork.methods[0].done.title}</h3>
              <ul className="mt-3 space-y-2 text-neutral-800">
                {howWeWork.methods[0].done.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>

      {/* Transition */}
      <SectionDivider />
      <Section
        badge={howWeWork.transition.badge}
        title={howWeWork.transition.title}
        description={howWeWork.transition.description}
      >
        <></>
      </Section>

      {/* Method B: M&A Execution */}
      <div id={howWeWork.methods[1].id}>
        <SectionDivider />

        <Section
          badge={howWeWork.methods[1].badge}
          title={howWeWork.methods[1].title}
          description={howWeWork.methods[1].subheadline}
        >
          <div className="max-w-3xl">
            <Stepper steps={howWeWork.methods[1].steps} />

            {/* Done outcomes */}
            <div className="mt-8 rounded-2xl border border-warm-200 bg-white/60 p-6">
              <h3 className="text-neutral-900 font-semibold">{howWeWork.methods[1].done.title}</h3>
              <ul className="mt-3 space-y-2 text-neutral-800">
                {howWeWork.methods[1].done.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>

      <CTASection
        text="Ready to move from potential to production?"
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
