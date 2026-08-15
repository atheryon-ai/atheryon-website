import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

// Stacked, not a chooser (Terry 2026-08-15). Each arm's block leads with its
// own approach, taken verbatim from that arm's page, and links through for the
// rest. The route stays a destination rather than a fork.
const page = v3.pages.approach
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/approach' },
}

export default function ApproachPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      {s.arms.map((arm) => (
        <DocSection key={arm.href} label={arm.label} title={arm.title}>
          <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
            {arm.body.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Link
            href={arm.href}
            className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/70 hover:text-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          >
            {arm.label} in full
            <span aria-hidden="true">→</span>
          </Link>
        </DocSection>
      ))}

      <DocFooter label="atheryon / approach / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
