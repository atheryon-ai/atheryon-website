import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { labsPrompts } = site.pages

export const metadata: Metadata = {
  title: labsPrompts.title,
  description: labsPrompts.description,
  openGraph: { title: labsPrompts.title, description: labsPrompts.description },
  twitter: {
    card: 'summary_large_image',
    title: labsPrompts.title,
    description: labsPrompts.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/labs/prompts' },
}

export default function LabsPromptsPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / labs / prompts"
        title={labsPrompts.hero.headline}
        body={labsPrompts.hero.lede}
      />

      <DocSection label="§01 / What You Get" title={labsPrompts.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={labsPrompts.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="§02 / Best For" title={labsPrompts.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={labsPrompts.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="§03 / Pricing" title={labsPrompts.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {labsPrompts.pricing.body}
        </p>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / labs / prompts / end-of-document
          </div>
          <Link
            href={labsPrompts.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {labsPrompts.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
