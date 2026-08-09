import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocPage, DocSection } from '@/components/Doc'
import { v2 } from '@/content/site'

const page = v2.pages.home
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
  alternates: { canonical: 'https://atheryon.com.au/' },
}

export default function HomePage() {
  return (
    <DocPage>
      <DocBanner
        label={s.hero.label}
        title={s.hero.headline}
        body={s.hero.subhead}
      />

      <DocSection label={s.selectedWork.label} title={s.selectedWork.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.selectedWork.entries.map((entry) => (
            <li
              key={entry.id}
              id={entry.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-10 scroll-mt-24"
            >
              <header>
                <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 mb-3">
                  {entry.index}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
                  {entry.title}
                </h3>
              </header>

              <dl className="divide-y divide-charcoal/15 border-t border-charcoal/15 md:border-t-0">
                {entry.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-2 sm:gap-6 py-5 first:pt-5 md:first:pt-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/60">
                      {detail.label}
                    </dt>
                    <dd className="text-base md:text-lg text-charcoal/85 leading-relaxed">
                      {detail.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection
        label={s.practiceHierarchy.label}
        title={s.practiceHierarchy.title}
      >
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.practiceHierarchy.entries.map((entry) => (
            <li
              key={entry.index}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_minmax(16rem,0.8fr)_minmax(0,1.2fr)] gap-x-5 md:gap-x-8 gap-y-4 py-8 md:py-10"
            >
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 pt-1">
                {entry.index}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight leading-tight">
                <Link
                  href={entry.href}
                  className="text-charcoal border-b border-charcoal/30 hover:border-charcoal transition-colors"
                >
                  {entry.title}
                </Link>
              </h3>
              <p className="col-start-2 md:col-start-3 text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
                {entry.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>
    </DocPage>
  )
}
