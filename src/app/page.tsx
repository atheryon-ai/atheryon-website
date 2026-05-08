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
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-700 mb-4">We work with</div>
            <ul className="space-y-3 border-t border-neutral-900/10 pt-4">
              {home.whoWeAreFor.forClients.map((client, index) => (
                <li key={index} className="text-neutral-800 text-lg leading-snug">
                  {client}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-500 mb-4">Not a fit for</div>
            <ul className="space-y-3 border-t border-neutral-900/10 pt-4">
              {home.whoWeAreFor.notForClients.map((client, index) => (
                <li key={index} className="text-neutral-500 text-lg leading-snug">
                  {client}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* Problems We Solve — editorial list */}
      <Section
        badge={home.problemsWeSolve.badge}
        title={home.problemsWeSolve.title}
      >
        <ul className="divide-y divide-neutral-900/10 border-t border-neutral-900/10">
          {home.problemsWeSolve.cards.map((card, index) => (
            <li key={index} className="grid grid-cols-12 gap-6 py-8 items-start">
              <span className="col-span-1 text-sm font-mono text-neutral-500 pt-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="col-span-11 md:col-span-4 font-display text-xl md:text-2xl font-medium text-neutral-900 tracking-tight leading-snug">
                {card.title}
              </h3>
              <p className="col-span-12 md:col-span-6 md:col-start-7 text-neutral-600 leading-relaxed">
                {card.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <SectionDivider />

      {/* Services Section — numbered editorial list */}
      <Section
        badge={home.servicesSection.badge}
        title={home.servicesSection.title}
      >
        <ul className="divide-y divide-neutral-900/10 border-t border-neutral-900/10">
          {home.servicesSection.cards.map((card, index) => (
            <li key={index}>
              <Link
                href={card.href}
                className="group grid grid-cols-12 gap-6 py-8 md:py-10 items-start hover:bg-neutral-900/[0.015] transition-colors -mx-4 px-4 md:-mx-6 md:px-6"
              >
                <span className="col-span-1 text-sm font-mono text-neutral-500 pt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="col-span-11 md:col-span-4 font-display text-2xl md:text-3xl font-medium text-neutral-900 tracking-tight leading-tight group-hover:text-brand-orange transition-colors">
                  {card.title}
                </h3>
                <p className="col-span-12 md:col-span-6 md:col-start-7 text-neutral-600 leading-relaxed text-base md:text-lg">
                  {card.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
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
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-orange mb-4">What done looks like</div>
            <ul className="space-y-3 border-t border-neutral-900/10 pt-4">
              {site.pages.howWeWork.whatDoneLooksLike.items.map((item, index) => (
                <li key={index} className="text-neutral-800 text-lg leading-snug">
                  {item}
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
          imageSrc="/case-study.png"
          imageAlt="Case study — program recovery results"
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
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-10 border-t border-neutral-900/10 pt-8">
          {home.referenceArchitecturesTeaser.cards.map((card, index) => (
            <div key={index}>
              <div className="text-xs font-mono text-neutral-500 mb-3">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-neutral-900 mb-3 tracking-tight leading-snug">
                {card.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
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
