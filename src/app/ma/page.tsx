import type { Metadata } from 'next'
import Link from 'next/link'
import { v2Ma } from '@/content/site'

const page = v2Ma.home
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/ma' },
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

export default function MaHomePage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* Hero */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {s.hero.title}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.subtitle}
          </p>
        </div>
      </section>

      {/* §01 Thesis */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.thesis.label} title={s.thesis.title} />
          <div className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl space-y-4">
            {s.thesis.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* §02 Triggers */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.triggers.label} title={s.triggers.title} />
          <ol className="grid grid-cols-1 gap-px bg-charcoal/15 border border-charcoal/15">
            {s.triggers.items.map((it, i) => (
              <li key={it.id} className="bg-bone p-6 md:p-8 flex flex-col md:flex-row gap-3 md:gap-8 md:items-baseline">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 md:w-12 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl md:text-2xl font-medium text-charcoal tracking-tight mb-2">
                    {it.name}
                  </h3>
                  <p className="text-sm md:text-base text-charcoal/80 leading-relaxed">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §03 Execution capabilities */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.execution.label} title={s.execution.title} />
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
            {s.execution.items.map((it, i) => (
              <li key={i} className="border border-charcoal/30 bg-white p-4 flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-charcoal/85 leading-relaxed">{it}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* §04 Outcomes */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.outcomes.label} title={s.outcomes.title} />
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
            {s.outcomes.items.map((it, i) => (
              <li key={i} className="border border-charcoal/30 bg-white p-4 flex items-start gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm md:text-base text-charcoal/85 leading-relaxed">{it}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* End-of-document CTA */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / m-and-a / end-of-document
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <Link
              href={s.cta.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
            >
              {s.cta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <p className="font-mono text-xs text-charcoal/60 italic">
              {s.cta.supportingLine}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
