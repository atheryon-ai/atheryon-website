import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, QuoteBlock, Checklist, BulletList, CTASection } from '@/components'
import { site } from '@/content/site'

const { recoveryMigration } = site.pages

export const metadata: Metadata = {
  title: recoveryMigration.title,
  description: recoveryMigration.description,
  openGraph: {
    title: recoveryMigration.title,
    description: recoveryMigration.description,
  },
}

export default function RecoveryMigrationPage() {
  return (
    <>
      <SimpleHero
        headline={recoveryMigration.hero.headline}
        subheadline={recoveryMigration.hero.subheadline}
        badge="Recovery & Migration"
      />

      <SectionDivider />

      {/* When Clients Call Us */}
      <Section
        badge={recoveryMigration.whenClientsCallUs.badge}
        title={recoveryMigration.whenClientsCallUs.title}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl">
          <ul className="space-y-4">
            {recoveryMigration.whenClientsCallUs.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <SectionDivider />

      {/* Recovery */}
      <Section
        badge={recoveryMigration.recovery.badge}
        title={recoveryMigration.recovery.title}
        description={recoveryMigration.recovery.description}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl">
          <Checklist items={recoveryMigration.recovery.items} />
        </div>
      </Section>

      <SectionDivider />

      {/* Model-Led Migration */}
      <Section
        badge={recoveryMigration.migration.badge}
        title={recoveryMigration.migration.title}
      >
        <div className="max-w-3xl">
          <QuoteBlock quote={recoveryMigration.migration.quote} className="mb-8" />
          <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card">
            <BulletList items={recoveryMigration.migration.items} />
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* What We Leave Behind */}
      <Section
        badge="Deliverables"
        title={recoveryMigration.whatWeLeave.title}
      >
        <div className="p-8 bg-white border border-slate-200/60 rounded-3xl shadow-card max-w-2xl">
          <Checklist items={recoveryMigration.whatWeLeave.items} />
        </div>
      </Section>

      <CTASection
        text="If you have a stalled initiative or a migration with unclear semantics, we should talk."
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
