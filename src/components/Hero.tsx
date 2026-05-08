'use client'

import Link from 'next/link'
import { ClientLogos } from './ClientLogos'

interface HeroProps {
  headline: string
  subheadline: string
  primaryCta?: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  showVisualization?: boolean
  showLogos?: boolean
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  showVisualization = true,
  showLogos = true,
}: HeroProps) {
  // Split headline to apply accent color to key words
  const words = headline.split(' ')

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-warm" />

<div className="relative z-10 max-w-container mx-auto px-6 py-16 md:py-20 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Left Column - Content (50%) */}
          <div className="flex-1 animate-stagger">
            {/* Eyebrow */}
            <div className="mb-6 text-xs font-semibold tracking-[0.18em] uppercase text-brand-orange">
              Senior-led delivery
            </div>

            {/* Headline - Social Grow style */}
            <h1 className="text-4xl md:text-5xl lg:text-display-xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
              {words.slice(0, -2).join(' ')}{' '}
              <span className="text-brand-orange">{words.slice(-2).join(' ')}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-subheading text-neutral-600 max-w-xl mb-10 leading-relaxed">
              {subheadline}
            </p>

            {/* CTAs */}
            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="btn-primary"
                  >
                    {primaryCta.label}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="btn-secondary"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}

            {/* Client Logos */}
            {showLogos && (
              <div className="mt-16 pt-8 border-t border-neutral-500/10">
                <ClientLogos />
              </div>
            )}
          </div>

          {/* Right Column - Logo Animation Video (50%) */}
          {showVisualization && (
            <div className="flex-1 hidden lg:flex justify-end">
              <div className="w-full max-w-lg">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-2xl"
                  src="/atheryon-logo-animation.mp4"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Simpler hero variant for subpages
interface SimpleHeroProps {
  headline: string
  subheadline: string
  badge?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  balanceHeadline?: boolean
}

export function SimpleHero({
  headline,
  subheadline,
  badge,
  primaryCta,
  secondaryCta,
  balanceHeadline = false,
}: SimpleHeroProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden pt-32 md:pt-40">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-warm" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {badge && (
          <div className="mb-5 text-xs font-semibold tracking-[0.18em] uppercase text-brand-orange">
            {badge}
          </div>
        )}

        <h1
          className={`${
            balanceHeadline ? 'text-balance ' : ''
          }text-4xl md:text-5xl lg:text-display font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]`}
        >
          {headline}
        </h1>

        <p className="text-lg md:text-subheading text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-secondary">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
