import Link from 'next/link'

interface PillarHeroProps {
  eyebrow: string
  title: string
  definition: string
  positioning: string
  breadcrumbHref: string
  breadcrumbLabel: string
  isDataPillar?: boolean
}

export function PillarHero({
  eyebrow,
  title,
  definition,
  positioning,
  breadcrumbHref,
  breadcrumbLabel,
  isDataPillar = false,
}: PillarHeroProps) {
  const accentClass = isDataPillar ? 'text-brand-deepblue' : 'text-brand-amber'
  return (
    <section className="px-6 pt-24 md:pt-32 pb-16 md:pb-20 bg-bone">
      <div className="max-w-container mx-auto">
        <Link href={breadcrumbHref} className="inline-block text-sm text-charcoal/70 mb-8 hover:text-charcoal">
          {breadcrumbLabel}
        </Link>
        <div className={`text-xs font-semibold tracking-[0.18em] uppercase mb-5 ${accentClass}`}>
          {eyebrow}
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-display-lg text-charcoal tracking-tight leading-[1.05] mb-6">
          {title}
        </h1>
        <p className="text-lg md:text-subheading text-charcoal/80 max-w-2xl mb-4 leading-relaxed">
          {definition}
        </p>
        <p className="text-base md:text-lg text-charcoal/70 max-w-2xl leading-relaxed">
          {positioning}
        </p>
      </div>
    </section>
  )
}
