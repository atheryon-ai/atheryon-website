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
      {/* §1 Hero — speed wedge */}
      <LabsHero
        headlineLine1={labs.hero.headlineLine1}
        headlineLine2={labs.hero.headlineLine2}
        body={labs.hero.body}
        primaryCta={labs.hero.primaryCta}
        secondaryCta={labs.hero.secondaryCta}
        tertiaryCta={labs.hero.tertiaryCta}
      />

      <SectionDivider />

      {/* §1.5 Why this is credible */}
      <Section badge={labs.whyCredible.badge} title={labs.whyCredible.title}>
        <div className="space-y-5 max-w-3xl">
          {labs.whyCredible.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-lg text-neutral-700 leading-relaxed">{p}</p>
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §2 Offers preview — surfaced early so the AI-co reader sees the ask in <30s */}
      <Section badge={labs.offersPreview.badge} title={labs.offersPreview.title}>
        <div className="grid md:grid-cols-3 gap-6">
          {labs.offersPreview.items.map((item) => (
            <a
              key={item.title}
              href={item.anchorHref}
              className="block p-6 bg-white border border-neutral-500/10 rounded-2xl hover:shadow-card transition-shadow group"
            >
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-2 group-hover:text-brand-orange transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">{item.oneLiner}</p>
              <span className="text-xs font-semibold text-brand-orange">Jump to detail ↓</span>
            </a>
          ))}
        </div>

        {/* Phase B addition — link to discovery surface */}
        <div className="mt-10 pt-6 border-t border-neutral-500/10">
          <Link href="/labs/themes" className="inline-flex items-center text-sm font-semibold text-brand-orange hover:underline">
            Browse the full surface — 29 themes · 147 pages →
          </Link>
        </div>
      </Section>

      <SectionDivider />

      {/* §3 Evidence — stats + bank map + partners */}
      <Section badge={labs.evidence.badge} title={labs.evidence.title}>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {labs.evidence.statsItems.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-2">{s.value}</div>
              <div className="text-sm text-neutral-600">{s.label}</div>
            </div>
          ))}
        </div>
        <LabsBankMap boxes={labs.evidence.boxes} caption={labs.evidence.caption} />
        <div className="mt-10 pt-8 border-t border-neutral-500/10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Ecosystem
            </span>
            {labs.evidence.partners.map((p) => (
              <span key={p.name} className="text-sm font-semibold text-neutral-900">
                {p.name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm italic text-neutral-600">{labs.evidence.partnersCaption}</p>
        </div>
      </Section>

      <SectionDivider />

      {/* §4 Flagships */}
      <Section badge={labs.flagships.badge} title={labs.flagships.title}>
        <div className="space-y-20">
          {labs.flagships.items.map((f, i) => (
            <LabsFlagship key={f.number} {...f} reverse={i % 2 === 1} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §5 Banker × AI — bio + 2 vignettes */}
      <Section
        badge={labs.bankerWedge.badge}
        title={labs.bankerWedge.title}
        description={labs.bankerWedge.intro}
      >
        <div className="grid lg:grid-cols-[200px_1fr] gap-10 items-start mb-12">
          <div className="w-48 h-48 rounded-2xl overflow-hidden bg-warm-200">
            <Image
              src={labs.bankerWedge.photo}
              alt={labs.bankerWedge.photoAlt}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg text-neutral-700 leading-relaxed max-w-3xl">
            {labs.bankerWedge.bio}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {labs.bankerWedge.vignettes.map((v) => (
            <LabsVignette key={v.title} {...v} />
          ))}
        </div>
      </Section>

      <SectionDivider />

      {/* §6 Method */}
      <Section
        id="method"
        badge={labs.method.badge}
        title={labs.method.title}
      >
        <ul className="space-y-6 mb-12 max-w-3xl">
          {labs.method.principles.map((p) => (
            <li key={p.title}>
              <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-1">{p.title}</h3>
              <p className="text-neutral-700 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="p-8 bg-warm-200 border border-neutral-500/10 rounded-2xl mb-10 max-w-3xl">
          <h3 className="text-lg font-bold text-neutral-900 tracking-tight mb-3">
            {labs.method.economics.heading}
          </h3>
          <p className="text-neutral-700 leading-relaxed">{labs.method.economics.body}</p>
        </div>

        {!labs.method.artifact.promptShown.startsWith('{{') && !labs.method.artifact.correctionShown.startsWith('{{') && (
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
        )}

        <p className="text-base italic text-neutral-600 max-w-3xl">
          {labs.method.disclosure}
        </p>
      </Section>

      <SectionDivider />

      {/* §7 Engagement (full triad) + closing */}
      <Section badge={labs.engagement.badge} title={labs.engagement.title}>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {labs.engagement.cards.map((c) => (
            <div key={c.number} id={c.anchorId} className="scroll-mt-24">
              <LabsEngagementCard
                number={c.number}
                title={c.title}
                body={c.body}
                ctaLabel={c.ctaLabel}
                ctaHref={c.ctaHref}
              />
            </div>
          ))}
        </div>

        <div className="text-center pt-8 border-t border-neutral-500/10">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand-orange mb-3">
            {labs.closing.badge}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-4">
            {labs.closing.title}
          </h3>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            {labs.closing.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link href={labs.closing.primaryCta.href} className="btn-primary">{labs.closing.primaryCta.label}</Link>
            <Link href={labs.closing.secondaryCta.href} className="btn-secondary">{labs.closing.secondaryCta.label}</Link>
            <Link href={labs.closing.tertiaryCta.href} className="btn-secondary">{labs.closing.tertiaryCta.label}</Link>
          </div>
        </div>
      </Section>
    </main>
  )
}
