import type { Metadata } from 'next'
import Link from 'next/link'
import { v2 } from '@/content/site'

const page = v2.pages.approach

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/approach' },
}

// ─────────────────────────────────────────────────────────────────────────────
// /approach — Stub. Awaits user specification of build methodology.
// Tone: institutional, architectural, precise. No marketing chrome.
// ─────────────────────────────────────────────────────────────────────────────

export default function ApproachPage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Header banner */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / approach / build-method
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            Approach
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {page.intent}
          </p>
        </div>
      </section>

      {/* Pending specification */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              §01 / Specification
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
              Build method
            </h2>
          </header>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/45">
            {'{{PENDING_APPROACH_BUILD_METHOD}}'}
          </p>
        </div>
      </section>

      {/* End-of-document action */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / approach / end-of-document
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
