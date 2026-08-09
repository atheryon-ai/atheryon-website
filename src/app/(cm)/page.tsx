import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocBullets, DocFooter, DocPage, DocSection } from '@/components/Doc'
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
      <DocBanner
        label={s.hero.label}
        title={s.hero.headline}
        body={s.hero.subhead}
      />

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

        <div className="mt-12 border-l-2 border-charcoal pl-6 max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-3">
            {s.why.principleTitle}
          </div>
          <p className="font-display text-2xl md:text-3xl text-charcoal leading-snug">
            {s.why.principle}
          </p>
          <p className="mt-4 text-base text-charcoal/75 leading-relaxed">
            {s.why.principleSupport}
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

      <DocSection label={s.capabilities.label} title={s.capabilities.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-12">
          {s.capabilities.intro}
        </p>

        <div className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          <div className="py-10 md:py-12">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-3">
              Flagship practice · {s.capabilities.flagship.lead}
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight mb-4">
              <Link
                href={s.capabilities.flagship.href}
                className="border-b border-charcoal/30 hover:border-charcoal transition-colors"
              >
                {s.capabilities.flagship.name}
              </Link>
            </h3>
            <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-6">
              {s.capabilities.flagship.body}
            </p>
            <Link
              href={s.capabilities.flagship.href}
              className="inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
            >
              {s.capabilities.flagship.ctaLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {!isPending(s.capabilities.secondary.live) && (
            <div className="py-8">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-2">
                {s.capabilities.secondary.lead}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight mb-3">
                <Link
                  href={s.capabilities.secondary.href}
                  className="border-b border-charcoal/30 hover:border-charcoal transition-colors"
                >
                  {s.capabilities.secondary.name}
                </Link>
              </h3>
              <p className="max-w-3xl text-base text-charcoal/85 leading-relaxed">
                {s.capabilities.secondary.body}
              </p>
            </div>
          )}
        </div>
      </DocSection>

      <DocFooter label="atheryon / overview / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
