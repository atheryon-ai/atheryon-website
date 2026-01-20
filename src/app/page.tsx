import Link from 'next/link'
import { Hero, Section, Card, FeatureGrid, SimpleStepper, QuoteBlock, CTACard, DiagramPlaceholder } from '@/components'
import { site } from '@/content/site'

const { home } = site.pages

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        headline={home.hero.headline}
        subheadline={home.hero.subheadline}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
      />

      {/* Who We're For */}
      <Section
        badge={home.whoWeAreFor.badge}
        title={home.whoWeAreFor.title}
        className="bg-gray-50"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">We work with:</h3>
            <ul className="space-y-3">
              {home.whoWeAreFor.forClients.map((client, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{client}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Not a fit for:</h3>
            <ul className="space-y-3">
              {home.whoWeAreFor.notForClients.map((client, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-500">{client}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Problems We Solve */}
      <Section
        badge={home.problemsWeSolve.badge}
        title={home.problemsWeSolve.title}
      >
        <FeatureGrid columns={2}>
          {home.problemsWeSolve.cards.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} />
          ))}
        </FeatureGrid>
      </Section>

      {/* What We Do */}
      <Section
        badge={home.whatWeDo.badge}
        title={home.whatWeDo.title}
        className="bg-gray-50"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {home.whatWeDo.columns.map((column, index) => (
            <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{column.title}</h3>
              <p className="text-gray-600 leading-relaxed">{column.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How We Work Teaser */}
      <Section
        badge={home.howWeWorkTeaser.badge}
        title={home.howWeWorkTeaser.title}
      >
        <div className="max-w-2xl">
          <SimpleStepper steps={home.howWeWorkTeaser.steps} />
          <Link
            href={home.howWeWorkTeaser.link.href}
            className="inline-flex items-center gap-2 mt-8 text-gray-900 font-medium hover:underline"
          >
            {home.howWeWorkTeaser.link.label}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* Credibility */}
      <Section
        badge={home.credibility.badge}
        title={home.credibility.title}
        className="bg-gray-50"
      >
        <div className="max-w-3xl">
          <QuoteBlock quote={home.credibility.quote} className="mb-8" />
          <ul className="space-y-3">
            {home.credibility.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Reference Architectures Teaser */}
      <Section
        badge={home.referenceArchitecturesTeaser.badge}
        title={home.referenceArchitecturesTeaser.title}
      >
        <FeatureGrid columns={3}>
          {home.referenceArchitecturesTeaser.cards.map((card, index) => (
            <div key={index} className="space-y-4">
              <DiagramPlaceholder title={card.title} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </FeatureGrid>
        <Link
          href={home.referenceArchitecturesTeaser.link.href}
          className="inline-flex items-center gap-2 mt-8 text-gray-900 font-medium hover:underline"
        >
          {home.referenceArchitecturesTeaser.link.label}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gray-50">
        <CTACard
          text={home.finalCta.text}
          ctaLabel={home.finalCta.cta.label}
          ctaHref={home.finalCta.cta.href}
        />
      </Section>
    </>
  )
}
