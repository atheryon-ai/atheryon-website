import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { labsCode } = site.pages

export const metadata: Metadata = {
  title: labsCode.title,
  description: labsCode.description,
  openGraph: { title: labsCode.title, description: labsCode.description },
  twitter: {
    card: 'summary_large_image',
    title: labsCode.title,
    description: labsCode.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/labs/code' },
}

export default function LabsCodePage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / labs / code"
        title={labsCode.hero.headline}
        body={labsCode.hero.lede}
      />

      <DocSection label="§01 / What You Get" title={labsCode.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={labsCode.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="§02 / Best For" title={labsCode.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={labsCode.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="§03 / Pricing" title={labsCode.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {labsCode.pricing.body}
        </p>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / labs / code / end-of-document
          </div>
          <Link
            href={labsCode.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {labsCode.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
