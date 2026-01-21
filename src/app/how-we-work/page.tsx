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

      {/* Render both delivery methods */}
      {howWeWork.methods.map((method, index) => (
        <div key={method.id} id={method.id}>
          <SectionDivider />

          <Section
            badge={method.badge}
            title={method.title}
            description={method.subheadline}
          >
            <div className="max-w-3xl">
              <Stepper steps={method.steps} />
            </div>
          </Section>
        </div>
      ))}

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
