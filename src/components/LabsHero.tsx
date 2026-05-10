import Link from 'next/link'

interface LabsHeroProps {
  headlineLine1: string
  headlineLine2: string
  body: string
  disclaimer?: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  tertiaryCta: { label: string; href: string }
}

export function LabsHero({
  headlineLine1,
  headlineLine2,
  body,
  disclaimer,
  primaryCta,
  secondaryCta,
  tertiaryCta,
}: LabsHeroProps) {
  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-display font-bold tracking-tight mb-8 leading-[1.1]">
          <span className="block text-neutral-900 mb-2">{headlineLine1}</span>
          <span className="block text-brand-orange">{headlineLine2}</span>
        </h1>

        <p className="text-lg md:text-subheading text-neutral-700 max-w-3xl mb-6 leading-relaxed">
          {body}
        </p>

        {disclaimer && (
          <p className="text-base md:text-lg italic text-neutral-600 max-w-3xl mb-10 leading-relaxed">
            {disclaimer}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Link href={primaryCta.href} className="btn-primary">{primaryCta.label}</Link>
          <Link href={secondaryCta.href} className="btn-secondary">{secondaryCta.label}</Link>
          <Link href={tertiaryCta.href} className="btn-secondary">{tertiaryCta.label}</Link>
        </div>
      </div>
    </section>
  )
}
