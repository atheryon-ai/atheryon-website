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
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-semibold text-sm">
              {step.number}
            </div>
            {index < steps.length - 1 && (
              <div className="w-px h-full bg-gray-200 mt-2" />
            )}
          </div>
          <div className="flex-1 pb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
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
    <ol className={`space-y-3 ${className}`}>
      {steps.map((step, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 font-medium text-sm">
            {index + 1}
          </span>
          <span className="text-gray-700 pt-0.5">{step}</span>
        </li>
      ))}
    </ol>
  )
}
