import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection } from '@/components'
import { site } from '@/content/site'

const t = site.pages.mibInsightThanks

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  openGraph: { title: t.title, description: t.description },
  twitter: { card: 'summary_large_image', title: t.title, description: t.description },
  alternates: { canonical: 'https://atheryon.com.au/offers/prompts/thanks' },
  robots: { index: false, follow: true },
}

export default function OffersPromptsThanksPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers / prompts / thanks"
        title={t.headline}
        body={t.message}
      />
      <DocSection label="§01 / Next" title="">
        <div className="max-w-3xl">
          <p className="text-base md:text-lg text-charcoal/85 leading-relaxed">
            Your Front Office bundle access has been confirmed. The welcome email contains
            the onboarding link and asset bundle. If you haven&apos;t received it within 10
            minutes, reply directly to{' '}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </p>
          <div className="mt-8">
            <Link
              href="/offers"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
            >
              Browse the other offers
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </DocSection>
    </DocPage>
  )
}
