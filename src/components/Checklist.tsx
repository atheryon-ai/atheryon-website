interface ChecklistProps {
  title?: string
  items: string[]
  className?: string
}

export function Checklist({ title, items, className = '' }: ChecklistProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="font-display text-lg font-semibold text-slate-900 mb-5 tracking-tight">
          {title}
        </h3>
      )}
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface BulletListProps {
  items: string[]
  className?: string
}

export function BulletList({ items, className = '' }: BulletListProps) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5" />
          <span className="text-slate-600">{item}</span>
        </li>
      ))}
    </ul>
  )
}
