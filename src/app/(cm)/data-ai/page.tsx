import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

const page = v3.pages.dataAi
const s = page.sections

// TODO(terry): {{DATA_AI_PRINCIPLE}} — the underpinning principle renders
// here once supplied (principles live with the sub pages, 2026-08-09).
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
  alternates: { canonical: 'https://atheryon.com.au/data-ai' },
}

export default function DataAiPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      {showPrinciple && (
        <DocSection>
          <div className="max-w-4xl py-4 md:py-8">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal leading-[1.12]">
              {s.principle.statement}
            </p>
          </div>
        </DocSection>
      )}

      <DocSection label={s.operatingModel.label} title={s.operatingModel.title}>
        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-px border border-charcoal/15 bg-charcoal/15">
          {([s.data, s.transformation, s.ai] as const).map((section, index) => (
            <li key={section.title} className="bg-bone p-6 md:p-8">
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55 mb-5">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
                {section.title}
              </h3>
              <p className="mt-5 text-base text-charcoal/85 leading-relaxed">
                {section.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection label={s.arms.label} title={s.arms.title}>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.arms.links.map((link) => (
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

      <DocFooter label="atheryon / data-ai / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
