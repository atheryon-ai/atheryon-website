import type { Metadata } from 'next'
import Link from 'next/link'
import { ArmSubNav } from '@/components/ArmSubNav'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

const page = v3.pages.capitalMarkets
const s = page.sections

const showPrinciple = !isPending(s.principle.statement)

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/capital-markets' },
}

export default function CapitalMarketsPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />
      <ArmSubNav base="/capital-markets" />

      {showPrinciple && (
        <DocSection>
          <div className="max-w-4xl py-4 md:py-8">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal leading-[1.12]">
              {s.principle.statement}
            </p>
          </div>
        </DocSection>
      )}

      <DocSection label={s.lines.label} title={s.lines.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.lines.items.map((line) => (
            <li key={line.id} id={line.id} className="py-10 md:py-12 scroll-mt-24">
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55 mb-3">
                {line.index}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight mb-3">
                {line.name}
              </h3>
              <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
                {line.tagline}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15">
                  {line.items.map((item) => (
                    <li key={item} className="py-3 text-sm md:text-base text-charcoal/85">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="space-y-6 text-base text-charcoal/85 leading-relaxed">
                  {line.body.split('\n\n').map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link
            href={s.lines.crossLink.href}
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
          >
            {s.lines.crossLink.text}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </DocSection>

      <DocSection label={s.depth.label} title={s.depth.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {s.depth.intro}
        </p>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.depth.links.map((link) => (
            <li key={link.href} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-2 sm:gap-6 py-5">
              <Link
                href={link.href}
                className="font-display text-lg md:text-xl font-medium text-charcoal border-b border-charcoal/30 hover:border-charcoal transition-colors w-fit"
              >
                {link.label}
              </Link>
              <p className="text-base text-charcoal/75 leading-relaxed">{link.note}</p>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocFooter label="atheryon / capital markets / end-of-document" cta={{ ...v3.cmCta }} />
    </DocPage>
  )
}
