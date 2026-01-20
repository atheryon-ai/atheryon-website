import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  badge?: string
  title?: string
  description?: string
  centered?: boolean
}

export function Section({ children, className = '', badge, title, description, centered = false }: SectionProps) {
  return (
    <section className={`px-6 py-16 md:py-24 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {(badge || title || description) && (
          <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
            {badge && (
              <span className="inline-block text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-lg text-gray-600 leading-relaxed ${centered ? 'max-w-3xl mx-auto' : 'max-w-3xl'}`}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
