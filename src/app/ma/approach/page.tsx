import type { Metadata } from 'next'
import Link from 'next/link'
import { v2Ma } from '@/content/site'

const page = v2Ma.approach
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/ma/approach' },
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

function ProseSection({ section }: { section: { label: string; title: string; body: string } }) {
  return (
    <section className="border-b border-charcoal/15">
      <div className="max-w-container mx-auto px-6 py-16 md:py-20">
        <SectionHead label={section.label} title={section.title} />
        <div className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl space-y-4">
          {section.body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function MaApproachPage() {
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

      {/* §01 Approach (prose) */}
      <ProseSection section={s.approach} />

      {/* §02 AI Data Specialist Work (prose, partners) */}
      <ProseSection section={s.dataSpecialist} />

      {/* §03 Workflow Examples (3 workflows with Input/Agents/Processing/Output cards) */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.workflowExamples.label} title={s.workflowExamples.title} />
          <p className="font-mono text-sm text-charcoal/75 leading-relaxed max-w-3xl mb-8">
            {s.workflowExamples.intro}
          </p>
          <div className="space-y-12">
            {s.workflowExamples.items.map((wf) => (
              <article key={wf.id} id={wf.id} className="scroll-mt-24">
                <header className="mb-4 flex items-baseline gap-4">
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
                    {wf.label}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight">
                    {wf.name}
                  </h3>
                </header>
                <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(
                    [
                      ['Input', wf.input],
                      ['AI agents', wf.agents],
                      ['Processing', wf.processing],
                      ['Output', wf.output],
                    ] as const
                  ).map(([stage, content]) => (
                    <li key={stage} className="border border-charcoal/30 bg-white p-4 flex flex-col h-full">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
                        {stage}
                      </div>
                      <div className="font-mono text-xs md:text-sm text-charcoal/85 leading-relaxed">
                        {content}
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* §04 Embedded Delivery (prose) */}
      <ProseSection section={s.embeddedDelivery} />

      {/* §05 Senior Specialist — Anna Contos (prose) */}
      <ProseSection section={s.seniorSpecialist} />

      {/* End-of-document CTA */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / m-and-a / approach / end-of-document
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
