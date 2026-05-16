import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { consult } = site.pages.offers

export const metadata: Metadata = {
  title: consult.title,
  description: consult.description,
  openGraph: { title: consult.title, description: consult.description },
  twitter: {
    card: 'summary_large_image',
    title: consult.title,
    description: consult.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/offers/consult' },
}

export default function OffersConsultPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers / consult"
        title={consult.hero.headline}
        body={consult.hero.lede}
      />

      <DocSection label="§01 / What You Get" title={consult.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={consult.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="§02 / Best For" title={consult.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={consult.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="§03 / Pricing" title={consult.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {consult.pricing.body}
        </p>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / offers / consult / end-of-document
          </div>
          <Link
            href={consult.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {consult.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
