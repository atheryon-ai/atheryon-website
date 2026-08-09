import Link from 'next/link'
import { BronzeTick } from './BronzeTick'
import { FoundationRule } from './FoundationRule'

type Arm = { id: string; label: string; href: string }

type Props = {
  lines: ReadonlyArray<string>
  subheading: string
  arms: ReadonlyArray<Arm>
  underpinning: ReadonlyArray<string>
  cta: { label: string; href: string }
}

// Statement band (design standard §1): the poster register. Deep navy
// surface, serif claim, arms with bronze ticks over the foundation rule,
// one primary CTA. Full-band use is reserved for homepage viewport 1 — the
// design lint fails the build if this component is rendered more than once.
export function StatementBand({ lines, subheading, arms, underpinning, cta }: Props) {
  return (
    <section className="bg-navy">
      <div className="max-w-container mx-auto px-6 pt-20 md:pt-28 pb-14 md:pb-20">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.06] max-w-5xl text-warm-white">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-8 font-display text-xl md:text-2xl leading-snug max-w-3xl text-warm-white/90">
          {subheading}
        </p>

        <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 max-w-2xl">
          {arms.map((arm) => (
            <div key={arm.id}>
              <BronzeTick />
              <Link
                href={arm.href}
                className="font-sans font-semibold text-base md:text-lg tracking-[0.14em] underline-offset-8 hover:underline text-warm-white"
              >
                {arm.label}
              </Link>
            </div>
          ))}
        </div>

        <FoundationRule items={underpinning} />

        <Link
          href={cta.href}
          className="mt-12 md:mt-14 inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium uppercase tracking-[0.10em] transition-colors hover:bg-white/10 text-warm-white border border-bronze"
        >
          {cta.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
