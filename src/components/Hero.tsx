'use client'

import Link from 'next/link'
import { AnimatedBadge } from './AnimatedBadge'
import { DataVisualization } from './DataVisualization'
import { TechPartners } from './TechPartners'

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
  showPartners?: boolean
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  showVisualization = true,
  showPartners = true,
}: HeroProps) {
  // Split headline to apply gradient to last word
  const words = headline.split(' ')
  const lastWord = words.pop()
  const restOfHeadline = words.join(' ')

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="animate-stagger">
            <AnimatedBadge text="AI-native delivery" className="mb-6" />

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
              {restOfHeadline}{' '}
              <span className="text-gradient-orange">{lastWord}</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
              {subheadline}
            </p>

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-card hover:shadow-card-hover"
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-card"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}

            {showPartners && (
              <div className="mt-16 pt-8 border-t border-slate-200/50">
                <TechPartners />
              </div>
            )}
          </div>

          {/* Right Column - Visualization */}
          {showVisualization && (
            <div className="hidden lg:block">
              <DataVisualization />
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
}

export function SimpleHero({ headline, subheadline, badge }: SimpleHeroProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-mesh" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {badge && (
          <div className="flex justify-center mb-6">
            <AnimatedBadge text={badge} />
          </div>
        )}

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
          {headline}
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
      </div>
    </section>
  )
}
