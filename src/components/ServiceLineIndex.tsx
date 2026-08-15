type ServiceLineIndexItem = {
  id: string
  label: string
  note: string
  items?: ReadonlyArray<string>
}

/** Four-up register of service lines. When `items` is present the box
 *  carries the full line; it is not a jump link to a later section. */
export function ServiceLineIndex({ items }: { items: ReadonlyArray<ServiceLineIndexItem> }) {
  return (
    <ol
      aria-label="Service lines"
      className="grid grid-cols-1 md:grid-cols-2 gap-px border border-charcoal/15 bg-charcoal/15"
    >
      {items.map((item, index) => (
        <li key={item.id} id={item.id} className="bg-bone p-5 md:p-6 scroll-mt-24">
          <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55 mb-3">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="font-display text-xl md:text-2xl font-medium leading-tight text-charcoal">
            {item.label}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{item.note}</p>
          {item.items && item.items.length > 0 && (
            <ul className="mt-5 space-y-2">
              {item.items.map((entry) => (
                <li key={entry} className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-charcoal/60 mt-2" />
                  <span className="text-sm text-charcoal/85 leading-relaxed">{entry}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}
