interface Step {
  number: number
  title: string
  description: string
}

interface StepperProps {
  steps: Step[]
  className?: string
}

export function Stepper({ steps, className = '' }: StepperProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {steps.map((step, index) => (
        <div key={step.number} className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-orange text-white font-semibold text-lg shadow-button">
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div className="w-px h-full bg-gradient-to-b from-brand-orange/20 to-transparent mt-3" />
            )}
          </div>
          <div className="flex-1 pb-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2 tracking-tight">
              {step.title}
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

interface SimpleStepperProps {
  steps: string[]
  className?: string
}

export function SimpleStepper({ steps, className = '' }: SimpleStepperProps) {
  return (
    <ol className={`space-y-4 ${className}`}>
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-4 group">
          <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-warm-200 text-brand-orange font-semibold text-sm group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
            {index + 1}
          </span>
          <span className="text-neutral-700 pt-1 font-medium">{step}</span>
        </li>
      ))}
    </ol>
  )
}
