export type ProofItem = { id: string; value: string; detail: string }

// Proof strip (design standard §4): figure (large) + one-line descriptor
// (small), figures lead. Document register.
const COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
}

export function ProofStrip({ items }: { items: ReadonlyArray<ProofItem> }) {
  const cols = COLS[items.length] ?? 'lg:grid-cols-4'
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 ${cols} border-y border-charcoal/15 divide-y sm:divide-y-0 divide-charcoal/15`}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="py-6 sm:py-8 sm:px-6 first:sm:pl-0 lg:border-l lg:border-charcoal/15 lg:first:border-l-0"
        >
          <div className="font-display text-3xl md:text-4xl font-medium tracking-tight text-charcoal">
            {item.value}
          </div>
          <div className="mt-2 text-sm text-charcoal/70 leading-relaxed">{item.detail}</div>
        </li>
      ))}
    </ul>
  )
}
