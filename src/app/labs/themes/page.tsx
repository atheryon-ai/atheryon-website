import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, DocFooter } from '@/components'
import { site } from '@/content/site'
import {
  ODS_THEMES,
  BUSINESS_THEMES_BY_FUNCTION,
  FUNCTION_META,
  FUNCTION_ORDER,
  type Theme,
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

function ThemeBlock({
  tag,
  title,
  blurb,
  themesList,
}: {
  tag: string
  title: string
  blurb?: string
  themesList: ReadonlyArray<Theme>
}) {
  return (
    <div className="border-b border-charcoal/15 py-12 last:border-b-0 last:pb-0">
      <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-2">
        {tag}
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-medium text-charcoal tracking-tight mb-3">
        {title}
      </h3>
      {blurb && (
        <p className="text-base text-charcoal/80 leading-relaxed max-w-3xl mb-6">
          {blurb}
        </p>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
        {themesList.map((theme) => (
          <li key={theme.id} className="bg-bone p-4 flex flex-col">
            <a
              href={`https://labs.atheryon.ai${theme.primaryRoute}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-base font-medium text-charcoal tracking-tight underline-offset-4 hover:underline"
            >
              {theme.title}
              <span aria-hidden="true" className="ml-1 font-mono text-xs text-charcoal/50">
                ↗
              </span>
            </a>
            {theme.blurb && (
              <p className="font-mono text-xs text-charcoal/70 mt-2 leading-relaxed">
                {theme.blurb}
              </p>
            )}
            {theme.pages != null && (
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/55 mt-3">
                {theme.pages} pages
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ThemesPage() {
  return (
    <DocPage>
      <h1 className="sr-only">{themes.headline}</h1>

      <DocBanner
        label="atheryon / labs / themes"
        title={themes.headline}
        body={themes.intro}
      />

      <DocSection label={themes.countsLine}>
        <div className="mb-2">
          <Link
            href="/labs"
            className="inline-flex items-center gap-2 font-mono text-sm text-charcoal underline-offset-4 hover:underline"
          >
            <span aria-hidden="true">←</span>
            Back to Labs
          </Link>
        </div>

        <ThemeBlock
          tag="ODS"
          title="Operational Data Store"
          blurb="Schemas, validators, market data, lifecycle engine, entity intelligence, ops and dev tools."
          themesList={ODS_THEMES}
        />

        <div className="pt-12 border-t border-charcoal/15">
          <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-1">
            {themes.businessDividerLabel}
          </div>
          <div className="font-mono text-sm text-charcoal/70 mb-8">
            {businessThemeCount} themes · {businessPageCount} pages
          </div>

          {FUNCTION_ORDER.map((fn) => {
            const list = BUSINESS_THEMES_BY_FUNCTION[fn]
            if (!list || list.length === 0) return null
            const meta = FUNCTION_META[fn]
            return (
              <ThemeBlock
                key={fn}
                tag={meta?.office ?? fn}
                title={meta?.label ?? fn}
                blurb={meta?.blurb ?? ''}
                themesList={list}
              />
            )
          })}
        </div>
      </DocSection>

      <DocFooter label="atheryon / labs / themes / end-of-document" />
    </DocPage>
  )
}
