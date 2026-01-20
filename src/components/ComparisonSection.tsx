interface ComparisonItem {
  feature: string
  traditional?: string
  atheryon: string
}

interface ComparisonSectionProps {
  items?: ComparisonItem[]
  traditionalTitle?: string
  atheryonTitle?: string
  className?: string
}

export function ComparisonSection({
  items,
  traditionalTitle = 'Traditional Approach',
  atheryonTitle = 'Atheryon Approach',
  className = '',
}: ComparisonSectionProps) {
  const defaultItems: ComparisonItem[] = [
    {
      feature: 'Delivery model',
      traditional: 'POC that never scales',
      atheryon: 'Production from day one',
    },
    {
      feature: 'Data assets',
      traditional: 'Disposable pipelines',
      atheryon: 'Reusable data products',
    },
    {
      feature: 'Semantics',
      traditional: 'Lost in translation',
      atheryon: 'Canonical model preserved',
    },
    {
      feature: 'Change cost',
      traditional: 'Every change is a rewrite',
      atheryon: 'Governed evolution',
    },
    {
      feature: 'AI readiness',
      traditional: 'Ungoverned, untrusted',
      atheryon: 'Validated, lineage-tracked',
    },
  ]

  const comparisonItems = items || defaultItems

  return (
    <div className={`grid md:grid-cols-2 gap-6 lg:gap-8 ${className}`}>
      {/* Traditional Column */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900 tracking-tight">
            {traditionalTitle}
          </h3>
        </div>
        <ul className="space-y-4">
          {comparisonItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <span className="text-sm text-slate-400 block">{item.feature}</span>
                <span className="text-slate-600">{item.traditional}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Atheryon Column */}
      <div className="relative bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-card overflow-hidden">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-blue" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-display text-xl font-semibold text-slate-900 tracking-tight">
            {atheryonTitle}
          </h3>
        </div>
        <ul className="space-y-4">
          {comparisonItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-sm text-slate-400 block">{item.feature}</span>
                <span className="text-slate-900 font-medium">{item.atheryon}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
