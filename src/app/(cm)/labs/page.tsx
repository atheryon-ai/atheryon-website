import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { labs } = site.pages

const isPending = (value: string) => value.startsWith('{{')

export const metadata: Metadata = {
  title: labs.title,
  description: labs.description,
  openGraph: { title: labs.title, description: labs.description },
  twitter: {
    card: 'summary_large_image',
    title: labs.title,
    description: labs.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/labs',
  },
}

export default function LabsPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / labs / system"
        title={`${labs.hero.headlineLine1}. ${labs.hero.headlineLine2}`}
        body={labs.hero.body}
      />

      {/* §01 Why credible */}
      <DocSection label="§01 / Why Credible" title={labs.whyCredible.title}>
        <div className="space-y-5 max-w-3xl">
          {labs.whyCredible.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-base md:text-lg text-charcoal/85 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </DocSection>

      {/* §02 Offers preview */}
      <DocSection label="§02 / Offers" title={labs.offersPreview.title}>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
          {labs.offersPreview.items.map((item, i) => (
            <li key={item.title} className="bg-bone p-6 flex flex-col">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
                {String(i + 1).padStart(2, '0')}
              </div>
              <a
                href={item.anchorHref}
                className="font-display text-xl font-medium text-charcoal tracking-tight leading-snug underline-offset-4 hover:underline mb-2"
              >
                {item.title}
              </a>
              <p className="text-sm text-charcoal/80 leading-relaxed mb-4 flex-1">{item.oneLiner}</p>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/60">
                Jump to detail ↓
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-10 pt-6 border-t border-charcoal/15">
          <Link
            href="/labs/themes"
            className="inline-flex items-center gap-2 font-mono text-sm text-charcoal underline-offset-4 hover:underline"
          >
            Browse the full surface — 26 themes · 111 pages
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </DocSection>

      {/* §03 Evidence */}
      <DocSection label="§03 / Evidence" title={labs.evidence.title}>
        <ol className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-charcoal/15 border border-charcoal/15 mb-10">
          {labs.evidence.statsItems.map((s) => (
            <li key={s.label} className="bg-bone p-5 flex flex-col">
              <div className="font-display text-3xl md:text-4xl font-medium text-charcoal tracking-tight leading-none mb-3">
                {s.value}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/65 leading-snug">
                {s.label}
              </div>
            </li>
          ))}
        </ol>

        <div className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
          Coverage
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-charcoal/15 border border-charcoal/15 mb-4">
          {labs.evidence.boxes.map((name) => (
            <li
              key={name}
              className="bg-bone px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-charcoal"
            >
              {name}
            </li>
          ))}
        </ul>
        <p className="text-sm text-charcoal/70 italic mb-10 max-w-3xl">{labs.evidence.caption}</p>

        <div className="pt-8 border-t border-charcoal/15">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-3">
            Ecosystem
          </div>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-3">
            {labs.evidence.partners.map((p) => {
              // Anthropic brand-typography (Poppins) for the Claude attribution only;
              // Microsoft/S&P stay in the site's mono treatment.
              const isClaude = p.name.toLowerCase().includes('claude')
              return isClaude ? (
                <span
                  key={p.name}
                  className="text-sm text-charcoal"
                  style={{ fontFamily: "'Poppins', system-ui, Arial, sans-serif", fontWeight: 500, letterSpacing: '-0.005em' }}
                >
                  {p.name}
                </span>
              ) : (
                <span key={p.name} className="font-mono text-sm text-charcoal">
                  {p.name}
                </span>
              )
            })}
          </div>
          <p className="text-sm italic text-charcoal/70 max-w-3xl">{labs.evidence.partnersCaption}</p>
        </div>
      </DocSection>

      {/* §04 Flagships */}
      <DocSection label="§04 / Flagships" title={labs.flagships.title}>
        <div className="space-y-16">
          {labs.flagships.items.map((f) => (
            <article key={f.number} className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-3">
                  Flagship {f.number}
                </div>
                <h3 className="font-display text-3xl font-medium text-charcoal tracking-tight mb-6 leading-tight">
                  {f.name}
                </h3>
                <div className="space-y-5 text-base text-charcoal/85 leading-relaxed">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-1">
                      Problem
                    </div>
                    <p>{f.problem}</p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-1">
                      How it works
                    </div>
                    <p>{f.howItWorks}</p>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-1">
                      CV anchor
                    </div>
                    <p>{f.metric}</p>
                  </div>
                  {!isPending(f.footer) && (
                    <p className="font-mono text-xs text-charcoal/60">{f.footer}</p>
                  )}
                </div>
                {'sidebarVignette' in f && f.sidebarVignette && (
                  <div className="mt-8 pt-6 border-t border-charcoal/15">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-2">
                      Vignette
                    </div>
                    <h4 className="font-display text-lg font-medium text-charcoal tracking-tight mb-3">
                      {f.sidebarVignette.title}
                    </h4>
                    <p className="text-sm text-charcoal/80 mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/55 mr-2">
                        AI proposed
                      </span>
                      {f.sidebarVignette.aiProposed}
                    </p>
                    <p className="text-sm text-charcoal/80">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/55 mr-2">
                        Banker corrected
                      </span>
                      {f.sidebarVignette.bankerCorrected}
                    </p>
                  </div>
                )}
              </div>
              <div className="border border-charcoal/30 bg-white">
                <Image
                  src={f.screenshot}
                  alt={f.screenshotAlt}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </article>
          ))}
        </div>
      </DocSection>

      {/* §05 Banker × AI */}
      <DocSection label="§05 / Banker × AI" title={labs.bankerWedge.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl mb-10">
          {labs.bankerWedge.intro}
        </p>
        <div className="grid lg:grid-cols-[200px_1fr] gap-10 items-start mb-12">
          <div className="w-48 h-48 overflow-hidden border border-charcoal/30 bg-white">
            <Image
              src={labs.bankerWedge.photo}
              alt={labs.bankerWedge.photoAlt}
              width={400}
              height={400}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
            {labs.bankerWedge.bio}
          </p>
        </div>
        <ol className="grid md:grid-cols-2 gap-px bg-charcoal/15 border border-charcoal/15">
          {labs.bankerWedge.vignettes.map((v, i) => (
            <li key={v.title} className="bg-bone p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-2">
                Vignette {String(i + 1).padStart(2, '0')}
              </div>
              <h4 className="font-display text-xl font-medium text-charcoal tracking-tight mb-4">
                {v.title}
              </h4>
              <p className="text-sm text-charcoal/85 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/55 mr-2">
                  AI proposed
                </span>
                {v.aiProposed}
              </p>
              <p className="text-sm text-charcoal/85">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/55 mr-2">
                  Banker corrected
                </span>
                {v.bankerCorrected}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      {/* §06 Method */}
      <DocSection id="method" label="§06 / Method" title={labs.method.title}>
        <ul className="space-y-6 mb-12 max-w-3xl">
          {labs.method.principles.map((p, i) => (
            <li key={p.title}>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/55 mb-1">
                Principle {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl font-medium text-charcoal tracking-tight mb-1">
                {p.title}
              </h3>
              <p className="text-base text-charcoal/85 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>

        <div className="border border-charcoal/30 bg-white p-6 md:p-8 mb-10 max-w-3xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-2">
            Economics
          </div>
          <h3 className="font-display text-xl font-medium text-charcoal tracking-tight mb-3">
            {labs.method.economics.heading}
          </h3>
          <p className="text-base text-charcoal/85 leading-relaxed">{labs.method.economics.body}</p>
        </div>

        {!isPending(labs.method.artifact.promptShown) && !isPending(labs.method.artifact.correctionShown) && (
          <div className="border border-charcoal/30 bg-white p-6 md:p-8 mb-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-2">
              Artifact
            </div>
            <h3 className="font-display text-xl font-medium text-charcoal tracking-tight mb-4">
              {labs.method.artifact.heading}
            </h3>
            <div className="font-mono text-sm bg-bone border border-charcoal/30 p-5 mb-4 text-charcoal/90 whitespace-pre-wrap">
              {labs.method.artifact.promptShown}
            </div>
            <div className="font-mono text-sm bg-bone border border-charcoal p-5 mb-4 text-charcoal whitespace-pre-wrap">
              {labs.method.artifact.correctionShown}
            </div>
            {labs.method.artifact.prLink && !isPending(labs.method.artifact.prLink) && (
              <a
                href={labs.method.artifact.prLink}
                className="font-mono text-sm text-charcoal underline-offset-4 hover:underline"
              >
                View the PR →
              </a>
            )}
          </div>
        )}

        <p className="text-sm italic text-charcoal/70 max-w-3xl">{labs.method.disclosure}</p>
      </DocSection>

      {/* §07 Engagement */}
      <DocSection label="§07 / Engagement" title={labs.engagement.title}>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15 mb-12">
          {labs.engagement.cards.map((c) => (
            <li key={c.id} id={c.anchorId} className="bg-bone p-6 lg:p-7 flex flex-col scroll-mt-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
                offer {c.number}
              </div>
              <h3 className="font-display text-2xl font-medium text-charcoal tracking-tight leading-snug mb-3">
                {c.title}
              </h3>
              <p className="text-sm text-charcoal/85 leading-relaxed mb-5 flex-1">{c.body}</p>
              <Link
                href={c.ctaHref}
                className="inline-flex self-start items-center justify-center gap-2 px-5 py-2.5 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
              >
                {c.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="pt-8 border-t border-charcoal/15 max-w-3xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/60 mb-3">
            {labs.closing.badge}
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight mb-3">
            {labs.closing.title}
          </h3>
          <p className="text-base text-charcoal/85 leading-relaxed mb-8">{labs.closing.body}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={labs.closing.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
            >
              {labs.closing.primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href={labs.closing.tertiaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-charcoal border border-charcoal hover:bg-charcoal hover:text-bone transition-colors"
            >
              {labs.closing.tertiaryCta.label}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </DocSection>
    </DocPage>
  )
}
