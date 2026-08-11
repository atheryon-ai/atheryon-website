import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection } from '@/components'
import { site } from '@/content/site'

// Deliberately orphaned: nothing on the site links here, and `robots.index`
// is false below. It is a post-signup landing page, kept reachable only by
// the 301 from the old /programs/mib-insight/thanks route
// (staticwebapp.config.json) and by whatever confirmation email or external
// form sends people to it. Do not "fix" the missing inbound link.
//
// TODO(terry): two loose ends here. The route and the copy now say "Front
// Office bundle" while the content key is still `mibInsightThanks` from the
// renamed MiB Insight Program — should the key be renamed to match? And
// /offers/prompts sends its CTA to /contact?topic=front-office-bundle rather
// than to a form that lands here, so it is unclear what still delivers a
// visitor to this page. If nothing does, it can be retired along with the 301.
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
    <DocPage numbered={false}>
      <DocBanner
        label="atheryon / offers / prompts / thanks"
        title={t.headline}
        body={t.message}
      />
      <DocSection label="Next" title="">
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
