import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Section,
  SectionDivider,
  PillarHero,
  PillarServiceGrid,
  LabsTeaser,
} from '@/components'
import { site } from '@/content/site'

const { aiDirection } = site.pages
const relatedPillars = site.pages.reality.pillars.items.filter((p) => p.href !== '/ai-direction')
const relatedHeading = site.pages.reality.pillars.relatedHeading

export const metadata: Metadata = {
  title: aiDirection.title,
  description: aiDirection.description,
  openGraph: { title: aiDirection.title, description: aiDirection.description },
  twitter: {
    card: 'summary_large_image',
    title: aiDirection.title,
    description: aiDirection.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/ai-direction',
  },
}

export default function AiDirectionPage() {
  return (
    <main className="bg-bone">
      <PillarHero {...aiDirection.hero} />

      <SectionDivider />

      <Section badge={aiDirection.hiddenReality.badge} title={aiDirection.hiddenReality.title}>
        <ul className="space-y-3 max-w-2xl">
          {aiDirection.hiddenReality.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-charcoal/60">—</span>
              <span className="text-charcoal/80 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <SectionDivider />

      <Section badge={aiDirection.whatWeDo.badge} title={aiDirection.whatWeDo.title}>
        <PillarServiceGrid cards={aiDirection.whatWeDo.cards} />
      </Section>

      <SectionDivider />

      <Section badge={aiDirection.proof.badge}>
        <LabsTeaser
          title={aiDirection.proof.title}
          body={aiDirection.proof.body}
          screenshot={aiDirection.proof.screenshot}
          screenshotAlt={aiDirection.proof.screenshotAlt}
          cta={aiDirection.proof.cta}
        />
      </Section>

      <SectionDivider />

      <Section badge={relatedHeading.badge} title={relatedHeading.title}>
        <div className="grid md:grid-cols-2 gap-6">
          {relatedPillars.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              data-testid="related-pillar-card"
              className="block p-8 bg-white border border-charcoal/10 rounded-2xl hover:border-charcoal/30 transition-colors"
            >
              <div className="text-sm font-mono text-brand-orange mb-4">{pillar.number}</div>
              <h3 className="font-display text-3xl text-charcoal tracking-tight mb-4">{pillar.title}</h3>
              <p className="text-charcoal/80 leading-relaxed mb-4">{pillar.body}</p>
              <span className="inline-block text-sm font-semibold text-charcoal underline-offset-4 group-hover:underline">
                Explore {pillar.title} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <SectionDivider />

      <Section centered>
        <p className="text-base text-charcoal/70 mb-4">{aiDirection.floor13Nudge.body}</p>
        <Link
          href={aiDirection.floor13Nudge.cta.href}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
        >
          {aiDirection.floor13Nudge.cta.label}
        </Link>
      </Section>

      <SectionDivider />

      <Section badge={aiDirection.closing.badge} title={aiDirection.closing.title} centered>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {aiDirection.closing.body}
        </p>
        <div className="flex justify-center">
          <Link
            href={aiDirection.closing.cta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {aiDirection.closing.cta.label}
          </Link>
        </div>
      </Section>
    </main>
  )
}
