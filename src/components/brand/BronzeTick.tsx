// Bronze tick (design standard §4): 40×2px rule above a label. Marks an
// arm or a column head.
export function BronzeTick() {
  return <div aria-hidden="true" className="mb-4 h-0.5 w-10 bg-bronze" />
}
