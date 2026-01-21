import { ClientCanvas } from './ClientCanvas'

interface ClientLogosProps {
  className?: string
  showLabel?: boolean
}

export function ClientLogos({ className = '', showLabel = true }: ClientLogosProps) {
  return (
    <div className={className}>
      {showLabel && (
        <p className="text-sm text-neutral-600 mb-6 font-medium">
          Microsoft Partner • Delivering for S&P Global
        </p>
      )}
      <ClientCanvas className="mt-2" />
    </div>
  )
}

// Tech partner logos (Azure, ISDA, etc.) - grayscale
export function TechPartnerLogos({ className = '' }: { className?: string }) {
  const partners = [
    {
      name: 'Microsoft Azure',
      icon: (
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <path fill="currentColor" d="M54.8 8.1L32.8 47.8l40.3 0-57.8 40.1 72.6 0L54.8 8.1z"/>
        </svg>
      ),
    },
    {
      name: 'Snowflake',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="currentColor" d="M12 0l2.5 4.33-2.5 4.34-2.5-4.34L12 0zm0 24l-2.5-4.33 2.5-4.34 2.5 4.34L12 24zm12-12l-4.33 2.5-4.34-2.5 4.34-2.5L24 12zM0 12l4.33-2.5 4.34 2.5-4.34 2.5L0 12zm19.66 6.93l-4.33-2.5.87-5 3.46 2 0 5.5zM4.34 5.07l4.33 2.5-.87 5-3.46-2 0-5.5zm15.32 0l0 5.5-3.46 2-.87-5 4.33-2.5zM4.34 18.93l0-5.5 3.46-2 .87 5-4.33 2.5z"/>
        </svg>
      ),
    },
    {
      name: 'Databricks',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="currentColor" d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.18l8.25 4.71v9.22L12 20.82l-8.25-4.71V6.89L12 2.18z"/>
          <path fill="currentColor" d="M12 6.75L6 10.5v6l6 3.75 6-3.75v-6l-6-3.75z"/>
        </svg>
      ),
    },
    {
      name: 'ISDA CDM',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
    },
    {
      name: 'FINOS',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path fill="currentColor" d="M12 6v12M6 12h12"/>
        </svg>
      ),
    },
  ]

  return (
    <div className={className}>
      <p className="text-sm text-neutral-500 text-center mb-6 font-medium">
        Built on trusted platforms
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="client-logo flex items-center justify-center w-10 h-10 text-neutral-400 hover:text-neutral-600"
            title={partner.name}
          >
            {partner.icon}
          </div>
        ))}
      </div>
    </div>
  )
}
