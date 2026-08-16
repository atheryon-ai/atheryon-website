import type { Metadata } from 'next'
import Link from 'next/link'
import { ArmSubNav } from '@/components/ArmSubNav'
import { ServiceLineIndex } from '@/components/ServiceLineIndex'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

// Function 2 (functions-and-sectors spec §4; MECE cut 2026-08-15). Banner,
// principle, markets depth boxes, then three related links — Labs, M&A
// line-04, supply chain. No discipline grid, no third "where it shows up" index.
const page = v3.pages.dataAi
const s = page.sections

const showPrinciple = !isPending(s.principle.statement)

// Labs note from platform depth; M&A + supply chain from the retired arms list.
// Do not invent link copy here.
const relatedLinks = [
  s.depth.links.find((link) => link.href === '/labs'),
  ...s.arms.links,
].filter((link): link is (typeof s.arms.links)[number] => Boolean(link))

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/data-ai' },
}

export default function DataAiPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />
      <ArmSubNav base="/data-ai" active="overview" />

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
        {s.lines.intro ? (
          <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
            {s.lines.intro}
          </p>
        ) : null}
        <ServiceLineIndex
          items={s.lines.items.map((line) => ({
            id: line.id,
            label: line.name,
            note: line.tagline,
            items: line.items,
          }))}
        />
      </DocSection>

      <DocSection label={s.engagements.label} title={s.engagements.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.engagements.items.map((item) => (
            <li key={item.id} className="py-6">
              {'figure' in item && item.figure && (
                <div className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal">
                  {item.figure}
                </div>
              )}
              <h3 className="mt-2 font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {item.name}
              </h3>
              <p className="mt-2 max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
                {item.summary}
              </p>
            </li>
          ))}
        </ol>
        <Link
          href={s.engagements.href}
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm font-medium text-charcoal underline-offset-4 hover:underline"
        >
          {s.engagements.ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </DocSection>

      <DocSection>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {relatedLinks.map((link) => (
            <li key={link.href} className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-6 py-5">
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

      <DocFooter label="atheryon / data-ai / end-of-document" />
    </DocPage>
  )
}
