import type { Metadata } from 'next'
import Link from 'next/link'
import { v2Ma } from '@/content/site'

const page = v2Ma.offers
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/ma/offers' },
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <header className="mb-8 pb-4 border-b border-charcoal/15">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
        {label}
      </div>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
        {title}
      </h2>
    </header>
  )
}

export default function MaOffersPage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Hero */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {s.hero.title}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.subtitle}
          </p>
        </div>
      </section>

      {/* §01 The offer — Embedded Execution Specialists */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.offer.label} title={s.offer.title} />
          <div className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl space-y-4 mb-10">
            {s.offer.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-4">
            {s.offer.outcomeListIntro}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mb-10">
            {s.offer.outcomes.map((it, i) => (
              <li key={i} className="border border-charcoal/30 bg-white p-4 flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-charcoal/85 leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
          <Link
            href={s.offer.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {s.offer.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* §02 Code and Prompts — not offered for M&A */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.codeAndPrompts.label} title={s.codeAndPrompts.title} />
          <div className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl space-y-4 mb-6">
            {s.codeAndPrompts.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <Link
            href={s.codeAndPrompts.cmOffersLink.href}
            className="font-mono text-sm text-charcoal underline-offset-4 hover:underline"
          >
            {s.codeAndPrompts.cmOffersLink.label}
          </Link>
        </div>
      </section>

      {/* End-of-document */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / m-and-a / offers / end-of-document
          </div>
        </div>
      </section>
    </div>
  )
}
