import type { Metadata } from 'next'
import Link from 'next/link'
import { v2 } from '@/content/site'

const page = v2.pages.about
const s = page.sections

const isPending = (value: string) => value.startsWith('{{')

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/about' },
}

// ─────────────────────────────────────────────────────────────────────────────
// /about — Institutional, not narrative or personal.
// Banking-lineage framing: experience environments, NOT employment or
// system-ownership claims. Aesthetic matches /system + /engagements.
// ─────────────────────────────────────────────────────────────────────────────

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

function PendingNote({ token }: { token: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/45">
      {token}
    </p>
  )
}

export default function AboutPage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Header banner */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / about / firm-overview
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            About
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {page.intent}
          </p>
        </div>
      </section>

      {/* §01 What Atheryon is */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.whatAtheryonIs.label} title={s.whatAtheryonIs.title} />
          <p className="font-mono text-sm uppercase tracking-[0.12em] text-charcoal/60 mb-4">
            {s.whatAtheryonIs.descriptor}
          </p>
          <p className="text-lg md:text-xl text-charcoal/85 leading-relaxed max-w-3xl">
            {v2.identity}
          </p>
        </div>
      </section>

      {/* §02 Banking Lineage */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.bankingLineage.label} title={s.bankingLineage.title} />
          <p className="font-mono text-sm uppercase tracking-[0.12em] text-charcoal/60 mb-3">
            {s.bankingLineage.framing}
          </p>
          <p className="text-sm md:text-base text-charcoal/70 italic mb-8 max-w-3xl">
            {s.bankingLineage.disclaimer}
          </p>
          <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15 max-w-2xl">
            {s.bankingLineage.institutions.map((name, i) => (
              <li
                key={name}
                className="grid grid-cols-[auto_1fr] gap-4 items-baseline py-4"
              >
                <span className="font-mono text-xs text-charcoal/50 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl md:text-2xl font-medium text-charcoal tracking-tight">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §03 System Philosophy */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.systemPhilosophy.label} title={s.systemPhilosophy.title} />
          <p className="font-mono text-base md:text-lg text-charcoal mb-8">
            {s.systemPhilosophy.formula}
          </p>
          {isPending(s.systemPhilosophy.body) ? (
            <PendingNote token={s.systemPhilosophy.body} />
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl">
              {s.systemPhilosophy.body}
            </p>
          )}
        </div>
      </section>

      {/* §04 Why Now */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.whyNow.label} title={s.whyNow.title} />
          <p className="font-mono text-base md:text-lg text-charcoal mb-8">
            {s.whyNow.descriptor}
          </p>
          {isPending(s.whyNow.body) ? (
            <PendingNote token={s.whyNow.body} />
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl">
              {s.whyNow.body}
            </p>
          )}
        </div>
      </section>

      {/* End-of-document action */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / about / end-of-document
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {v2.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
