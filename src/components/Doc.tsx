import Link from 'next/link'
import { ReactNode } from 'react'
import { v2 } from '@/content/site'

// ─────────────────────────────────────────────────────────────────────────────
// Doc — shared building blocks for v2 architectural-document pages.
// Aesthetic: bone bg, charcoal hairlines, monospace section labels, Fraunces
// titles. No marketing chrome (no orange, no gradients, no shadows).
// Used by every page in the v2 IA + the preserved /labs, /programs, legal
// surfaces brought into the same visual language.
// ─────────────────────────────────────────────────────────────────────────────

export function DocPage({ children }: { children: ReactNode }) {
  return <div className="bg-bone min-h-screen">{children}</div>
}

interface DocBannerProps {
  label: string
  title: string
  body?: string
}

export function DocBanner({ label, title, body }: DocBannerProps) {
  return (
    <section className="border-b border-charcoal/15">
      <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
          {label}
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6 max-w-5xl">
          {title}
        </h1>
        {body && (
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            {body}
          </p>
        )}
      </div>
    </section>
  )
}

interface DocSectionProps {
  label?: string
  title?: string
  id?: string
  children: ReactNode
}

export function DocSection({ label, title, id, children }: DocSectionProps) {
  return (
    <section id={id} className="border-b border-charcoal/15 scroll-mt-24">
      <div className="max-w-container mx-auto px-6 py-16 md:py-20">
        {(label || title) && (
          <header className="mb-8 pb-4 border-b border-charcoal/15">
            {label && (
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
                {label}
              </div>
            )}
            {title && (
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal leading-tight">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

interface DocFooterProps {
  label: string
  cta?: { label: string; href: string }
}

export function DocFooter({ label, cta }: DocFooterProps) {
  const action = cta ?? { label: v2.cta.label, href: v2.cta.href }
  return (
    <section>
      <div className="max-w-container mx-auto px-6 py-16 md:py-20 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60">
          {label}
        </div>
        <Link
          href={action.href}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
        >
          {action.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export function DocPending({ token }: { token: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.12em] text-charcoal/45">
      {token}
    </p>
  )
}

// Architectural list item — numbered, hairline-divided. For workflow names,
// institutional rosters, plain item lists.
export function DocList({ items }: { items: ReadonlyArray<string> }) {
  return (
    <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15">
      {items.map((item, i) => (
        <li key={item} className="grid grid-cols-[auto_1fr] gap-4 items-baseline py-4">
          <span className="font-mono text-xs text-charcoal/50 tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-base text-charcoal">{item}</span>
        </li>
      ))}
    </ul>
  )
}

// Bullet list with charcoal markers — for body prose lists.
export function DocBullets({ items }: { items: ReadonlyArray<ReactNode> }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span aria-hidden="true" className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-charcoal/60 mt-2.5" />
          <span className="text-base text-charcoal/85 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
