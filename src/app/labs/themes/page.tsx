import type { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionDivider, ThemeBand } from '@/components'
import { site } from '@/content/site'
import {
  ODS_THEMES,
  BUSINESS_THEMES_BY_FUNCTION,
  FUNCTION_META,
  FUNCTION_ORDER,
} from '@/content/themes'

const { themes } = site.pages

export const metadata: Metadata = {
  title: themes.title,
  description: themes.description,
  openGraph: { title: themes.title, description: themes.description },
  twitter: {
    card: 'summary_large_image',
    title: themes.title,
    description: themes.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/labs/themes',
  },
}

const businessThemeCount = Object.values(BUSINESS_THEMES_BY_FUNCTION).reduce(
  (s, list) => s + list.length,
  0,
)
const businessPageCount = Object.values(BUSINESS_THEMES_BY_FUNCTION).reduce(
  (s, list) => s + list.reduce((ss, t) => ss + (t.pages || 0), 0),
  0,
)

export default function ThemesPage() {
  return (
    <main>
      <h1 className="sr-only">{themes.headline}</h1>

      <div className="max-w-container mx-auto px-6 pt-8 pb-2">
        <Link href="/labs" className="text-sm font-semibold text-brand-orange hover:underline">
          ← Back to Labs
        </Link>
      </div>

      <Section badge={themes.badge} title={themes.headline} description={themes.intro}>
        <p className="text-sm text-neutral-500">{themes.countsLine}</p>
      </Section>

      <SectionDivider />

      <ThemeBand
        testId="theme-band-ods"
        tagLabel="ODS"
        tagTone="ods"
        title="Operational Data Store"
        blurb="Schemas, validators, market data, lifecycle engine, entity intelligence, ops/dev tools, and the MSX workshop deck."
        themes={ODS_THEMES}
      />

      <div className="max-w-container mx-auto px-6 py-6">
        <div className="border-t border-neutral-500/10 pt-6 flex items-baseline gap-3 justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            {themes.businessDividerLabel}
          </span>
          <span className="text-sm text-neutral-500">
            · {businessThemeCount} themes · {businessPageCount}p
          </span>
        </div>
      </div>

      {FUNCTION_ORDER.map((fn) => {
        const list = BUSINESS_THEMES_BY_FUNCTION[fn]
        if (!list || list.length === 0) return null
        const meta = FUNCTION_META[fn]
        return (
          <ThemeBand
            key={fn}
            testId={`theme-band-${fn}`}
            tagLabel={meta?.office ?? fn}
            tagTone="business"
            title={meta?.label ?? fn}
            blurb={meta?.blurb ?? ''}
            themes={list}
          />
        )
      })}
    </main>
  )
}
