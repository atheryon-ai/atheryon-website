import type { Metadata } from 'next'
import Link from 'next/link'
import { EngagementModel } from '@/components'
import { v2 } from '@/content/site'

const home = v2.pages.home
const s = home.sections

const isPending = (value: string) => value.startsWith('{{')

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  openGraph: { title: home.title, description: home.description },
  twitter: {
    card: 'summary_large_image',
    title: home.title,
    description: home.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/' },
}

// ─────────────────────────────────────────────────────────────────────────────
// / — Capital markets AI systems interface (not a brochure site).
// Tone: institutional, architectural, precise. No marketing chrome.
// Section order is user-locked: do not reorder, do not add sections.
// ─────────────────────────────────────────────────────────────────────────────

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <header className="mb-8 pb-4 border-b border-charcoal/15">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
        {label}
      </div>
      {title && (
        <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
          {title}
        </h2>
      )}
    </header>
  )
}

function PendingNote({ token }: { token: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/45">
      {token}
    </p>
  )
}

export default function HomePage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* §00 HeroSection — document banner */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / home / capital-markets-ai-systems-interface
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6 max-w-5xl">
            {s.hero.headline}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.subhead}
          </p>
        </div>
      </section>

      {/* §01 TransformationSection */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label="§01 / Transformation" title={s.transformation.title} />
          {isPending(s.transformation.body) ? (
            <PendingNote token={s.transformation.body} />
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl">
              {s.transformation.body}
            </p>
          )}
        </div>
      </section>

      {/* §02 CapabilityOverview — 3 cards */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label="§02 / Capability Overview" title="" />
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
            {s.capabilityOverview.cards.map((card, i) => (
              <li key={card.name} className="bg-bone p-6 lg:p-7 flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <Link
                  href={card.href}
                  className="font-display text-2xl font-medium text-charcoal tracking-tight leading-snug underline-offset-4 hover:underline"
                >
                  {card.name}
                </Link>
                {card.qualifier && (
                  <p className="font-mono text-xs text-charcoal/70 mt-2">
                    {card.qualifier}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §03 ProofSystemTeaser */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label="§03 / Proof" title={s.proofSystem.title} />
          {isPending(s.proofSystem.body) ? (
            <PendingNote token={s.proofSystem.body} />
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl mb-6">
              {s.proofSystem.body}
            </p>
          )}
          <div className="mt-6">
            <Link
              href={s.proofSystem.cta.href}
              className="inline-flex items-center gap-2 font-mono text-sm text-charcoal underline-offset-4 hover:underline"
            >
              {s.proofSystem.cta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* §04 EngagementModelPreview */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label="§04 / Engagement Model" title={s.engagementModelPreview.title} />
          <EngagementModel />
          <div className="mt-8">
            <Link
              href={s.engagementModelPreview.fullLink.href}
              className="inline-flex items-center gap-2 font-mono text-sm text-charcoal underline-offset-4 hover:underline"
            >
              {s.engagementModelPreview.fullLink.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* §05 EcosystemStack */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label="§05 / Ecosystem" title={s.ecosystemStack.title} />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal/15 border border-charcoal/15">
            {s.ecosystemStack.items.map((item, i) => (
              <li key={item.name} className="bg-bone p-6 lg:p-7 flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-xl font-medium text-charcoal tracking-tight leading-snug">
                  {item.name}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §06 CTASection */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              atheryon / home / end-of-document
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={s.cta.primary.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
              >
                {s.cta.primary.label}
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={s.cta.secondary.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-charcoal border border-charcoal hover:bg-charcoal hover:text-bone transition-colors"
              >
                {s.cta.secondary.label}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
