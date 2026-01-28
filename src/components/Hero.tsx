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

      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-atheryon-blue/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-container mx-auto px-6 py-16 md:py-20 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Left Column - Content (50%) */}
          <div className="flex-1 animate-stagger">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-500/10 rounded-full mb-8 shadow-soft">
              <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-neutral-700">Senior-led delivery</span>
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

          {/* Right Column - Device Mockup (50%) */}
          {showVisualization && (
            <div className="flex-1 hidden lg:flex justify-end">
              <div className="device-mockup w-full max-w-lg">
                <div className="device-mockup-inner p-6">
                  {/* Abstract AI Network Visualization */}
                  <svg viewBox="0 0 400 300" className="w-full h-auto">
                    {/* Background grid */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E0D9" strokeWidth="0.5"/>
                      </pattern>
                      <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#4BC0FF" stopOpacity="0.6"/>
                      </linearGradient>
                      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF9900" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#FFB833" stopOpacity="0.6"/>
                      </linearGradient>
                    </defs>
                    <rect width="400" height="300" fill="url(#grid)"/>

                    {/* Connection lines */}
                    <g stroke="#A7B0B8" strokeWidth="1" opacity="0.4">
                      <line x1="80" y1="80" x2="200" y2="150"/>
                      <line x1="200" y1="150" x2="320" y2="100"/>
                      <line x1="200" y1="150" x2="280" y2="220"/>
                      <line x1="80" y1="200" x2="200" y2="150"/>
                      <line x1="120" y1="130" x2="200" y2="150"/>
                      <line x1="200" y1="150" x2="340" y2="180"/>
                    </g>

                    {/* Data flow animation paths */}
                    <g>
                      <circle r="4" fill="#0A84FF" opacity="0.8">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M80,80 L200,150 L320,100"/>
                      </circle>
                      <circle r="4" fill="#FF9900" opacity="0.8">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M80,200 L200,150 L280,220"/>
                      </circle>
                    </g>

                    {/* Nodes */}
                    <g>
                      {/* Primary node - center */}
                      <circle cx="200" cy="150" r="24" fill="url(#nodeGradient)"/>
                      <circle cx="200" cy="150" r="16" fill="white"/>
                      <text x="200" y="155" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0A1A2F">AI</text>

                      {/* Secondary nodes */}
                      <circle cx="80" cy="80" r="16" fill="url(#orangeGradient)"/>
                      <circle cx="320" cy="100" r="14" fill="url(#nodeGradient)"/>
                      <circle cx="80" cy="200" r="12" fill="url(#orangeGradient)"/>
                      <circle cx="280" cy="220" r="14" fill="url(#nodeGradient)"/>
                      <circle cx="120" cy="130" r="10" fill="#A7B0B8" opacity="0.5"/>
                      <circle cx="340" cy="180" r="10" fill="#A7B0B8" opacity="0.5"/>
                    </g>

                    {/* Labels */}
                    <g fontSize="10" fill="#A7B0B8">
                      <text x="80" y="60">Data Source</text>
                      <text x="300" y="85">Validation</text>
                      <text x="60" y="225">Ingestion</text>
                      <text x="260" y="245">Production</text>
                    </g>
                  </svg>
                </div>
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
}

export function SimpleHero({ headline, subheadline, badge }: SimpleHeroProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden pt-32 md:pt-40">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-warm" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {badge && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-neutral-500/10 rounded-full shadow-soft">
              <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
              <span className="text-sm font-medium text-neutral-700">{badge}</span>
            </div>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl lg:text-display font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
          {headline}
        </h1>

        <p className="text-lg md:text-subheading text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
      </div>
    </section>
  )
}
