interface TechPartnersProps {
  className?: string
}

export function TechPartners({ className = '' }: TechPartnersProps) {
  const partners = [
    {
      name: 'Microsoft Azure',
      icon: (
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <path fill="#0089D6" d="M54.8 8.1L32.8 47.8l40.3 0-57.8 40.1 72.6 0L54.8 8.1z"/>
        </svg>
      ),
    },
    {
      name: 'Snowflake',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#29B5E8" d="M12 0l2.5 4.33-2.5 4.34-2.5-4.34L12 0zm0 24l-2.5-4.33 2.5-4.34 2.5 4.34L12 24zm12-12l-4.33 2.5-4.34-2.5 4.34-2.5L24 12zM0 12l4.33-2.5 4.34 2.5-4.34 2.5L0 12zm19.66 6.93l-4.33-2.5.87-5 3.46 2 0 5.5zM4.34 5.07l4.33 2.5-.87 5-3.46-2 0-5.5zm15.32 0l0 5.5-3.46 2-.87-5 4.33-2.5zM4.34 18.93l0-5.5 3.46-2 .87 5-4.33 2.5z"/>
        </svg>
      ),
    },
    {
      name: 'Databricks',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#FF3621" d="M12 0L1.5 6v12L12 24l10.5-6V6L12 0zm0 2.18l8.25 4.71v9.22L12 20.82l-8.25-4.71V6.89L12 2.18z"/>
          <path fill="#FF3621" d="M12 6.75L6 10.5v6l6 3.75 6-3.75v-6l-6-3.75z"/>
        </svg>
      ),
    },
    {
      name: 'Microsoft Fabric',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#0078D4" d="M0 0v11h11V0H0zm13 0v11h11V0H13zM0 13v11h11V13H0zm13 0v11h11V13H13z"/>
        </svg>
      ),
    },
    {
      name: 'Synapse',
      icon: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path fill="#0078D4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
    },
  ]

  return (
    <div className={`${className}`}>
      <p className="text-sm text-slate-500 text-center mb-6 font-medium">
        Built on trusted platforms
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="group flex items-center justify-center w-12 h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            title={partner.name}
          >
            {partner.icon}
          </div>
        ))}
      </div>
    </div>
  )
}
