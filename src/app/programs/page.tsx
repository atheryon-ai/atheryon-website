import type { Metadata } from 'next'
import Link from 'next/link'
import { SimpleHero, Section, SectionDivider } from '@/components'
import { site } from '@/content/site'

const { programs } = site.pages

export const metadata: Metadata = {
  title: programs.title,
  description: programs.description,
  openGraph: {
    title: programs.title,
    description: programs.description,
  },
}

export default function ProgramsPage() {
  return (
    <main>
      <SimpleHero
        headline={programs.hero.headline}
        subheadline={programs.hero.subheadline}
      />

      <SectionDivider />

      <Section badge={programs.section.badge} title={programs.section.title}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.programs.map((program) => (
            <div
              key={program.name}
              className={`relative p-8 rounded-3xl border ${
                program.status === 'available'
                  ? 'bg-white border-neutral-500/10 shadow-card'
                  : 'bg-warm-100 border-neutral-500/10'
              }`}
            >
              {program.status === 'coming' && (
                <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Coming
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-2 tracking-tight">
                {program.name}
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">{program.tagline}</p>
              <div className="text-sm text-neutral-500 mb-2">{program.access}</div>
              <div className="text-2xl font-bold text-neutral-900 mb-6">{program.price}</div>
              {program.status === 'available' ? (
                <Link
                  href={program.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all"
                >
                  {program.ctaLabel}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-neutral-500 bg-neutral-100 rounded-full cursor-not-allowed">
                  {program.ctaLabel}
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
