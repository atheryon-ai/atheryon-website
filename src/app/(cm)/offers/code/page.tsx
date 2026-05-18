import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { code } = site.pages.offers

export const metadata: Metadata = {
  title: code.title,
  description: code.description,
  openGraph: { title: code.title, description: code.description },
  twitter: {
    card: 'summary_large_image',
    title: code.title,
    description: code.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/offers/code' },
}

export default function OffersCodePage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers / code"
        title={code.hero.headline}
        body={code.hero.lede}
      />

      <DocSection label="§01 / What You Get" title={code.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={code.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="§02 / Best For" title={code.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={code.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="§03 / Pricing" title={code.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {code.pricing.body}
        </p>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / offers / code / end-of-document
          </div>
          <Link
            href={code.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {code.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
