import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider, BulletList } from '@/components'

function RichBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5" />
      <span>{children}</span>
    </li>
  )
}

export const metadata: Metadata = {
  title: 'Privacy Policy — Atheryon',
  description: 'How Atheryon collects, uses, and protects personal information under the Australian Privacy Act 1988.',
  openGraph: {
    title: 'Privacy Policy — Atheryon',
    description: 'How Atheryon collects, uses, and protects personal information under the Australian Privacy Act 1988.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Atheryon',
    description: 'How Atheryon collects, uses, and protects personal information under the Australian Privacy Act 1988.',
  },
  alternates: {
    canonical: 'https://atheryon.com.au/privacy',
  },
}

const EFFECTIVE_DATE = '11 May 2026'

export default function PrivacyPage() {
  return (
    <>
      <SimpleHero
        headline="Privacy Policy"
        subheadline="How Atheryon handles your personal information."
        badge="Legal"
      />

      <SectionDivider />

      <Section>
        <div className="max-w-3xl">
          <p className="text-sm text-neutral-500 mb-10">Effective: {EFFECTIVE_DATE}</p>

          <div className="space-y-12 text-neutral-700 leading-relaxed">
            <p>
              Atheryon Pty Ltd (&ldquo;Atheryon&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a Sydney-based firm
              operating under the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles
              (APPs). This policy explains what personal information we collect through atheryon.com.au and
              how we handle it.
            </p>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Information we collect
              </h2>
              <p className="mb-4">
                We only collect information you actively provide and minimal technical information needed to
                operate the site. Specifically:
              </p>
              <ul className="space-y-3 list-none">
                <RichBullet>
                  <strong className="text-neutral-900">Contact form submissions:</strong> name, email
                  address, optional company name, and the message you choose to send us.
                </RichBullet>
                <RichBullet>
                  <strong className="text-neutral-900">Basic analytics:</strong> aggregate page views and
                  referrer data used to understand which content is read. We do not collect IP addresses
                  for marketing purposes and we do not run advertising or cross-site tracking.
                </RichBullet>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                How we use information
              </h2>
              <p className="mb-4">
                We use the information you provide only to respond to your enquiry and to maintain a record
                of the conversation. Specifically we use it to:
              </p>
              <BulletList
                items={[
                  'Reply to your message and arrange a confidential discussion if appropriate.',
                  'Maintain a contact history so subsequent engagement has context.',
                  'Understand which areas of the site are read, so we can improve the content.',
                ]}
              />
              <p className="mt-4">
                We do not use your personal information for marketing automation, profiling, or any
                machine-learning training.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Sharing and disclosure
              </h2>
              <p className="mb-4">
                We do not sell, rent, or trade personal information. We do not share it with third parties
                for their own marketing purposes. The only disclosures we make are:
              </p>
              <ul className="space-y-3 list-none">
                <RichBullet>
                  <strong className="text-neutral-900">Service providers</strong> who help us operate the
                  site (form delivery via Formspree, web hosting, email). These providers are bound by
                  confidentiality obligations and may only use the data to provide the service.
                </RichBullet>
                <RichBullet>
                  <strong className="text-neutral-900">Where required by law</strong> &mdash; for example
                  in response to a lawful regulator, court order, or to protect our rights.
                </RichBullet>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Data retention
              </h2>
              <p>
                We retain contact-form submissions for as long as is reasonably necessary to maintain the
                business relationship or address the enquiry, and as required by Australian law (typically
                up to seven years for business records). Aggregate analytics are retained for a maximum of
                26 months. You can request earlier deletion at any time using the contact details below.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Your rights
              </h2>
              <p className="mb-4">
                Under the Australian Privacy Act 1988 and the Australian Privacy Principles you have the
                right to:
              </p>
              <ul className="space-y-3 list-none">
                <RichBullet>Access the personal information we hold about you.</RichBullet>
                <RichBullet>Request correction of inaccurate or out-of-date information.</RichBullet>
                <RichBullet>
                  Request deletion of your information, subject to legal retention requirements.
                </RichBullet>
                <RichBullet>
                  Make a complaint about how we have handled your information. You may also complain to
                  the Office of the Australian Information Commissioner (OAIC) at{' '}
                  <a
                    href="https://www.oaic.gov.au"
                    className="text-brand-orange hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    oaic.gov.au
                  </a>
                  .
                </RichBullet>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Cookies
              </h2>
              <p>
                This site uses only essential cookies needed for the site to function (for example, to
                remember whether you have dismissed a notice). We do not use advertising cookies, third-party
                tracking cookies, or behavioural profiling. You can block cookies in your browser without
                affecting access to the public content of the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Contact for privacy questions
              </h2>
              <p>
                Questions, access requests, or complaints about this policy should be sent to{' '}
                <a href="mailto:info@atheryon.com.au" className="text-brand-orange hover:underline">
                  info@atheryon.com.au
                </a>
                . We aim to respond to privacy enquiries within 30 days.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  )
}
