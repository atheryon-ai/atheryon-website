import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { labsAdvisory } = site.pages

export const metadata: Metadata = {
  title: labsAdvisory.title,
  description: labsAdvisory.description,
  openGraph: { title: labsAdvisory.title, description: labsAdvisory.description },
  twitter: {
    card: 'summary_large_image',
    title: labsAdvisory.title,
    description: labsAdvisory.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/labs/advisory' },
}

export default function LabsAdvisoryPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / labs / advisory"
        title={labsAdvisory.hero.headline}
        body={labsAdvisory.hero.lede}
      />

      <DocSection label="§01 / What You Get" title={labsAdvisory.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={labsAdvisory.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="§02 / Best For" title={labsAdvisory.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={labsAdvisory.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="§03 / Pricing" title={labsAdvisory.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {labsAdvisory.pricing.body}
        </p>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / labs / advisory / end-of-document
          </div>
          <Link
            href={labsAdvisory.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {labsAdvisory.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
