import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/content/site'

const { mibInsightThanks } = site.pages

export const metadata: Metadata = {
  title: mibInsightThanks.title,
  description: mibInsightThanks.description,
  openGraph: {
    title: mibInsightThanks.title,
    description: mibInsightThanks.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: mibInsightThanks.title,
    description: mibInsightThanks.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/programs/mib-insight/thanks',
  },
}

export default function MibInsightThanksPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-32">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex w-16 h-16 rounded-full bg-brand-orange/10 items-center justify-center mb-8">
          <svg className="w-8 h-8 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
          {mibInsightThanks.headline}
        </h1>
        <p className="text-lg text-neutral-700 leading-relaxed mb-10">{mibInsightThanks.message}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-neutral-900 bg-white border border-neutral-200 rounded-full hover:bg-warm-100 transition-all"
        >
          Return home
        </Link>
      </div>
    </div>
  )
}
