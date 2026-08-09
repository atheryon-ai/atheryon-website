import type { Metadata } from 'next'
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

      <DocSection label={s.lines.label} title={s.lines.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.lines.items.map((line) => (
            <li key={line.id} id={line.id} className="py-10 md:py-12 scroll-mt-24">
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 mb-3">
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
                    <li key={item} className="py-3 font-mono text-sm text-charcoal">
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

              {/* Rev 7: the three transaction workflows relocated from
                  /capital-markets — collapsed secondary detail under line 04. */}
              {line.id === 'technology-data-migration' && (
                <details className="mt-8">
                  <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 hover:text-charcoal transition-colors">
                    {s.workflows.summary}
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
              )}
            </li>
          ))}
        </ol>
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

      <DocFooter label="atheryon / ma / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
