import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'
import { v2 } from '@/content/site'

const page = v2.pages.workflows
const s = page.sections

const isPending = (value: string) => value.startsWith('{{')

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: { card: 'summary_large_image', title: page.title, description: page.description },
  alternates: { canonical: 'https://atheryon.com.au/workflows' },
}

// ─────────────────────────────────────────────────────────────────────────────
// /workflows — Deterministic and structured. No marketing language.
// Every workflow follows: Input → AI agents → Processing → Output.
// Stage cells render verbatim content or a visible {{PENDING_*}} token; never
// invented prose.
// ─────────────────────────────────────────────────────────────────────────────

function StageCell({ stage, content }: { stage: string; content: string }) {
  const pending = isPending(content)
  return (
    <div className="border border-charcoal/30 bg-white p-4 flex flex-col h-full">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-3">
        {stage}
      </div>
      {pending ? (
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal/40 break-words">
          {content}
        </div>
      ) : (
        <div className="font-mono text-xs md:text-sm text-charcoal/85 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  )
}

export default function WorkflowsPage() {
  const stageKeys = ['input', 'agents', 'processing', 'output'] as const

  return (
    <div className="bg-bone min-h-screen">
      {/* Header banner */}
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
        </div>
      </section>

      {/* §00 Pipeline schema — the deterministic shape every workflow follows */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              {s.schema.label}
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
              {s.schema.title}
            </h2>
          </header>

          <ol className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 lg:gap-2 items-stretch mb-6">
            {s.schema.stages.map((stage, i) => (
              <Fragment key={stage}>
                <li className="border border-charcoal/30 bg-white p-4 flex items-center justify-center">
                  <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal text-center">
                    {stage}
                  </div>
                </li>
                {i < s.schema.stages.length - 1 && (
                  <li
                    aria-hidden="true"
                    className="flex items-center justify-center text-charcoal/40 font-mono text-xl"
                  >
                    <span className="lg:hidden">↓</span>
                    <span className="hidden lg:inline">→</span>
                  </li>
                )}
              </Fragment>
            ))}
          </ol>

          <p className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/60">
            {s.schema.note}
          </p>
        </div>
      </section>

      {/* §01–§05 Workflows */}
      {s.items.map((wf) => (
        <section key={wf.id} id={wf.id} className="border-b border-charcoal/15 scroll-mt-24">
          <div className="max-w-container mx-auto px-6 py-16 md:py-20">
            <header className="mb-8 pb-4 border-b border-charcoal/15 flex items-baseline gap-4">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60">
                {wf.label}
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight">
                {wf.name}
              </h2>
            </header>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {stageKeys.map((key, i) => (
                <li key={key} className="flex flex-col h-full">
                  <StageCell stage={s.schema.stages[i]} content={wf[key]} />
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      {/* End-of-document action */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / workflows / end-of-document
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
