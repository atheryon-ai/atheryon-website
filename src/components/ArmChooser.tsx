import Link from 'next/link'

export type ArmChooserItem = {
  label: string
  href: string
  note: string
}

/** Compact two-arm decision surface used by the neutral firm routes. */
export function ArmChooser({ items }: { items: ReadonlyArray<ArmChooserItem> }) {
  return (
    <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
      {items.map((item, index) => {
        const labelId = `arm-chooser-label-${index}`
        const noteId = `arm-chooser-note-${index}`
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-labelledby={labelId}
              aria-describedby={noteId}
              className="group grid grid-cols-1 sm:grid-cols-[18rem_1fr_auto] gap-2 sm:gap-6 py-7 md:py-8 transition-colors hover:bg-white/[0.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              <span
                id={labelId}
                className="font-display text-xl md:text-2xl font-medium text-charcoal underline decoration-charcoal/30 underline-offset-[0.45rem] group-hover:decoration-charcoal transition-colors w-fit"
              >
                {item.label}
              </span>
              <span id={noteId} className="text-base text-charcoal/75 leading-relaxed">
                {item.note}
              </span>
              <span
                aria-hidden="true"
                className="hidden sm:inline text-charcoal/60 group-hover:text-charcoal transition-colors"
              >
                →
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
