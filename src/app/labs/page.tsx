import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Section,
  SectionDivider,
  LabsHero,
  LabsBankMap,
  LabsFlagship,
  LabsVignette,
  LabsEngagementCard,
} from '@/components'
import { site } from '@/content/site'

const { labs } = site.pages

export const metadata: Metadata = {
  title: labs.title,
  description: labs.description,
  openGraph: { title: labs.title, description: labs.description },
}

export default function LabsPage() {
  return (
    <main>
      {/* §1 Hero */}
      <LabsHero
        headlineLine1={labs.hero.headlineLine1}
        headlineLine2={labs.hero.headlineLine2}
        body={labs.hero.body}
        disclaimer={labs.hero.disclaimer}
        primaryCta={labs.hero.primaryCta}
        secondaryCta={labs.hero.secondaryCta}
        tertiaryCta={labs.hero.tertiaryCta}
      />

      <SectionDivider />

      {/* §2 Credibility */}
      <Section badge={labs.credibility.badge} title={labs.credibility.title}>
        <div className="grid lg:grid-cols-[200px_1fr] gap-10 items-start">
          <div className="w-48 h-48 rounded-2xl overflow-hidden bg-warm-200">
            <Image
              src={labs.credibility.photo}
              alt={labs.credibility.photoAlt}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl">
            {labs.credibility.body}
          </p>
        </div>
      </Section>

      <SectionDivider />

      {/* §3 Stats */}
      <Section badge={labs.stats.badge} title={labs.stats.title}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {labs.stats.items.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-neutral-900 tracking-tight mb-2">{s.value}</div>
              <div className="text-sm text-neutral-600">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §4 Bank map */}
      <Section badge={labs.bankMap.badge} title={labs.bankMap.title}>
        <LabsBankMap boxes={labs.bankMap.boxes} caption={labs.bankMap.caption} />
      </Section>

      <SectionDivider />

      {/* §5–§7 Flagships */}
      <Section badge={labs.flagships.badge} title={labs.flagships.title}>
        <div className="space-y-20">
          {labs.flagships.items.map((f, i) => (
            <LabsFlagship key={f.number} {...f} reverse={i % 2 === 1} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §8 Vignettes */}
      <Section badge={labs.vignettes.badge} title={labs.vignettes.title} description={labs.vignettes.intro}>
        <div className="grid md:grid-cols-2 gap-6">
          {labs.vignettes.items.map((v) => (
            <LabsVignette key={v.title} {...v} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §9 Method */}
      <Section badge={labs.method.badge} title={labs.method.title}>
        <ul className="space-y-6 mb-12 max-w-3xl">
          {labs.method.principles.map((p) => (
            <li key={p.title}>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-1">{p.title}</h3>
              <p className="text-neutral-700 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="p-8 bg-warm-200 border border-neutral-500/10 rounded-2xl mb-10">
          <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-4">{labs.method.artifact.heading}</h3>
          <div className="font-mono text-sm bg-white border border-neutral-500/10 rounded-xl p-5 mb-4 text-neutral-800 whitespace-pre-wrap">
            {labs.method.artifact.promptShown}
          </div>
          <div className="font-mono text-sm bg-white border border-brand-orange/40 rounded-xl p-5 mb-4 text-neutral-900 whitespace-pre-wrap">
            {labs.method.artifact.correctionShown}
          </div>
          {labs.method.artifact.prLink && !labs.method.artifact.prLink.startsWith('{{') && (
            <a href={labs.method.artifact.prLink} className="text-sm font-semibold text-brand-orange">
              View the PR →
            </a>
          )}
        </div>

        <p className="text-base italic text-neutral-600 max-w-3xl">
          {labs.method.disclosure}
        </p>
      </Section>

      <SectionDivider />

      {/* §10 Engagement */}
      <Section badge={labs.engagement.badge} title={labs.engagement.title}>
        <div className="grid md:grid-cols-3 gap-6">
          {labs.engagement.cards.map((c) => (
            <LabsEngagementCard key={c.number} {...c} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §11 Closing */}
      <Section badge={labs.closing.badge} title={labs.closing.title} centered>
        <p className="text-lg text-neutral-700 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
          {labs.closing.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Link href={labs.closing.primaryCta.href} className="btn-primary">{labs.closing.primaryCta.label}</Link>
          <Link href={labs.closing.secondaryCta.href} className="btn-secondary">{labs.closing.secondaryCta.label}</Link>
          <Link href={labs.closing.tertiaryCta.href} className="btn-secondary">{labs.closing.tertiaryCta.label}</Link>
        </div>
      </Section>
    </main>
  )
}
