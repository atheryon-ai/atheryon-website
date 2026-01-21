interface DiagramPlaceholderProps {
  title: string
  className?: string
}

export function DiagramPlaceholder({ title, className = '' }: DiagramPlaceholderProps) {
  return (
    <div className={`bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px] ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 flex items-center justify-center mb-4">
        <svg
          className="w-7 h-7 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
      </div>
      <span className="text-sm text-slate-500 text-center font-medium">{title}</span>
    </div>
  )
}
