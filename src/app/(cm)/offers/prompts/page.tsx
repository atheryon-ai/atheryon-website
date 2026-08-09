import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocBullets } from '@/components'
import { site } from '@/content/site'

const { prompts } = site.pages.offers

export const metadata: Metadata = {
  title: prompts.title,
  description: prompts.description,
  openGraph: { title: prompts.title, description: prompts.description },
  twitter: {
    card: 'summary_large_image',
    title: prompts.title,
    description: prompts.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/offers/prompts' },
}

export default function OffersPromptsPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers / prompts"
        title={prompts.hero.headline}
        body={prompts.hero.lede}
      />

      <DocSection label="What You Get" title={prompts.whatYouGet.title}>
        <div className="max-w-3xl">
          <DocBullets items={prompts.whatYouGet.items} />
        </div>
      </DocSection>

      <DocSection label="Best For" title={prompts.bestFor.title}>
        <div className="max-w-3xl">
          <DocBullets items={prompts.bestFor.items} />
        </div>
      </DocSection>

      <DocSection label="Pricing" title={prompts.pricing.title}>
        <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
          {prompts.pricing.body}
        </p>
      </DocSection>

      <DocSection
        label="Front Office bundle"
        title={prompts.frontOfficeBundle.title}
      >
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-3">
            {prompts.frontOfficeBundle.badge} · {prompts.frontOfficeBundle.price}
          </div>
          <p className="text-base text-charcoal/85 leading-relaxed mb-6">
            {prompts.frontOfficeBundle.body}
          </p>
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-charcoal/60 mb-2">
            Modules
          </div>
          <DocBullets items={prompts.frontOfficeBundle.modules} />
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-charcoal/60 mt-6 mb-2">
            Artifact types
          </div>
          <DocBullets items={prompts.frontOfficeBundle.artifactTypes} />
          <div className="mt-6">
            <Link
              href={prompts.frontOfficeBundle.cta.href}
              className="inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
            >
              {prompts.frontOfficeBundle.cta.label}
            </Link>
          </div>
        </div>
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <Link
            href={prompts.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {prompts.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DocPage>
  )
}
