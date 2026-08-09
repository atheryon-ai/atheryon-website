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
    <DocPage numbered={false}>
      <DocBanner
        label="atheryon / offers / code"
        title={code.hero.headline}
        body={code.hero.lede}
      />

      <DocSection label="What You Get" title={code.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={code.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="Best For" title={code.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={code.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="Pricing" title={code.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {code.pricing.body}
        </p>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
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
