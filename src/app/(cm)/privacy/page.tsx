import type { Metadata } from 'next'
import { DocPage, DocBanner, DocSection, DocFooter } from '@/components'

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden="true" className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-charcoal/60 mt-2.5" />
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

const linkClass = 'text-charcoal underline underline-offset-4 hover:text-ink'

export default function PrivacyPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / legal / privacy"
        title="Privacy Policy"
        body="How Atheryon handles your personal information."
      />

      <DocSection label={`Effective: ${EFFECTIVE_DATE}`}>
        <div className="max-w-3xl space-y-12 text-charcoal/85 leading-relaxed">
          <p>
            Atheryon Pty Ltd (&ldquo;Atheryon&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a Sydney-based firm
            operating under the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles
            (APPs). This policy explains what personal information we collect through atheryon.com.au and
            how we handle it.
          </p>

          <section>
            <h2 className="font-display text-2xl font-medium text-charcoal mb-4 tracking-tight">
              Information we collect
            </h2>
            <p className="mb-4">
              We only collect information you actively provide and minimal technical information needed to
              operate the site. Specifically:
            </p>
            <ul className="space-y-3 list-none">
              <Bullet>
                <strong className="text-charcoal">Contact form submissions:</strong> name, email
                address, optional company name, and the message you choose to send us.
              </Bullet>
              <Bullet>
                <strong className="text-charcoal">Basic analytics:</strong> aggregate page views and
                referrer data used to understand which content is read. We do not collect IP addresses
                for marketing purposes and we do not run advertising or cross-site tracking.
              </Bullet>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-charcoal mb-4 tracking-tight">
              How we use information
            </h2>
            <p className="mb-4">
              We use the information you provide only to respond to your enquiry and to maintain a record
              of the conversation. Specifically we use it to:
            </p>
            <ul className="space-y-3 list-none">
              <Bullet>Reply to your message and arrange a confidential discussion if appropriate.</Bullet>
              <Bullet>Maintain a contact history so subsequent engagement has context.</Bullet>
              <Bullet>Understand which areas of the site are read, so we can improve the content.</Bullet>
            </ul>
            <p className="mt-4">
              We do not use your personal information for marketing automation, profiling, or any
              machine-learning training.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-charcoal mb-4 tracking-tight">
              Sharing and disclosure
            </h2>
            <p className="mb-4">
              We do not sell, rent, or trade personal information. We do not share it with third parties
              for their own marketing purposes. The only disclosures we make are:
            </p>
            <ul className="space-y-3 list-none">
              <Bullet>
                <strong className="text-charcoal">Service providers</strong> who help us operate the
                site (form delivery via Formspree, web hosting, email). These providers are bound by
                confidentiality obligations and may only use the data to provide the service.
              </Bullet>
              <Bullet>
                <strong className="text-charcoal">Where required by law</strong> &mdash; for example
                in response to a lawful regulator, court order, or to protect our rights.
              </Bullet>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-charcoal mb-4 tracking-tight">
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
            <h2 className="font-display text-2xl font-medium text-charcoal mb-4 tracking-tight">
              Your rights
            </h2>
            <p className="mb-4">
              Under the Australian Privacy Act 1988 and the Australian Privacy Principles you have the
              right to:
            </p>
            <ul className="space-y-3 list-none">
              <Bullet>Access the personal information we hold about you.</Bullet>
              <Bullet>Request correction of inaccurate or out-of-date information.</Bullet>
              <Bullet>
                Request deletion of your information, subject to legal retention requirements.
              </Bullet>
              <Bullet>
                Make a complaint about how we have handled your information. You may also complain to
                the Office of the Australian Information Commissioner (OAIC) at{' '}
                <a
                  href="https://www.oaic.gov.au"
                  className={linkClass}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  oaic.gov.au
                </a>
                .
              </Bullet>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium text-charcoal mb-4 tracking-tight">
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
            <h2 className="font-display text-2xl font-medium text-charcoal mb-4 tracking-tight">
              Contact for privacy questions
            </h2>
            <p>
              Questions, access requests, or complaints about this policy should be sent to{' '}
              <a href="mailto:info@atheryon.com.au" className={linkClass}>
                info@atheryon.com.au
              </a>
              . We aim to respond to privacy enquiries within 30 days.
            </p>
          </section>
        </div>
      </DocSection>

      <DocFooter label="atheryon / legal / privacy / end-of-document" />
    </DocPage>
  )
}
