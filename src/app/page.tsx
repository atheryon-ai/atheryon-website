import Link from 'next/link'
import {
  Hero,
  Section,
  SectionDivider,
  Card,
  FeatureCard,
  FeatureGrid,
  SimpleStepper,
  CaseStudy,
  ComparisonSection,
  FAQ,
  defaultFAQItems,
  TechPartnerLogos,
} from '@/components'
import { site } from '@/content/site'

const { home } = site.pages

// Icons for the services cards
const servicesIcons = [
  // Recovery & Migration
  <svg key="recovery" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>,
  // M&A Execution
  <svg key="ma" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>,
  // Capability Enablement
  <svg key="capability" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
]

// Icons for the problem cards - using gray tones per Social Grow aesthetic
const problemIcons = [
  // AI POC purgatory
  <svg key="poc" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Untrusted platforms
  <svg key="trust" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>,
  // Expensive change
  <svg key="cost" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Migration meaning loss
  <svg key="migration" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>,
]

export default function HomePage() {
  return (
    <>
      {/* Hero - Social Grow asymmetric design */}
      <Hero
        headline={home.hero.headline}
        subheadline={home.hero.subheadline}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
      />

      <SectionDivider />

      {/* Who We're For - Clean cards */}
      <Section
        badge={home.whoWeAreFor.badge}
        title={home.whoWeAreFor.title}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card card-hover">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">We work with</h3>
            </div>
            <ul className="space-y-4">
              {home.whoWeAreFor.forClients.map((client, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">{client}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 bg-warm-200 border border-neutral-500/10 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-warm-300 flex items-center justify-center">
                <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">Not a fit for</h3>
            </div>
            <ul className="space-y-4">
              {home.whoWeAreFor.notForClients.map((client, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-neutral-500">{client}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* Problem Lead-In — "before state" with fragmented animation */}
      <section className="py-20 md:py-28">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-500/10 rounded-full mb-6 shadow-soft">
                <span className="w-2 h-2 bg-neutral-400 rounded-full" />
                <span className="text-sm font-medium text-neutral-600">{home.problemLeadIn.badge}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.15]">
                {home.problemLeadIn.title}
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                {home.problemLeadIn.description}
              </p>
            </div>
            {/* Visual — same video, styled as unresolved / fragmented */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm opacity-60 blur-[1px] saturate-50">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-2xl"
                  src="/atheryon-logo-animation.mp4"
                  poster="/atheryon-logo-animation-poster.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Problems We Solve - 3 column grid */}
      <Section
        badge={home.problemsWeSolve.badge}
        title={home.problemsWeSolve.title}
      >
        <FeatureGrid columns={2}>
          {home.problemsWeSolve.cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={problemIcons[index]}
            />
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      {/* Services Section */}
      <Section
        badge={home.servicesSection.badge}
        title={home.servicesSection.title}
      >
        <FeatureGrid columns={3}>
          {home.servicesSection.cards.map((card, index) => (
            <Link key={index} href={card.href} className="block">
              <Card
                title={card.title}
                description={card.description}
                icon={servicesIcons[index]}
              />
            </Link>
          ))}
        </FeatureGrid>
      </Section>

      <SectionDivider />

      {/* What We Do - Comparison */}
      <Section
        badge={home.whatWeDo.badge}
        title={home.whatWeDo.title}
      >
        <ComparisonSection
          items={[
            { feature: 'Delivery model', traditional: 'POC that never scales', atheryon: 'Production from day one' },
            { feature: 'Data assets', traditional: 'Disposable pipelines', atheryon: 'Reusable data products' },
            { feature: 'Semantics', traditional: 'Lost in translation', atheryon: 'Canonical model preserved' },
            { feature: 'Change cost', traditional: 'Every change is a rewrite', atheryon: 'Governed evolution' },
            { feature: 'AI readiness', traditional: 'Ungoverned, untrusted', atheryon: 'Validated, lineage-tracked' },
          ]}
        />
      </Section>

      <SectionDivider />

      {/* How We Work Teaser */}
      <Section
        badge={home.howWeWorkTeaser.badge}
        title={home.howWeWorkTeaser.title}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <SimpleStepper steps={home.howWeWorkTeaser.steps} />
            <Link
              href={home.howWeWorkTeaser.link.href}
              className="inline-flex items-center gap-2 mt-8 text-neutral-900 font-semibold hover:text-brand-orange transition-colors"
            >
              {home.howWeWorkTeaser.link.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card">
            <h3 className="text-xl font-semibold text-neutral-900 tracking-tight mb-6">What done looks like</h3>
            <ul className="space-y-4">
              {site.pages.howWeWork.whatDoneLooksLike.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* Credibility / Case Study */}
      <Section
        badge={home.credibility.badge}
        title={home.credibility.title}
      >
        <CaseStudy
          badge="Track Record"
          title="We recover what others abandon"
          description={home.credibility.quote}
          bullets={home.credibility.bullets}
          stats={[
            { value: '50+', label: 'Programs recovered' },
            { value: '10x', label: 'Faster to production' },
            { value: '100%', label: 'Semantic preservation' },
          ]}
        />
      </Section>

      <SectionDivider />

      {/* Reference Architectures Teaser - 3 column cards */}
      <Section
        badge={home.referenceArchitecturesTeaser.badge}
        title={home.referenceArchitecturesTeaser.title}
      >
        <FeatureGrid columns={3}>
          {home.referenceArchitecturesTeaser.cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              icon={
                <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
            />
          ))}
        </FeatureGrid>
        <div className="mt-10">
          <Link
            href={home.referenceArchitecturesTeaser.link.href}
            className="inline-flex items-center gap-2 text-neutral-900 font-semibold hover:text-brand-orange transition-colors"
          >
            {home.referenceArchitecturesTeaser.link.label}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Section>

      <SectionDivider />

      {/* Built on Trusted Platforms Section */}
      <Section centered>
        <TechPartnerLogos className="py-8" />
      </Section>

      <SectionDivider />

      {/* FAQ Section */}
      <Section
        badge="Common Questions"
        title="Frequently asked questions"
        centered
      >
        <div className="max-w-3xl mx-auto">
          <FAQ items={defaultFAQItems} />
        </div>
      </Section>

      {/* Final CTA is in Footer */}
    </>
  )
}
