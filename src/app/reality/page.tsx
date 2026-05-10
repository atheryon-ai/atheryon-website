import type { ComponentProps } from 'react'
import type { Metadata } from 'next'
import {
  Section,
  SectionDivider,
  RealityHero,
  PillarGrid,
  RealitySplit,
  FloorThirteen,
  LabsTeaser,
} from '@/components'
import Link from 'next/link'
import { site } from '@/content/site'

const { reality } = site.pages

export const metadata: Metadata = {
  title: reality.title,
  description: reality.description,
  openGraph: { title: reality.title, description: reality.description },
}

export default function RealityPage() {
  return (
    <main className="bg-bone">
      {/* §1 Hero */}
      <RealityHero
        headline={reality.hero.headline}
        lede={reality.hero.lede}
        primaryCta={reality.hero.primaryCta}
        secondaryCta={reality.hero.secondaryCta}
      />

      <SectionDivider />

      {/* §2 Pillars */}
      <Section badge={reality.pillars.badge} title={reality.pillars.title} description={reality.pillars.intro}>
        <PillarGrid items={reality.pillars.items} anchor={reality.pillars.anchor} />
      </Section>

      <SectionDivider />

      {/* §3 Narrative transition */}
      <Section badge={reality.transition.badge}>
        <RealitySplit
          title={reality.transition.title}
          body={reality.transition.body}
          cta={reality.transition.cta}
          steps={reality.transition.steps}
        />
      </Section>

      <SectionDivider />

      {/* §4 Floor 13 */}
      {/* Cast: site.ts data widens id strings; FloorThirteen narrows to PillarId. */}
      <FloorThirteen {...(reality.floor13 as ComponentProps<typeof FloorThirteen>)} />

      <SectionDivider />

      {/* §5 Methodology */}
      <Section
        badge={reality.methodology.badge}
        title={reality.methodology.title}
        className=""
      >
        <div id={reality.methodology.anchor} />
        <ul className="space-y-6 max-w-3xl">
          {reality.methodology.principles.map((p) => (
            <li key={p.title}>
              <h3 className="text-lg font-bold text-charcoal tracking-tight mb-1">{p.title}</h3>
              <p className="text-charcoal/80 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <SectionDivider />

      {/* §6 Proof — /labs */}
      <Section badge={reality.proof.badge}>
        <LabsTeaser
          title={reality.proof.title}
          body={reality.proof.body}
          screenshot={reality.proof.screenshot}
          screenshotAlt={reality.proof.screenshotAlt}
          cta={reality.proof.cta}
        />
      </Section>

      <SectionDivider />

      {/* §7 Closing */}
      <Section badge={reality.closing.badge} title={reality.closing.title} centered>
        <p className="text-lg text-charcoal/80 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {reality.closing.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link
            href={reality.closing.primaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {reality.closing.primaryCta.label}
          </Link>
          <Link
            href={reality.closing.secondaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
          >
            {reality.closing.secondaryCta.label}
          </Link>
        </div>
      </Section>
    </main>
  )
}
