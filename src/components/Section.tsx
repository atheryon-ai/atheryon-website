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
    <section className={`px-6 section-spacing ${dark ? 'bg-neutral-900 text-white' : ''} ${className}`}>
      <div className="max-w-container mx-auto">
        {(badge || title || description) && (
          <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
            {badge && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 ${
                dark ? 'bg-white/10' : 'bg-white/80'
              } backdrop-blur-sm border border-neutral-500/10 rounded-full mb-6 shadow-soft`}>
                <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
                <span className={`text-sm font-medium ${dark ? 'text-white' : 'text-neutral-700'}`}>
                  {badge}
                </span>
              </div>
            )}
            {title && (
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-[1.1] ${
                dark ? 'text-white' : 'text-neutral-900'
              }`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`text-lg md:text-subheading leading-relaxed ${centered ? 'max-w-3xl mx-auto' : 'max-w-3xl'} ${
                dark ? 'text-neutral-400' : 'text-neutral-600'
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
    <div className={`max-w-container mx-auto px-6 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-500/20 to-transparent" />
    </div>
  )
}
