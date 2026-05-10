import Link from 'next/link'

interface PillarItem {
  number: string
  title: string
  body: string
  href: string
}

interface PillarGridProps {
  items: PillarItem[]
  anchor?: string
}

export function PillarGrid({ items, anchor }: PillarGridProps) {
  return (
    <div id={anchor} className="grid md:grid-cols-3 gap-6">
      {items.map((item) => (
        <article
          key={item.number}
          data-testid="reality-pillar-card"
          className="p-8 bg-white border border-charcoal/10 rounded-2xl"
        >
          <div className="text-sm font-mono text-amber mb-4" style={{ color: '#D98B3E' }}>{item.number}</div>
          <h3 className="font-display text-3xl text-charcoal tracking-tight mb-4">{item.title}</h3>
          <p className="text-charcoal/80 leading-relaxed mb-6">{item.body}</p>
          <Link href={item.href} className="inline-block py-2.5 text-sm font-semibold text-charcoal underline-offset-4 hover:underline">
            Explore {item.title} →
          </Link>
        </article>
      ))}
    </div>
  )
}
