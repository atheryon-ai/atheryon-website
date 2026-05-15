import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'

const { mibInsightThanks } = site.pages

export const metadata: Metadata = {
  title: mibInsightThanks.title,
  description: mibInsightThanks.description,
  openGraph: {
    title: mibInsightThanks.title,
    description: mibInsightThanks.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: mibInsightThanks.title,
    description: mibInsightThanks.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/programs/mib-insight/thanks',
  },
}

export default function MibInsightThanksPage() {
  return (
    <div className="bg-bone min-h-screen">
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / programs / mib-insight / confirmation
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6 max-w-3xl">
            {mibInsightThanks.headline}
          </h1>
          <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
            {mibInsightThanks.message}
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / programs / mib-insight / confirmation / end-of-document
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-charcoal border border-charcoal hover:bg-charcoal hover:text-bone transition-colors"
          >
            Return home
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
