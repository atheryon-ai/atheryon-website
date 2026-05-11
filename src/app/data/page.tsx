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

const { data } = site.pages
const relatedPillars = site.pages.reality.pillars.items.filter((p) => p.href !== '/data')
const relatedHeading = site.pages.reality.pillars.relatedHeading

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  openGraph: { title: data.title, description: data.description },
  twitter: {
    card: 'summary_large_image',
    title: data.title,
    description: data.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/data',
  },
}

export default function DataPage() {
  return (
    <main className="bg-bone">
      <PillarHero {...data.hero} isDataPillar />

      <SectionDivider />

      <Section badge={data.hiddenReality.badge} title={data.hiddenReality.title}>
        <ul className="space-y-3 max-w-2xl">
          {data.hiddenReality.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-charcoal/60">—</span>
              <span className="text-charcoal/80 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <SectionDivider />

      <Section badge={data.whatWeDo.badge} title={data.whatWeDo.title}>
        <PillarServiceGrid cards={data.whatWeDo.cards} />
      </Section>

      <SectionDivider />

      <Section badge={data.proof.badge}>
        <LabsTeaser
          title={data.proof.title}
          body={data.proof.body}
          screenshot={data.proof.screenshot}
          screenshotAlt={data.proof.screenshotAlt}
          cta={data.proof.cta}
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
        <p className="text-base text-charcoal/70 mb-4">{data.floor13Nudge.body}</p>
        <Link
          href={data.floor13Nudge.cta.href}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
        >
          {data.floor13Nudge.cta.label}
        </Link>
      </Section>

      <SectionDivider />

      <Section badge={data.closing.badge} title={data.closing.title} centered>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {data.closing.body}
        </p>
        <div className="flex justify-center">
          <Link
            href={data.closing.cta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {data.closing.cta.label}
          </Link>
        </div>
      </Section>
    </main>
  )
}
