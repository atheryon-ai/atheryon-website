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

const { intelligence } = site.pages

export const metadata: Metadata = {
  title: intelligence.title,
  description: intelligence.description,
  openGraph: { title: intelligence.title, description: intelligence.description },
}

export default function IntelligencePage() {
  return (
    <main className="bg-bone">
      <PillarHero {...intelligence.hero} />

      <SectionDivider />

      <Section badge={intelligence.hiddenReality.badge} title={intelligence.hiddenReality.title}>
        <ul className="space-y-3 max-w-2xl">
          {intelligence.hiddenReality.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-charcoal/60">—</span>
              <span className="text-charcoal/80 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <SectionDivider />

      <Section badge={intelligence.whatWeDo.badge} title={intelligence.whatWeDo.title}>
        <PillarServiceGrid cards={intelligence.whatWeDo.cards} />
      </Section>

      <SectionDivider />

      <Section badge={intelligence.proof.badge}>
        <LabsTeaser
          title={intelligence.proof.title}
          body={intelligence.proof.body}
          screenshot={intelligence.proof.screenshot}
          screenshotAlt={intelligence.proof.screenshotAlt}
          cta={intelligence.proof.cta}
        />
      </Section>

      <SectionDivider />

      <Section centered>
        <p className="text-base text-charcoal/70 mb-4">{intelligence.floor13Nudge.body}</p>
        <Link
          href={intelligence.floor13Nudge.cta.href}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
        >
          {intelligence.floor13Nudge.cta.label}
        </Link>
      </Section>

      <SectionDivider />

      <Section badge={intelligence.closing.badge} title={intelligence.closing.title} centered>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {intelligence.closing.body}
        </p>
        <div className="flex justify-center">
          <Link
            href={intelligence.closing.cta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {intelligence.closing.cta.label}
          </Link>
        </div>
      </Section>
    </main>
  )
}
