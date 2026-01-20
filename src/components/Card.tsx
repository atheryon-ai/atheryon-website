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
    default: 'bg-white border border-slate-200/60 shadow-card hover:shadow-card-hover hover:-translate-y-1',
    glass: 'glass-card hover:shadow-card-hover hover:-translate-y-1',
    outline: 'bg-transparent border-2 border-slate-200 hover:border-slate-300',
  }

  return (
    <div className={`p-6 md:p-8 rounded-3xl transition-all duration-300 ${variants[variant]} ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 flex items-center justify-center mb-5">
          <div className="w-6 h-6 text-brand-orange">
            {icon}
          </div>
        </div>
      )}
      <h3 className="font-display text-lg md:text-xl font-semibold text-slate-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
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
    <div className={`p-6 md:p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange/10 to-brand-blue/10 flex items-center justify-center">
              <div className="w-5 h-5 text-brand-orange">
                {icon}
              </div>
            </div>
          )}
          <h3 className="font-display text-lg font-semibold text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>
        {duration && (
          <span className="text-sm font-medium text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-full whitespace-nowrap">
            {duration}
          </span>
        )}
      </div>
      <p className="text-slate-600 leading-relaxed">
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

export function IconCard({ title, description, icon, iconBgColor = 'from-brand-orange/10 to-brand-blue/10', className = '' }: IconCardProps) {
  return (
    <div className={`group p-6 md:p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${className}`}>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${iconBgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <div className="w-7 h-7 text-brand-orange">
          {icon}
        </div>
      </div>
      <h3 className="font-display text-lg md:text-xl font-semibold text-slate-900 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
