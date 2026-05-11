import type { Theme } from '@/content/themes'
import { FUNCTION_META } from '@/content/themes'

interface ThemeCardProps {
  theme: Theme
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const visibleRoutes = theme.routes.slice(0, 3)
  const overflow = theme.routes.length - visibleRoutes.length

  return (
    <a
      href={`https://labs.atheryon.ai${theme.primaryRoute}`}
      target="_blank"
      rel="noopener"
      className="block bg-white border border-neutral-500/10 rounded-2xl overflow-hidden hover:shadow-card transition-shadow"
    >
      <div className="aspect-[16/10] bg-warm-200 overflow-hidden">
        <img
          src={theme.thumb}
          alt={theme.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-neutral-900 tracking-tight">{theme.title}</h3>
          <span className="text-xs text-neutral-500 whitespace-nowrap">{theme.pages}p</span>
        </div>
        {theme.blurb && (
          <p className="text-sm text-neutral-700 leading-relaxed mb-3">{theme.blurb}</p>
        )}
        {visibleRoutes.length > 0 && (
          <ul className="border border-neutral-500/10 rounded-lg divide-y divide-neutral-500/10 mb-3">
            {visibleRoutes.map((r) => (
              <li key={r.href} className="px-3 py-1.5 text-xs font-mono text-neutral-700">
                {r.label}
              </li>
            ))}
            {overflow > 0 && (
              <li className="px-3 py-1.5 text-xs italic text-neutral-500">+{overflow} more</li>
            )}
          </ul>
        )}
        {theme.secondaryFunctions && theme.secondaryFunctions.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-neutral-500">also:</span>
            {theme.secondaryFunctions.map((fn) => (
              <span
                key={fn}
                className="text-xs font-semibold text-brand-orange bg-brand-orange/10 rounded-full px-2 py-0.5"
              >
                {FUNCTION_META[fn]?.label ?? fn}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
