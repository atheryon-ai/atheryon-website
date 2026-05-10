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

const { transformation } = site.pages

export const metadata: Metadata = {
  title: transformation.title,
  description: transformation.description,
  openGraph: { title: transformation.title, description: transformation.description },
}

export default function TransformationPage() {
  return (
    <main className="bg-bone">
      <PillarHero {...transformation.hero} />

      <SectionDivider />

      <Section badge={transformation.hiddenReality.badge} title={transformation.hiddenReality.title}>
        <ul className="space-y-3 max-w-2xl">
          {transformation.hiddenReality.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-charcoal/60">—</span>
              <span className="text-charcoal/80 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <SectionDivider />

      <Section badge={transformation.whatWeDo.badge} title={transformation.whatWeDo.title}>
        <PillarServiceGrid cards={transformation.whatWeDo.cards} />
      </Section>

      <SectionDivider />

      <Section badge={transformation.proof.badge}>
        <LabsTeaser
          title={transformation.proof.title}
          body={transformation.proof.body}
          screenshot={transformation.proof.screenshot}
          screenshotAlt={transformation.proof.screenshotAlt}
          cta={transformation.proof.cta}
        />
      </Section>

      <SectionDivider />

      <Section centered>
        <p className="text-base text-charcoal/70 mb-4">{transformation.floor13Nudge.body}</p>
        <Link
          href={transformation.floor13Nudge.cta.href}
          className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
        >
          {transformation.floor13Nudge.cta.label}
        </Link>
      </Section>

      <SectionDivider />

      <Section badge={transformation.closing.badge} title={transformation.closing.title} centered>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {transformation.closing.body}
        </p>
        <div className="flex justify-center">
          <Link
            href={transformation.closing.cta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {transformation.closing.cta.label}
          </Link>
        </div>
      </Section>
    </main>
  )
}
