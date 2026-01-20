import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, Stepper, Checklist, CTASection, BulletList } from '@/components'
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

      {/* 5-Step Method */}
      <Section
        badge="The Process"
        title="Five steps to production"
      >
        <div className="max-w-3xl">
          <Stepper steps={howWeWork.steps} />
        </div>
      </Section>

      <SectionDivider />

      {/* What Done Looks Like */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card">
            <Checklist
              title={howWeWork.whatDoneLooksLike.title}
              items={howWeWork.whatDoneLooksLike.items}
            />
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl">
            <h3 className="font-display text-lg font-semibold text-slate-900 mb-5 tracking-tight">
              {howWeWork.whyItReducesCost.title}
            </h3>
            <BulletList items={howWeWork.whyItReducesCost.items} />
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
