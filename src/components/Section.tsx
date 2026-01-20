import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  badge?: string
  title?: string
  description?: string
  centered?: boolean
  dark?: boolean
}

export function Section({ children, className = '', badge, title, description, centered = false, dark = false }: SectionProps) {
  return (
    <section className={`px-6 section-spacing ${dark ? 'bg-slate-900 text-white' : ''} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(badge || title || description) && (
          <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
            {badge && (
              <span className={`inline-block text-sm font-semibold uppercase tracking-wider mb-4 ${
                dark ? 'text-brand-orange' : 'text-brand-orange'
              }`}>
                {badge}
              </span>
            )}
            {title && (
              <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-5 leading-[1.1] ${
                dark ? 'text-white' : 'text-slate-900'
              }`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-lg md:text-xl leading-relaxed ${centered ? 'max-w-3xl mx-auto' : 'max-w-3xl'} ${
                dark ? 'text-slate-300' : 'text-slate-600'
              }`}>
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

interface SectionDividerProps {
  className?: string
}

export function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  )
}
