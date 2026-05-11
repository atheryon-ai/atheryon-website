import type { Theme } from '@/content/themes'
import { ThemeCard } from './ThemeCard'

interface ThemeBandProps {
  testId: string
  tagLabel: string
  tagTone?: 'ods' | 'business'
  title: string
  blurb: string
  themes: readonly Theme[]
}

export function ThemeBand({ testId, tagLabel, tagTone = 'business', title, blurb, themes }: ThemeBandProps) {
  const totalPages = themes.reduce((s, t) => s + (t.pages || 0), 0)
  const tagClass =
    tagTone === 'ods'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
      : 'bg-warm-200 text-neutral-800 border-neutral-500/10'

  return (
    <section data-testid={testId} className="max-w-container mx-auto px-6 py-12">
      <div className="flex flex-wrap items-baseline gap-3 mb-3">
        <span className={`text-xs font-bold uppercase tracking-wider rounded-full px-2.5 py-1 border ${tagClass}`}>
          {tagLabel}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">{title}</h2>
        <span className="text-sm text-neutral-500">
          {themes.length} themes · {totalPages}p
        </span>
      </div>
      {blurb && <p className="text-base text-neutral-700 max-w-3xl mb-8 leading-relaxed">{blurb}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {themes.map((t) => (
          <ThemeCard key={t.id} theme={t} />
        ))}
      </div>
    </section>
  )
}
