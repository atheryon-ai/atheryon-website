import type { Metadata } from 'next'
import Link from 'next/link'
import { v2Mortgages } from '@/content/site'

const page = v2Mortgages.home
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/mortgages' },
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <header className="mb-8 pb-4 border-b border-charcoal/15">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
        {label}
      </div>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
        {title}
      </h2>
    </header>
  )
}

export default function MortgagesPage() {
  return (
    <div className="bg-bone min-h-screen">
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {s.hero.title}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.body}
          </p>
        </div>
      </section>

      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.thesis.label} title={s.thesis.title} />
          <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
            {s.thesis.body}
          </p>
        </div>
      </section>

      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.scope.label} title={s.scope.title} />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
            {s.scope.items.map((it) => (
              <li key={it.id} className="bg-bone p-6 flex flex-col">
                <div className="font-display text-xl font-medium text-charcoal mb-2">
                  {it.name}
                </div>
                <p className="text-sm text-charcoal/80 leading-relaxed">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.status.label} title={s.status.title} />
          <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
            {s.status.body}
          </p>
        </div>
      </section>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / mortgages / end-of-document
          </div>
          <Link
            href={s.cta.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {s.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
