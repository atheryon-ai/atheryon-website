import type { Metadata } from 'next'
import Link from 'next/link'
import { buyerThemes } from '@/content/buyerThemes'
import { StatusBadge } from '@/components/StatusBadge'

export const metadata: Metadata = {
  title: 'Themes — Atheryon',
  description:
    'Seven buyer themes across capital markets. Each one is a desk-head pocket of pain, mapped to a workflow we have built or are building.',
  openGraph: {
    title: 'Themes — Atheryon',
    description: 'Seven buyer themes across capital markets.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Themes — Atheryon',
    description: 'Seven buyer themes across capital markets.',
  },
  alternates: { canonical: 'https://atheryon.com.au/themes' },
}

export default function ThemesIndexPage() {
  return (
    <div className="bg-bone min-h-screen">
      <section className="border-b border-charcoal/15">
        <div className="max-w-container mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-16">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-6">
            atheryon / themes / buyer-matrix
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-charcoal leading-[1.02] mb-6">
            Themes
          </h1>
          <p className="font-mono text-sm md:text-base text-charcoal/80 max-w-3xl">
            Seven buyer themes across capital markets. Each theme is a desk-head pocket of pain, mapped to a workflow we have built or are building. Speed is the proof — every theme leads with the time we shorten.
          </p>
        </div>
      </section>

      <section>
        <ul className="max-w-container mx-auto px-6 py-16 md:py-20 grid grid-cols-1 gap-px bg-charcoal/15 border border-charcoal/15">
          {buyerThemes.map((t, i) => (
            <li key={t.id} className="bg-bone p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 md:items-baseline">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 md:w-16 shrink-0">
                §{String(i + 1).padStart(2, '0')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight">
                    <Link href={`/themes/${t.id}`} className="underline-offset-4 hover:underline">
                      {t.name}
                    </Link>
                  </h2>
                  <StatusBadge status={t.status} />
                </div>
                <p className="text-sm md:text-base text-charcoal/80 leading-relaxed mb-2">{t.pain}</p>
                <p className="font-mono text-xs md:text-sm text-charcoal/65 leading-relaxed">{t.speedPitch}</p>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal/55 md:text-right md:w-56 shrink-0">
                {t.buyerTitles.join(' · ')}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
