import type { Metadata } from 'next'
import Link from 'next/link'
import { ArmSubNav } from '@/components/ArmSubNav'
import { ServiceLineIndex } from '@/components/ServiceLineIndex'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

const page = v3.pages.ma
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
  alternates: { canonical: 'https://atheryon.com.au/ma' },
}

export default function MaArmPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />
      <ArmSubNav base="/ma" active="overview" />

      {/* The arm's principle (Terry 2026-08-09: principles live with the
          sub pages). Unlabelled section — no § number, a statement moment. */}
      <DocSection>
        <div className="max-w-4xl py-4 md:py-8">
          <p className="text-base text-charcoal/75 mb-6">{s.principle.framing}</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-charcoal leading-[1.12]">
            {s.principle.statement}
          </p>
          {s.principle.support && (
            <p className="mt-8 text-base md:text-lg text-charcoal/75 leading-relaxed max-w-3xl">
              {s.principle.support}
            </p>
          )}
        </div>
      </DocSection>

      {/* Why / values / belief cut 2026-08-15 (MECE): they restated the
          principle and the four boxes. Landing is offer then engage. */}

      <DocSection label={s.lines.label} title={s.lines.title}>
        <ServiceLineIndex
          items={s.lines.items.map((line) => ({
            id: line.id,
            label: line.name,
            note: line.tagline,
            items: line.items,
          }))}
        />
        <details className="workflow-details mt-10 border-y border-charcoal/15">
          <summary className="cursor-pointer min-h-14 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/70 hover:text-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze">
            <span>
              {s.workflows.summary}
              <span className="block mt-1 font-sans text-sm normal-case tracking-normal text-charcoal/70">
                {s.workflows.subline}
              </span>
            </span>
            <span className="details-indicator text-xl" aria-hidden="true" />
          </summary>
          <div className="pt-6">
            <p className="max-w-3xl text-base text-charcoal/85 leading-relaxed mb-8">
              {s.workflows.intro}
            </p>
            <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
              {s.workflows.items.map((workflow) => (
                <li key={workflow.id} id={workflow.id} className="py-8 scroll-mt-24">
                  <h4 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight mb-6">
                    {workflow.name}
                  </h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(
                      [
                        ['Input', workflow.input],
                        ['AI agents', workflow.agents],
                        ['Processing', workflow.processing],
                        ['Output', workflow.output],
                      ] as const
                    ).map(([label, body]) => (
                      <div key={label}>
                        <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/60 mb-2">
                          {label}
                        </dt>
                        <dd className="text-sm text-charcoal/85 leading-relaxed">{body}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ol>
          </div>
        </details>
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

      {!isPending(s.engagement.body) && (
        <DocSection label={s.engagement.label} title={s.engagement.title}>
          <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
            {s.engagement.body.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </DocSection>
      )}

      <DocFooter label="atheryon / ma / end-of-document" />
    </DocPage>
  )
}
