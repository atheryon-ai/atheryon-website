import type { Metadata } from 'next'
import { SimpleHero, Section, SectionDivider } from '@/components'

export const metadata: Metadata = {
  title: 'Terms of Service | Atheryon',
  description: 'Terms governing use of atheryon.com.au. Governed by the laws of New South Wales, Australia.',
  openGraph: {
    title: 'Terms of Service | Atheryon',
    description: 'Terms governing use of atheryon.com.au. Governed by the laws of New South Wales, Australia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Atheryon',
    description: 'Terms governing use of atheryon.com.au. Governed by the laws of New South Wales, Australia.',
  },
}

const EFFECTIVE_DATE = '11 May 2026'

export default function TermsPage() {
  return (
    <>
      <SimpleHero
        headline="Terms of Service"
        subheadline="The terms that apply to your use of atheryon.com.au."
        badge="Legal"
      />

      <SectionDivider />

      <Section>
        <div className="max-w-3xl">
          <p className="text-sm text-neutral-500 mb-10">Effective: {EFFECTIVE_DATE}</p>

          <div className="space-y-12 text-neutral-700 leading-relaxed">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website at
              atheryon.com.au (the &ldquo;Site&rdquo;), operated by Atheryon Pty Ltd (&ldquo;Atheryon&rdquo;,
              &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the Site you agree to these Terms.
            </p>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Acceptance of terms
              </h2>
              <p>
                Your use of the Site constitutes acceptance of these Terms. If you do not agree, please do
                not use the Site. If you use the Site on behalf of an organisation, you confirm that you
                have authority to bind that organisation to these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Use of the site
              </h2>
              <p className="mb-4">You agree to use the Site only for lawful purposes. You must not:</p>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5" />
                  <span>
                    Interfere with, disrupt, or attempt to gain unauthorised access to the Site or its
                    underlying systems.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5" />
                  <span>
                    Use automated scrapers, crawlers, or bots to harvest content at a rate that affects
                    other users, except for well-behaved search-engine indexing.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange mt-2.5" />
                  <span>Submit unlawful, deceptive, defamatory, or harmful content via any form on the Site.</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Intellectual property
              </h2>
              <p>
                All content on the Site &mdash; including text, graphics, logos, diagrams, code samples,
                reference architectures, and brand marks &mdash; is the property of Atheryon or its
                licensors and is protected by Australian and international copyright and trademark law.
                You may view the content for personal and internal business purposes. You may not
                reproduce, republish, distribute, or create derivative works from any content on the Site
                without prior written permission from Atheryon. The name &ldquo;Atheryon&rdquo;, the
                Atheryon logo, and program names (including &ldquo;MiB Insight&rdquo;) are trademarks of
                Atheryon Pty Ltd.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Third-party links
              </h2>
              <p>
                The Site may include links to third-party websites or resources. We provide these links for
                convenience only. Atheryon does not endorse and is not responsible for the content,
                accuracy, or availability of any third-party site. Your use of any linked third-party site
                is at your own risk and subject to that site&rsquo;s own terms and privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Limitation of liability
              </h2>
              <p>
                The Site and its content are provided on an &ldquo;as is&rdquo; basis for general
                informational purposes. We make no warranties, express or implied, as to the accuracy,
                completeness, or fitness for any particular purpose of the content. To the maximum extent
                permitted by law, Atheryon will not be liable for any indirect, incidental, consequential,
                or special loss arising from your use of, or inability to use, the Site. Nothing in these
                Terms excludes any rights or liabilities that cannot lawfully be excluded under the
                Australian Consumer Law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Governing law
              </h2>
              <p>
                These Terms are governed by the laws of New South Wales, Australia. Any dispute arising in
                connection with the Site or these Terms is subject to the exclusive jurisdiction of the
                courts of New South Wales and the federal courts of Australia.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Changes to these terms
              </h2>
              <p>
                We may update these Terms from time to time to reflect changes to the Site, the services we
                describe, or the law. The current version is always available on this page and is dated at
                the top. Continued use of the Site after a change takes effect constitutes acceptance of
                the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">
                Contact
              </h2>
              <p>
                Questions about these Terms should be sent to{' '}
                <a href="mailto:info@atheryon.com.au" className="text-brand-orange hover:underline">
                  info@atheryon.com.au
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  )
}
