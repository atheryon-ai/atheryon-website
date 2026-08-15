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

// A short final row would otherwise leave bordered empty cells. The last card
// stretches across the tracks its row does not fill, per breakpoint: 2 columns
// at md, 3 at lg. Class strings are written out in full so Tailwind emits them.
function lastRowSpan(total: number, index: number): string {
  if (index !== total - 1) return ''
  const shortAtMd = total >= 2 ? (2 - (total % 2)) % 2 : 0
  const shortAtLg = total >= 3 ? (3 - (total % 3)) % 3 : 0
  const md = shortAtMd === 1 ? 'md:col-span-2' : ''
  const lg = shortAtLg === 2 ? 'lg:col-span-3' : shortAtLg === 1 ? 'lg:col-span-2' : 'lg:col-span-1'
  return `${md} ${lg}`.trim()
}

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
      {/* The gap-px grid draws its rules by letting the parent ground through,
          so a short final row leaves bordered empty boxes that read as missing
          content. Two things prevent that: cap the track count at the number of
          themes (a one-theme surface gets a single full-width card), and let the
          last row's cards stretch across whatever tracks remain. */}
      <ul
        className={`grid grid-cols-1 gap-px bg-charcoal/15 border border-charcoal/15 ${
          themesList.length >= 2 ? 'md:grid-cols-2' : ''
        } ${themesList.length >= 3 ? 'lg:grid-cols-3' : ''}`}
      >
        {themesList.map((theme, index) => (
          <li
            key={theme.id}
            className={`bg-bone flex flex-col ${lastRowSpan(themesList.length, index)}`}
          >
            {/* Real platform screenshot for the theme. theme.thumb is a
                preformed path (/menu-themes-thumbs/t-*.png) — never prepend
                t- again. Fixed aspect box prevents layout shift while the
                image loads; max-h keeps a spanning last-row card from
                turning its screenshot into a hero. The first row loads
                eagerly: lazy-loading everything leaves the top of each
                surface showing empty bordered boxes on a fast scroll, which
                reads as missing content rather than as loading. */}
            <div className="aspect-[16/10] max-h-64 w-full overflow-hidden border-b border-charcoal/15">
              <img
                src={theme.thumb}
                alt={`${theme.title} screen`}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="p-5 flex flex-1 flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/55">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-lg font-medium text-charcoal tracking-tight leading-tight">
                  {theme.title}
                </span>
              </div>
              {theme.blurb && (
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {theme.blurb}
                </p>
              )}
              {theme.pages != null && (
                <div className="mt-auto pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/55">
                  {theme.pages} {theme.pages === 1 ? 'page' : 'pages'}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ThemesPage() {
  return (
    <DocPage numbered={false}>
      <h1 className="sr-only">{themes.headline}</h1>

      <DocBanner
        label="atheryon / labs / themes"
        title={themes.headline}
        body={themes.intro}
      />

      <DocSection label={themes.countsLine}>
        <div className="mb-6 pb-6 border-b border-charcoal/15">
          <Link
            href="/labs"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-charcoal/70 hover:text-charcoal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
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
