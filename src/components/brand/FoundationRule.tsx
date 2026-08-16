// Foundation rule (design standard §4): 1.5px bronze at 60% opacity, full
// content width, small-caps strip beneath. Encodes "arms above,
// underpinning below". One per page maximum — it belongs to the homepage
// statement band and the poster.
export function FoundationRule({ items }: { items: ReadonlyArray<string> }) {
  return (
    <div className="mt-10 md:mt-12 border-t-[1.5px] border-bronze/60 pt-7">
      {/* Case comes from the items. Do not CSS-uppercase: NBFIs must keep
          a lowercase plural s (Terry 2026-08-15). */}
      <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-bronze">
        {items.join(' · ')}
      </span>
    </div>
  )
}
