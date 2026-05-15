import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocFooter } from '@/components'
import { site } from '@/content/site'

const { programs } = site.pages

export const metadata: Metadata = {
  title: programs.title,
  description: programs.description,
  openGraph: {
    title: programs.title,
    description: programs.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: programs.title,
    description: programs.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/programs',
  },
}

export default function ProgramsPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / programs / index"
        title={programs.hero.headline}
        body={programs.hero.subheadline}
      />

      <DocSection label="§01 / Programs" title={programs.section.title}>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
          {programs.programs.map((program, i) => {
            const available = program.status === 'available'
            return (
              <li key={program.name} className="bg-bone p-6 lg:p-7 flex flex-col">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {!available && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal/45">
                      Coming
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl font-medium text-charcoal tracking-tight leading-snug mb-3">
                  {program.name}
                </h3>
                <p className="text-base text-charcoal/80 leading-relaxed mb-4">
                  {program.tagline}
                </p>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/60 mb-2">
                  {program.access}
                </div>
                <div className="font-display text-xl font-medium text-charcoal mb-5">
                  {program.price}
                </div>
                {available ? (
                  <Link
                    href={program.href}
                    className="inline-flex self-start items-center justify-center gap-2 px-5 py-2.5 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
                  >
                    {program.ctaLabel}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span
                    role="button"
                    aria-disabled="true"
                    className="inline-flex self-start items-center justify-center gap-2 px-5 py-2.5 font-mono text-sm font-medium text-charcoal/40 border border-charcoal/20 cursor-not-allowed"
                  >
                    {program.ctaLabel}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </DocSection>

      <DocFooter label="atheryon / programs / end-of-document" />
    </DocPage>
  )
}
