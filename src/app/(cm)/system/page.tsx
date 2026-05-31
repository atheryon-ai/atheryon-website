import type { Metadata } from 'next'
import Link from 'next/link'
import { v2 } from '@/content/site'
import { SystemArchitectureDiagram } from '@/components'

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

      {/* §01 ArchitectureDiagram — two-class agent system */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.architectureDiagram.label} title={s.architectureDiagram.title} />
          <SystemArchitectureDiagram data={s.architectureDiagram} />
        </div>
      </section>

      {/* §02 DataFlowLayer */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.dataFlowLayer.label} title={s.dataFlowLayer.title} />
          {!isPending(s.dataFlowLayer.body) && (
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
          {!isPending(s.aiAgentLayer.body) && (
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
                key={item.id}
                className="grid grid-cols-[auto_1fr] gap-4 md:gap-6 items-baseline py-6"
              >
                <span className="font-mono text-xs text-charcoal/50 tabular-nums pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <Link
                    href={item.href}
                    className="font-mono text-base md:text-lg text-charcoal underline-offset-4 hover:underline block mb-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm md:text-base text-charcoal/85 leading-relaxed max-w-3xl">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* §05 DeploymentModel */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <SectionHead label={s.deploymentModel.label} title={s.deploymentModel.title} />
          {!isPending(s.deploymentModel.body) && (
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
          {!isPending(s.proofArtifacts.body) && (
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
