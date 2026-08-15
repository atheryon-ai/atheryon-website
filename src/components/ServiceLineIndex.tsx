import Link from 'next/link'

type ServiceLineIndexItem = {
  id: string
  label: string
  note: string
}

/** In-page register for long arm pages; destinations remain ordinary anchors. */
export function ServiceLineIndex({ items }: { items: ReadonlyArray<ServiceLineIndexItem> }) {
  return (
    <nav aria-label="Service line index" className="mb-12">
      <ol className="grid grid-cols-1 md:grid-cols-2 gap-px border border-charcoal/15 bg-charcoal/15">
        {items.map((item, index) => (
          <li key={item.id} className="bg-bone">
            <Link
              href={`#${item.id}`}
              className="group grid grid-cols-[2.5rem_1fr_auto] gap-3 min-h-28 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-bronze"
            >
              <span className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55 pt-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="block font-display text-xl md:text-2xl font-medium leading-tight text-charcoal">
                  {item.label}
                </span>
                <span className="block mt-2 text-sm leading-relaxed text-charcoal/70">
                  {item.note}
                </span>
              </span>
              <span aria-hidden="true" className="text-charcoal/55 group-hover:text-charcoal transition-colors">
                ↓
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
