import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'
import { v2 } from '@/content/site'

const page = v2.pages.system
const s = page.sections

const isPending = (value: string) => value.startsWith('{{')

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/system' },
}

// ─────────────────────────────────────────────────────────────────────────────
// /system — Technical document, not a marketing page.
// No marketing language. No storytelling tone. Architecture-interface aesthetic:
// off-white bone background, charcoal text, hairline borders, monospace section
// labels, no gradients, no brand-orange.
// ─────────────────────────────────────────────────────────────────────────────

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

function PendingNote({ token }: { token: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/45">
      {token}
    </p>
  )
}

export default function SystemPage() {
  return (
    <div className="bg-bone min-h-screen">
      {/* §00 SystemHero — technical document banner */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            {s.hero.label}
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            {s.hero.title}
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {s.hero.body}
          </p>
          <p className="mt-4 text-base md:text-lg text-charcoal/70 max-w-3xl leading-relaxed">
            {v2.identity}
          </p>
        </div>
      </section>

      {/* §01 ArchitectureDiagram — 5-stage data/control flow */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.architectureDiagram.label} title={s.architectureDiagram.title} />

          {/* Desktop: horizontal flow. Mobile: vertical stack. */}
          <ol className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 lg:gap-2 items-stretch">
            {s.architectureDiagram.stages.map((stage, i) => (
              <Fragment key={stage.id}>
                <li className="border border-charcoal/30 bg-white p-5 flex flex-col">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/50 mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-display text-lg md:text-xl font-medium text-charcoal leading-snug">
                    {stage.name}
                  </div>
                  {stage.detail && (
                    <div className="mt-2 font-mono text-xs text-charcoal/70 leading-relaxed">
                      {stage.detail}
                    </div>
                  )}
                </li>
                {i < s.architectureDiagram.stages.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="flex items-center justify-center text-charcoal/40 font-mono text-2xl py-1 lg:py-0"
                  >
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </li>
                )}
              </Fragment>
            ))}
          </ol>
        </div>
      </section>

      {/* §02 DataFlowLayer */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.dataFlowLayer.label} title={s.dataFlowLayer.title} />
          {isPending(s.dataFlowLayer.body) ? (
            <PendingNote token={s.dataFlowLayer.body} />
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl">
              {s.dataFlowLayer.body}
            </p>
          )}
        </div>
      </section>

      {/* §03 AIAgentLayer */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.aiAgentLayer.label} title={s.aiAgentLayer.title} />
          {isPending(s.aiAgentLayer.body) ? (
            <PendingNote token={s.aiAgentLayer.body} />
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl">
              {s.aiAgentLayer.body}
            </p>
          )}
        </div>
      </section>

      {/* §04 WorkflowExamples */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.workflowExamples.label} title={s.workflowExamples.title} />
          <ul className="divide-y divide-charcoal/15 border-t border-charcoal/15">
            {s.workflowExamples.items.map((item, i) => (
              <li
                key={item}
                className="grid grid-cols-[auto_1fr] gap-4 items-baseline py-4"
              >
                <span className="font-mono text-xs text-charcoal/50 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-base md:text-lg text-charcoal">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §05 DeploymentModel */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.deploymentModel.label} title={s.deploymentModel.title} />
          {isPending(s.deploymentModel.body) ? (
            <PendingNote token={s.deploymentModel.body} />
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl">
              {s.deploymentModel.body}
            </p>
          )}
        </div>
      </section>

      {/* §06 ProofArtifacts */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.proofArtifacts.label} title={s.proofArtifacts.title} />
          <p className="font-mono text-sm text-charcoal/70 mb-6 max-w-3xl">
            {s.proofArtifacts.directive}
          </p>
          {isPending(s.proofArtifacts.body) ? (
            <PendingNote token={s.proofArtifacts.body} />
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl">
              {s.proofArtifacts.body}
            </p>
          )}
        </div>
      </section>

      {/* Footer — minimal contact action, no marketing CTA */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / system / end-of-document
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            {v2.cta.label}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
