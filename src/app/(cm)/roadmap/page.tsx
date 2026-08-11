import type { Metadata } from 'next'
import Link from 'next/link'
import { buyerThemes } from '@/content/buyerThemes'
import { mortgagesRoadmap } from '@/content/site'
import { StatusBadge, type Status } from '@/components/StatusBadge'

export const metadata: Metadata = {
  title: 'Roadmap — Atheryon',
  description:
    'What Atheryon is building next. Mortgages practice and three buyer themes in active design or roadmap status.',
  openGraph: {
    title: 'Roadmap — Atheryon',
    description: 'What Atheryon is building next.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap — Atheryon',
    description: 'What Atheryon is building next.',
  },
  alternates: { canonical: 'https://atheryon.com.au/roadmap' },
}

// href is optional: an item can be declared intent with nothing to link to
// yet. Mortgages is the current case — the practice is real, the page is not.
type RoadmapItem = {
  id: string
  name: string
  status: Status
  blurb: string
  href?: string
}

function aggregate(): RoadmapItem[] {
  const themeItems: RoadmapItem[] = buyerThemes
    .filter((t) => t.status !== 'shipped')
    .map((t) => ({
      id: t.id,
      name: t.name,
      status: t.status,
      blurb: t.speedPitch,
      href: `/themes/${t.id}`,
    }))

  const mortgages: RoadmapItem = {
    id: mortgagesRoadmap.id,
    name: mortgagesRoadmap.name,
    status: mortgagesRoadmap.status,
    blurb: mortgagesRoadmap.blurb,
  }

  // BUILDING first, then ROADMAP, stable within each group.
  return [mortgages, ...themeItems].sort((a, b) => {
    const rank = (s: Status) => (s === 'building' ? 0 : s === 'roadmap' ? 1 : 2)
    return rank(a.status) - rank(b.status)
  })
}

export default function RoadmapPage() {
  const items = aggregate()

  return (
    <div className="bg-bone min-h-screen">
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / roadmap / whats-next
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            Roadmap
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            Atheryon ships fast. This is what is BUILDING and what is on the ROADMAP. Every item is an open invitation to co-build.
          </p>
        </div>
      </section>

      <section>
        <ul className="max-w-container mx-auto px-6 py-16 md:py-20 grid grid-cols-1 gap-px bg-charcoal/15 border border-charcoal/15">
          {items.map((it) => (
            <li key={it.id} className="bg-bone p-6 md:p-8 flex flex-col md:flex-row gap-3 md:gap-8 md:items-baseline">
              <div className="md:w-32 shrink-0">
                <StatusBadge status={it.status} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight mb-2">
                  {it.href ? (
                    <Link href={it.href} className="underline-offset-4 hover:underline">
                      {it.name}
                    </Link>
                  ) : (
                    it.name
                  )}
                </h2>
                <p className="font-mono text-xs md:text-sm text-charcoal/75 leading-relaxed">{it.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
