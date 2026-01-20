import type { Metadata } from 'next'
import { SimpleHero, CTASection } from '@/components'
import { site } from '@/content/site'

const { mergers } = site.pages

export const metadata: Metadata = {
  title: mergers.title,
  description: mergers.description,
  openGraph: {
    title: mergers.title,
    description: mergers.description,
  },
}

export default function MergersAcquisitionsPage() {
  return (
    <>
      <SimpleHero
        headline={mergers.hero.headline}
        subheadline={mergers.hero.subheadline}
        badge="M&A"
      />

      <CTASection
        text="Have an M&A data challenge? Let's talk."
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
