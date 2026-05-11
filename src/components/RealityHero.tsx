'use client'

import { Fragment } from 'react'
import Link from 'next/link'

interface RealityHeroProps {
  headline: string
  lede: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  partnerStrip?: { partners: { name: string }[] }
}

export function RealityHero({ headline, lede, primaryCta, secondaryCta, partnerStrip }: RealityHeroProps) {
  return (
    <section className="relative overflow-hidden min-h-[640px] md:min-h-[720px] flex items-center bg-bone">
      <div
        aria-hidden
        className="reality-hero-sepia absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/reality/hero-sepia.svg')",
          animation: 'hero-glitch 30s ease-in-out infinite',
        }}
      />
      <div
        aria-hidden
        className="reality-hero-architecture absolute inset-0 bg-no-repeat bg-cover bg-center opacity-0"
        style={{
          backgroundImage: "url('/reality/hero-architecture.svg')",
          animation: 'architecture-reveal 30s ease-in-out infinite',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bone/80 via-bone/30 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-6 py-20 md:py-24">
        <h1 className="font-display text-5xl md:text-6xl lg:text-display-lg text-charcoal tracking-tight leading-[1.05] mb-6 max-w-4xl">
          {headline}
        </h1>
        <p className="text-lg md:text-subheading text-charcoal/80 max-w-2xl mb-10 leading-relaxed">
          {lede}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-ink rounded-full hover:bg-charcoal transition-colors"
          >
            {primaryCta.label}
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-charcoal border-2 border-charcoal rounded-full hover:bg-charcoal hover:text-bone transition-colors"
          >
            {secondaryCta.label}
          </Link>
        </div>
        {partnerStrip && partnerStrip.partners.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/60">
              Ecosystem
            </span>
            {partnerStrip.partners.map((p, i) => (
              <Fragment key={p.name}>
                {i > 0 && <span aria-hidden className="text-charcoal/40">·</span>}
                <span className="text-sm text-charcoal">{p.name}</span>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
