import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  badge?: string
  title?: string
  description?: string
  centered?: boolean
  dark?: boolean
  id?: string
}

export function Section({ children, className = '', badge, title, description, centered = false, dark = false, id }: SectionProps) {
  return (
    <section id={id} className={`px-6 section-spacing scroll-mt-24 ${dark ? 'bg-neutral-900 text-white' : ''} ${className}`}>
      <div className="max-w-container mx-auto">
        {(badge || title || description) && (
          <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}>
            {badge && (
              <div className={`mb-5 text-xs font-semibold tracking-[0.18em] uppercase ${
                dark ? 'text-neutral-400' : 'text-brand-orange'
              }`}>
                {badge}
              </div>
            )}
            {title && (
              <h2 className={`font-display text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight mb-5 leading-[1.05] ${
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
