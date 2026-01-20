import type { Metadata } from 'next'
import { Hero, Section, Card, FeatureGrid, BulletList, CTASection } from '@/components'
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
      <Hero
        headline={about.hero.headline}
        subheadline={about.hero.subheadline}
      />

      {/* What We Are / Why We Exist */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{about.whatWeAre.title}</h3>
            <p className="text-gray-600 leading-relaxed">{about.whatWeAre.description}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{about.whyWeExist.title}</h3>
            <p className="text-gray-600 leading-relaxed">{about.whyWeExist.description}</p>
          </div>
        </div>
      </Section>

      {/* What Experience Means */}
      <Section
        title={about.whatExperienceMeans.title}
        className="bg-gray-50"
      >
        <BulletList items={about.whatExperienceMeans.items} className="max-w-2xl" />
      </Section>

      {/* Principles */}
      <Section
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
