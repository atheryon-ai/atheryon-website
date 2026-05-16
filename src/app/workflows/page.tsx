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

function StageIcon({ stage }: { stage: string }) {
  const stroke = '#60a5fa'
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (stage) {
    case 'Input':
      return (
        <svg {...common}>
          <circle cx="11" cy="8" r="4" />
          <path d="M2 8 L7 8" />
          <path d="M5 5 L7 8 L5 11" />
        </svg>
      )
    case 'AI agents':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2" />
          <circle cx="3" cy="3" r="1.4" />
          <circle cx="13" cy="3" r="1.4" />
          <circle cx="3" cy="13" r="1.4" />
          <circle cx="13" cy="13" r="1.4" />
          <path d="M4 4 L7 7 M12 4 L9 7 M4 12 L7 9 M12 12 L9 9" />
        </svg>
      )
    case 'Processing':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="3.5" />
          <path d="M8 1.5 L8 3.5 M8 12.5 L8 14.5 M1.5 8 L3.5 8 M12.5 8 L14.5 8" />
        </svg>
      )
    case 'Output':
      return (
        <svg {...common}>
          <circle cx="5" cy="8" r="4" />
          <path d="M9 8 L14 8" />
          <path d="M12 5 L14 8 L12 11" />
        </svg>
      )
    default:
      return null
  }
}

function StageCell({ stage, content, isLastInRow }: { stage: string; content: string; isLastInRow: boolean }) {
  const pending = isPending(content)
  return (
    <div
      className={`border border-charcoal/30 bg-white p-4 flex flex-col h-full ${isLastInRow ? '' : 'md:border-r-2 md:border-r-[rgba(96,165,250,0.32)]'}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <StageIcon stage={stage} />
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
          {stage}
        </div>
      </div>
      {!pending && (
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

          {/* Desktop (md+): inline SVG pipeline */}
          <div className="hidden md:block mb-6">
            <svg
              role="img"
              aria-labelledby="pipeline-title"
              viewBox="0 0 760 140"
              className="w-full h-auto block"
              style={{ fontFamily: "'Inter Tight', system-ui, sans-serif" }}
            >
              <title id="pipeline-title">
                Atheryon pipeline schema — Input then AI agents then Processing then Output
              </title>
              <defs>
                <marker id="pipeArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
                </marker>
                <linearGradient id="pipeBoxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(96,165,250,0.10)" />
                  <stop offset="100%" stopColor="rgba(96,165,250,0.02)" />
                </linearGradient>
              </defs>

              {s.schema.stages.map((stage, i) => {
                const x = 10 + i * 185
                return (
                  <g key={stage}>
                    <rect x={x} y={30} width={160} height={80} rx={6} fill="url(#pipeBoxGrad)" stroke="#3b82f6" strokeWidth={1.4} />
                    <text x={x + 80} y={75} textAnchor="middle" fill="#ffffff" fontSize={13} fontWeight={600} letterSpacing={2}>
                      {stage.toUpperCase()}
                    </text>
                    {i < s.schema.stages.length - 1 && (
                      <line
                        x1={x + 162}
                        y1={70}
                        x2={x + 183}
                        y2={70}
                        stroke="#60a5fa"
                        strokeWidth={1.4}
                        markerEnd="url(#pipeArrow)"
                      />
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Mobile fallback (< md): vertical OL */}
          <ol className="md:hidden grid grid-cols-1 gap-3 items-stretch mb-6">
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
                    ↓
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
                  <StageCell
                    stage={s.schema.stages[i]}
                    content={wf[key]}
                    isLastInRow={i === stageKeys.length - 1}
                  />
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
