import type { Metadata } from 'next'
import { Hero, Section, QuoteBlock, Checklist, BulletList, CTASection } from '@/components'
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
      <Hero
        headline={recoveryMigration.hero.headline}
        subheadline={recoveryMigration.hero.subheadline}
      />

      {/* When Clients Call Us */}
      <Section
        badge={recoveryMigration.whenClientsCallUs.badge}
        title={recoveryMigration.whenClientsCallUs.title}
      >
        <ul className="space-y-3 max-w-2xl">
          {recoveryMigration.whenClientsCallUs.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Recovery */}
      <Section
        badge={recoveryMigration.recovery.badge}
        title={recoveryMigration.recovery.title}
        description={recoveryMigration.recovery.description}
        className="bg-gray-50"
      >
        <Checklist items={recoveryMigration.recovery.items} className="mt-8" />
      </Section>

      {/* Model-Led Migration */}
      <Section
        badge={recoveryMigration.migration.badge}
        title={recoveryMigration.migration.title}
      >
        <QuoteBlock quote={recoveryMigration.migration.quote} className="mb-8 max-w-3xl" />
        <BulletList items={recoveryMigration.migration.items} className="max-w-2xl" />
      </Section>

      {/* What We Leave Behind */}
      <Section
        title={recoveryMigration.whatWeLeave.title}
        className="bg-gray-50"
      >
        <Checklist items={recoveryMigration.whatWeLeave.items} />
      </Section>

      <CTASection
        text="If you have a stalled initiative or a migration with unclear semantics, we should talk."
        ctaLabel={site.cta.label}
        ctaHref={site.cta.href}
      />
    </>
  )
}
