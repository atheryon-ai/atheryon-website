import Link from 'next/link'

interface RelatedPillar {
  title: string
  href: string
}

interface RelatedPillarsProps {
  label: string
  pillars: RelatedPillar[]
}

export function RelatedPillars({ label, pillars }: RelatedPillarsProps) {
  return (
    <nav
      aria-label={label}
      className="px-6 py-6 border-t border-charcoal/10"
    >
      <div className="max-w-container mx-auto flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm">
        <span className="font-semibold tracking-[0.18em] uppercase text-xs text-charcoal/60">
          {label}
        </span>
        {pillars.map((p, i) => (
          <span key={p.href} className="flex items-baseline gap-4">
            {i > 0 && <span aria-hidden className="text-charcoal/30">·</span>}
            <Link
              href={p.href}
              className="text-charcoal hover:text-brand-amber underline-offset-4 hover:underline transition-colors"
            >
              {p.title}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  )
}
