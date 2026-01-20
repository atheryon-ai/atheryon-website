import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, Card, FeatureGrid, BulletList, CTASection } from '@/components'
import { site } from '@/content/site'

const { about } = site.pages

export const metadata: Metadata = {
  title: about.title,
  description: about.description,
  openGraph: {
    title: about.title,
    description: about.description,
  },
}

export default function AboutPage() {
  return (
    <>
      <SimpleHero
        headline={about.hero.headline}
        subheadline={about.hero.subheadline}
        badge="About Us"
      />

      <SectionDivider />

      {/* What We Are / Why We Exist */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card">
            <h3 className="font-display text-xl font-semibold text-slate-900 mb-4 tracking-tight">{about.whatWeAre.title}</h3>
            <p className="text-slate-600 leading-relaxed">{about.whatWeAre.description}</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200/60 rounded-3xl">
            <h3 className="font-display text-xl font-semibold text-slate-900 mb-4 tracking-tight">{about.whyWeExist.title}</h3>
            <p className="text-slate-600 leading-relaxed">{about.whyWeExist.description}</p>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* What Experience Means */}
      <Section
        title={about.whatExperienceMeans.title}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl">
          <BulletList items={about.whatExperienceMeans.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* Principles */}
      <Section
        badge="Our Approach"
        title={about.principles.title}
      >
        <FeatureGrid columns={3}>
          {about.principles.items.map((item, index) => (
            <Card key={index} title={item.title} description={item.description} />
          ))}
        </FeatureGrid>
      </Section>

      <CTASection
        text="Want to learn more about how we work?"
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
