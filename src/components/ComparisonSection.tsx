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
    <table className={`w-full border-t border-neutral-900/15 ${className}`}>
      <thead>
        <tr className="border-b border-neutral-900/15">
          <th className="text-left text-xs font-semibold tracking-[0.18em] uppercase text-neutral-500 py-4 pr-6 w-1/4">
            &nbsp;
          </th>
          <th className="text-left text-xs font-semibold tracking-[0.18em] uppercase text-neutral-500 py-4 pr-6 w-3/8">
            {traditionalTitle}
          </th>
          <th className="text-left text-xs font-semibold tracking-[0.18em] uppercase text-brand-orange py-4 w-3/8">
            {atheryonTitle}
          </th>
        </tr>
      </thead>
      <tbody>
        {comparisonItems.map((item, index) => (
          <tr key={index} className="border-b border-neutral-900/10 align-top">
            <td className="py-5 pr-6 text-neutral-500 text-sm md:text-base">{item.feature}</td>
            <td className="py-5 pr-6 text-neutral-500 line-through decoration-neutral-300">
              {item.traditional}
            </td>
            <td className="py-5 text-neutral-900 font-medium">
              {item.atheryon}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
