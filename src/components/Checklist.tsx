interface ChecklistProps {
  title?: string
  items: string[]
  className?: string
}

export function Checklist({ title, items, className = '' }: ChecklistProps) {
  return (
    <div className={className}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-900 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-700">{item}</span>
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
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  )
}
