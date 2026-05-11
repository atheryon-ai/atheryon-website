'use client'

import { useState } from 'react'
import Link from 'next/link'

// Brand tokens mirrored locally because this section sets inline styles on
// dynamic states (active/inactive dials, recommended sell-cards). Tailwind
// classes can't express the conditional logic without class-name explosion.
// Source of truth: tailwind.config.ts (ink, bone, brand.amber, brand.deepblue).
const COLORS = {
  ink: '#0E1116',
  bone: '#EFEAE0',
  amber: '#D98B3E',
  deepblue: '#0D4D7A',
  boneAlpha30: 'rgba(239,234,224,0.3)',
  boneAlpha20: 'rgba(239,234,224,0.2)',
  boneAlpha04: 'rgba(239,234,224,0.04)',
  blueprintBorder: 'rgba(184,215,239,0.4)',
  blueprintBg: 'rgba(7,25,38,0.6)',
} as const

type PillarId = 'data' | 'aiDirection' | 'transformation'
type Selection = PillarId | 'custom' | null

interface Dial {
  id: PillarId
  title: string
  body: string
  cta: string
}

interface Blueprint {
  title: string
  intro: string
  bullets: string[]
}

interface SellCard {
  id: string
  title: string
  body: string
  ctaLabel: string
  ctaHref: string
}

interface FloorThirteenProps {
  anchor?: string
  badge: string
  title: string
  intro: string
  dials: Dial[]
  inputPlaceholder: string
  inputCta: string
  blueprints: {
    data: Blueprint
    aiDirection: Blueprint
    transformation: Blueprint
    custom: Blueprint
  }
  sellCardsHeading: string
  recommendation: Record<PillarId, string>
  sellCards: SellCard[]
  closingCta: { label: string; href: string }
}

export function FloorThirteen({
  anchor,
  badge,
  title,
  intro,
  dials,
  inputPlaceholder,
  inputCta,
  blueprints,
  sellCardsHeading,
  recommendation,
  sellCards,
  closingCta,
}: FloorThirteenProps) {
  const [selected, setSelected] = useState<Selection>(null)
  const [customText, setCustomText] = useState('')

  const handleDial = (id: PillarId) => {
    setSelected(id)
  }

  const handleGenerate = () => {
    if (!selected && customText.trim()) {
      setSelected('custom')
    }
  }

  const activeBlueprint: Blueprint | null = selected ? blueprints[selected] : null

  const recommendedSellId =
    selected && selected !== 'custom' ? recommendation[selected] : null

  const introText =
    activeBlueprint && customText.trim()
      ? `${activeBlueprint.intro} Your stated challenge: "${customText.trim()}".`
      : activeBlueprint?.intro

  return (
    <section
      id={anchor}
      className="px-6 section-spacing"
      style={{ backgroundColor: COLORS.ink, color: COLORS.bone }}
    >
      <div className="max-w-container mx-auto">
        <div className="mb-10 md:mb-14">
          <div className="mb-5 text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: COLORS.amber }}>
            {badge}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight mb-5 leading-[1.05]">
            {title}
          </h2>
          <p className="text-lg md:text-subheading leading-relaxed max-w-3xl opacity-80">{intro}</p>
        </div>

        {/* Switchboard */}
        <div className="grid md:grid-cols-3 gap-5">
          {dials.map((dial) => {
            const isActive = selected === dial.id
            const isData = dial.id === 'data'
            return (
              <div
                key={dial.id}
                data-testid="floor13-dial"
                className="p-6 border border-dashed rounded-xl"
                style={{
                  borderColor: isActive ? (isData ? COLORS.deepblue : COLORS.amber) : COLORS.boneAlpha30,
                  backgroundColor: isActive ? COLORS.boneAlpha04 : 'transparent',
                }}
              >
                <h3 className="text-xl font-bold mb-3">{dial.title}</h3>
                <p className="opacity-80 mb-5 leading-relaxed">{dial.body}</p>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleDial(dial.id)}
                  className="w-full px-4 py-2.5 text-sm font-semibold rounded-full transition-colors border-2"
                  style={{
                    borderColor: COLORS.bone,
                    color: isActive ? COLORS.ink : COLORS.bone,
                    backgroundColor: isActive ? COLORS.bone : 'transparent',
                  }}
                >
                  {dial.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Input row */}
        <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-3">
          <input
            data-testid="floor13-input"
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder={inputPlaceholder}
            className="px-4 py-3 rounded-full bg-transparent border border-bone/30 text-bone placeholder:text-bone/50 focus:outline-none focus:border-bone"
          />
          <button
            data-testid="floor13-generate"
            type="button"
            onClick={handleGenerate}
            className="px-6 py-3 text-sm font-semibold text-ink bg-bone rounded-full"
          >
            {inputCta}
          </button>
        </div>

        {/* Blueprint panel */}
        {activeBlueprint && (
          <div
            data-testid="floor13-blueprint"
            aria-live="polite"
            className="mt-10 p-8 rounded-xl border"
            style={{ borderColor: COLORS.blueprintBorder, backgroundColor: COLORS.blueprintBg }}
          >
            <h3 className="text-2xl font-bold mb-4">{activeBlueprint.title}</h3>
            <p className="opacity-90 leading-relaxed mb-6">{introText}</p>
            <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-3">
              The hidden architecture
            </h4>
            <ul className="space-y-2 mb-8">
              {activeBlueprint.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span style={{ color: COLORS.amber }}>•</span>
                  <span className="opacity-90 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-4">
              {sellCardsHeading}
            </h4>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {sellCards.map((card) => {
                const isRecommended = card.id === recommendedSellId
                return (
                  <div
                    key={card.id}
                    data-testid="floor13-sellcard"
                    data-recommended={isRecommended ? 'true' : 'false'}
                    className="p-5 rounded-xl border-2"
                    style={{
                      borderColor: isRecommended ? COLORS.amber : COLORS.boneAlpha20,
                      backgroundColor: COLORS.boneAlpha04,
                    }}
                  >
                    <h5 className="text-lg font-bold mb-2">{card.title}</h5>
                    <p className="text-sm opacity-80 leading-relaxed mb-4">{card.body}</p>
                    <Link
                      href={card.ctaHref}
                      className="text-sm font-semibold"
                      style={{ color: isRecommended ? COLORS.amber : COLORS.bone }}
                    >
                      {card.ctaLabel}
                    </Link>
                  </div>
                )
              })}
            </div>

            <Link
              href={closingCta.href}
              className="inline-flex items-center text-sm font-semibold opacity-80 hover:opacity-100"
              style={{ color: COLORS.bone }}
            >
              {closingCta.label} →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
