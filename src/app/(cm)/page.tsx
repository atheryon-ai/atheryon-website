import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBullets, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

const page = v3.pages.home
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
      {/* Root hero stack (rev 5, Appendix B verbatim): hero / subheading /
          supporting copy. Subheading fragments are display type only. */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6 max-w-5xl">
            {s.hero.headline}
          </h1>
          <p className="font-display text-xl md:text-2xl text-charcoal/90 leading-snug mb-6 max-w-3xl">
            {s.hero.subheading}
          </p>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.supporting}
          </p>
        </div>
      </section>

      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-10 md:py-14">
          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href={s.hero.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
            >
              {s.hero.primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={s.hero.secondaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium text-charcoal border border-charcoal/40 hover:border-charcoal transition-colors"
            >
              {s.hero.secondaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-charcoal/15 divide-y sm:divide-y-0 divide-charcoal/15">
            {s.proof.items.map((item) => (
              <li key={item.id} className="py-6 sm:py-8 sm:px-6 first:sm:pl-0 lg:border-l lg:border-charcoal/15 lg:first:border-l-0">
                <div className="font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal">
                  {item.value}
                </div>
                <div className="mt-2 text-sm text-charcoal/70 leading-relaxed">
                  {item.detail}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DocSection label={s.why.label} title={s.why.title}>
        <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.why.body.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 max-w-3xl">
          <p className="text-base md:text-lg text-charcoal/85 mb-4">{s.why.helpIntro}</p>
          <DocBullets items={[...s.why.helpItems]} />
        </div>
      </DocSection>

      {/* The core IP statement: once site-wide, large type, founding framing. */}
      <DocSection label={s.principle.label}>
        <div className="max-w-4xl py-4 md:py-8">
          <p className="font-mono text-sm text-charcoal/70 mb-6">{s.principle.framing}</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal leading-[1.12]">
            {s.principle.statement}
          </p>
          <p className="mt-8 text-base md:text-lg text-charcoal/75 leading-relaxed max-w-3xl">
            {s.principle.support}
          </p>
        </div>
      </DocSection>

      <DocSection label={s.values.label} title={s.values.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.values.items.map((value, i) => (
            <li
              key={value.id}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[4rem_minmax(14rem,0.6fr)_minmax(0,1.4fr)] gap-x-5 md:gap-x-8 gap-y-2 py-6"
            >
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 pt-1">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {value.name}
              </h3>
              <p className="col-start-2 md:col-start-3 text-base text-charcoal/85 leading-relaxed max-w-3xl">
                {value.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      {/* Arms: equal cards, M&A first. Underpinning strip beneath. */}
      <DocSection label={s.arms.label} title={s.arms.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-12">
          {s.arms.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal/15 border border-charcoal/15">
          {s.arms.items
            .filter((arm) => !isPending(arm.live))
            .map((arm) => (
              <div key={arm.id} className="bg-bone p-8 md:p-10">
                <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-3">
                  {arm.lead}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight mb-4">
                  <Link
                    href={arm.href}
                    className="border-b border-charcoal/30 hover:border-charcoal transition-colors"
                  >
                    {arm.name}
                  </Link>
                </h3>
                <p className="text-base text-charcoal/85 leading-relaxed mb-6">{arm.body}</p>
                <Link
                  href={arm.href}
                  className="inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
                >
                  {arm.ctaLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
        </div>

        <div className="mt-8 border-t border-charcoal/15 pt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/55">
            {s.arms.underpinning.intro}
          </span>
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.28em] text-bronze">
            {s.arms.underpinning.items.join(' · ')}
          </span>
        </div>
      </DocSection>

      <DocSection label={s.founders.label} title={s.founders.title}>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.founders.items.map((founder) => (
            <li
              key={founder.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(12rem,0.4fr)_minmax(0,1.6fr)] gap-2 md:gap-8 py-6"
            >
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {founder.name}
              </h3>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed">{founder.line}</p>
            </li>
          ))}
        </ul>
        <Link
          href={s.founders.href}
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
        >
          {s.founders.ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </DocSection>

      <DocFooter label="atheryon / overview / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
