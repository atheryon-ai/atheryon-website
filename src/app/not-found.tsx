import type { Metadata } from 'next'
import Link from 'next/link'
import { SimpleHero, Section, SectionDivider } from '@/components'

export const metadata: Metadata = {
  title: 'Page not found — Atheryon',
  description: 'The page you requested does not exist on atheryon.com.au.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <>
      <SimpleHero
        headline="That page is not on the map."
        subheadline="The URL you followed does not match a known page on Atheryon."
        badge="404"
      />

      <SectionDivider />

      <Section>
        <div className="max-w-2xl">
          <p className="text-neutral-700 leading-relaxed mb-8">
            If you arrived from an external link, the page may have moved or been retired.
            The links below cover the current information architecture.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/reality"
              className="block p-5 rounded-2xl border border-neutral-200 bg-white hover:bg-warm-50 transition-colors"
            >
              <div className="text-sm text-neutral-500 mb-1">Start here</div>
              <div className="font-semibold text-neutral-900">Reality</div>
            </Link>
            <Link
              href="/data"
              className="block p-5 rounded-2xl border border-neutral-200 bg-white hover:bg-warm-50 transition-colors"
            >
              <div className="text-sm text-neutral-500 mb-1">Pillar</div>
              <div className="font-semibold text-neutral-900">Data</div>
            </Link>
            <Link
              href="/ai-direction"
              className="block p-5 rounded-2xl border border-neutral-200 bg-white hover:bg-warm-50 transition-colors"
            >
              <div className="text-sm text-neutral-500 mb-1">Pillar</div>
              <div className="font-semibold text-neutral-900">AI Direction</div>
            </Link>
            <Link
              href="/transformation"
              className="block p-5 rounded-2xl border border-neutral-200 bg-white hover:bg-warm-50 transition-colors"
            >
              <div className="text-sm text-neutral-500 mb-1">Pillar</div>
              <div className="font-semibold text-neutral-900">Transformation</div>
            </Link>
            <Link
              href="/labs"
              className="block p-5 rounded-2xl border border-neutral-200 bg-white hover:bg-warm-50 transition-colors"
            >
              <div className="text-sm text-neutral-500 mb-1">Working artefact</div>
              <div className="font-semibold text-neutral-900">Labs</div>
            </Link>
            <Link
              href="/contact"
              className="block p-5 rounded-2xl border border-neutral-200 bg-white hover:bg-warm-50 transition-colors"
            >
              <div className="text-sm text-neutral-500 mb-1">Get in touch</div>
              <div className="font-semibold text-neutral-900">Contact</div>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
