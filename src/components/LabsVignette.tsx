interface LabsVignetteProps {
  title: string
  aiProposed: string
  bankerCorrected: string
}

export function LabsVignette({ title, aiProposed, bankerCorrected }: LabsVignetteProps) {
  return (
    <article
      data-testid="labs-vignette"
      className="p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-soft"
    >
      <h3 className="text-xl font-bold text-neutral-900 tracking-tight mb-6">{title}</h3>
      <div className="mb-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">The implementation AI proposed</h4>
        <p className="text-neutral-700 leading-relaxed">{aiProposed}</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-orange mb-2">What banking context changed</h4>
        <p className="text-neutral-800 leading-relaxed font-medium">{bankerCorrected}</p>
      </div>
    </article>
  )
}
