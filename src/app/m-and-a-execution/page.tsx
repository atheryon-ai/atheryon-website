import type { Metadata } from 'next'
import { SimpleHero, CTASection } from '@/components'
import { site } from '@/content/site'

const { maExecution } = site.pages

export const metadata: Metadata = {
  title: maExecution.title,
  description: maExecution.description,
  openGraph: {
    title: maExecution.title,
    description: maExecution.description,
  },
}

export default function MAExecutionPage() {
  return (
    <>
      <SimpleHero
        headline={maExecution.hero.headline}
        subheadline={maExecution.hero.subheadline}
        badge="M&A Execution"
      />

      <CTASection
        text="Have an M&A data challenge? Let's talk."
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
