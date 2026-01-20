interface CardProps {
  title: string
  description: string
  className?: string
}

export function Card({ title, description, className = '' }: CardProps) {
  return (
    <div className={`p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  duration?: string
  className?: string
}

export function FeatureCard({ title, description, duration, className = '' }: FeatureCardProps) {
  return (
    <div className={`p-6 bg-gray-50 border border-gray-200 rounded-lg ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
        </h3>
        {duration && (
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {duration}
          </span>
        )}
      </div>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
