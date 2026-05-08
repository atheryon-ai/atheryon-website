import { ReactNode } from 'react'

interface CardProps {
  title: string
  description: string
  icon?: ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'outline'
}

export function Card({ title, description, icon, className = '', variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-white border-t border-neutral-900/10',
    glass: 'glass-card',
    outline: 'bg-transparent border-t border-neutral-900/15',
  }

  return (
    <div className={`pt-6 pb-2 transition-colors duration-300 ${variants[variant]} ${className}`}>
      {icon && (
        <div className="w-6 h-6 mb-5 text-brand-orange">
          {icon}
        </div>
      )}
      <h3 className="font-display font-medium text-2xl text-neutral-900 mb-3 tracking-tight leading-snug">
        {title}
      </h3>
      <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  duration?: string
  icon?: ReactNode
  className?: string
}

export function FeatureCard({ title, description, duration, icon, className = '' }: FeatureCardProps) {
  return (
    <div className={`p-6 md:p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card card-hover transition-all duration-300 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-warm-200 flex items-center justify-center">
              <div className="w-5 h-5 text-neutral-500">
                {icon}
              </div>
            </div>
          )}
          <h3 className="font-semibold text-lg text-neutral-900 tracking-tight">
            {title}
          </h3>
        </div>
        {duration && (
          <span className="self-start text-sm font-medium text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-full whitespace-nowrap">
            {duration}
          </span>
        )}
      </div>
      <p className="text-neutral-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

interface IconCardProps {
  title: string
  description: string
  icon: ReactNode
  iconBgColor?: string
  className?: string
}

export function IconCard({ title, description, icon, iconBgColor = 'bg-warm-200', className = '' }: IconCardProps) {
  return (
    <div className={`group p-6 md:p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card card-hover transition-all duration-300 ${className}`}>
      <div className={`w-14 h-14 rounded-xl ${iconBgColor} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
        <div className="w-7 h-7 text-neutral-500">
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-lg md:text-xl text-neutral-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-neutral-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

// New: Service Card for Social Grow style
interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  stat?: string
  statLabel?: string
  className?: string
}

export function ServiceCard({ title, description, icon, stat, statLabel, className = '' }: ServiceCardProps) {
  return (
    <div className={`group p-8 bg-white border border-neutral-500/10 rounded-2xl shadow-card card-hover transition-all duration-300 ${className}`}>
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-warm-200 flex items-center justify-center mb-6 group-hover:bg-warm-300 transition-colors">
        <div className="w-6 h-6 text-neutral-500">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-xl text-neutral-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-neutral-600 leading-relaxed mb-4">
        {description}
      </p>

      {/* Optional stat */}
      {stat && (
        <div className="pt-4 border-t border-neutral-500/10">
          <span className="text-2xl font-bold text-brand-orange">{stat}</span>
          {statLabel && <span className="text-sm text-neutral-500 ml-2">{statLabel}</span>}
        </div>
      )}
    </div>
  )
}
