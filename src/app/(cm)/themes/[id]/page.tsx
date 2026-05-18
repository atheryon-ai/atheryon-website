import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buyerThemes, getBuyerTheme } from '@/content/buyerThemes'
import { StatusBadge } from '@/components/StatusBadge'
import { v2 } from '@/content/site'

type Params = { id: string }

export function generateStaticParams(): Params[] {
  return buyerThemes.map((t) => ({ id: t.id }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params
  const theme = getBuyerTheme(id)
  if (!theme) return { title: 'Theme not found' }
  const title = `${theme.name} — Atheryon`
  const description = theme.pain
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `https://atheryon.com.au/themes/${theme.id}` },
  }
}

export default async function ThemePage({ params }: { params: Promise<Params> }) {
  const { id } = await params
  const theme = getBuyerTheme(id)
  if (!theme) notFound()

  const workflow = theme.workflowId
    ? v2.pages.workflows.sections.items.find((w) => w.id === theme.workflowId)
    : null

  return (
    <div className="bg-bone min-h-screen">
      {/* Header */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / themes / {theme.id}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02]">
              {theme.name}
            </h1>
            <StatusBadge status={theme.status} />
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/55 mb-6">
            {theme.buyerTitles.join(' · ')}
          </p>
          <p className="text-base md:text-lg text-charcoal/80 max-w-3xl leading-relaxed mb-4">
            {theme.pain}
          </p>
          <p className="font-mono text-sm md:text-base text-charcoal/85 max-w-3xl leading-relaxed">
            {theme.speedPitch}
          </p>
        </div>
      </section>

      {/* Workflow embed */}
      <section id="workflow" className="border-b border-charcoal/15 scroll-mt-24">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              §01 / Workflow
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
              {workflow ? workflow.name : 'ROADMAP — workflow planned'}
            </h2>
          </header>
          {workflow ? (
            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {(
                [
                  ['Input', workflow.input],
                  ['AI agents', workflow.agents],
                  ['Processing', workflow.processing],
                  ['Output', workflow.output],
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
          ) : (
            <p className="text-base md:text-lg text-charcoal/80 max-w-3xl leading-relaxed">
              ROADMAP — workflow for {theme.name} is planned. The speed promise above is what we will ship. Talk to us if you want to co-build it.
            </p>
          )}
        </div>
      </section>

      {/* Offers framed for this buyer */}
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
              §02 / Offers for this theme
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
              Three ways to engage
            </h2>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
            {(
              [
                { key: 'code', title: 'Buy the code', href: '/offers/code' },
                { key: 'prompts', title: 'License the prompts', href: '/offers/prompts' },
                { key: 'consult', title: 'Consult', href: '/offers/consult' },
              ] as const
            ).map((o) => (
              <li key={o.key} className="bg-bone p-6 flex flex-col">
                <Link
                  href={o.href}
                  className="font-display text-2xl font-medium text-charcoal tracking-tight underline-offset-4 hover:underline mb-3"
                >
                  {o.title}
                </Link>
                <p className="text-sm text-charcoal/80 leading-relaxed">
                  {theme.offerFramings[o.key]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
            atheryon / themes / {theme.id} / end-of-document
          </div>
          <Link
            href={`/contact?topic=${theme.id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
          >
            Book system assessment
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
