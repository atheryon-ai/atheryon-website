import type { Metadata } from 'next'
import Link from 'next/link'
import { ArmSubNav } from '@/components/ArmSubNav'
import { ServiceLineIndex } from '@/components/ServiceLineIndex'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

// Function 2 (functions-and-sectors spec §4). This page absorbed the retired
// /capital-markets arm: the markets service lines and platform depth below
// came from there. Display order is the spec's: banner, principle, three
// disciplines, markets depth, platform depth, where else it shows up.
const page = v3.pages.dataAi
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

      <DocSection label={s.lines.label} title={s.lines.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
          {s.lines.intro}
        </p>
        <ServiceLineIndex
          items={s.lines.items.map((line) => ({
            id: line.id,
            label: line.name,
            note: line.tagline,
          }))}
        />
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

      <DocFooter label="atheryon / data-ai / end-of-document" cta={{ ...v3.cmCta }} />
    </DocPage>
  )
}
