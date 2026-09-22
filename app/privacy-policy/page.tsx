import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/data/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How SpeedHost360 collects, uses and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
      <section>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Legal</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Privacy Policy
          </h1>
          <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
            <section>
              <h2 className="text-base font-semibold text-ink">Information we collect</h2>
              <p className="mt-2">
                When you submit our contact form, we collect the information you provide: name,
                business name, email, phone/WhatsApp number, selected service and your project
                message. We do not ask for or store payment details on this website.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Cookies &amp; analytics</h2>
              <p className="mt-2">
                We use essential cookies required for the site to function, and, only with your
                consent via our cookie banner, Google Analytics to understand aggregate site
                usage. Analytics scripts do not load until you accept. You can withdraw consent
                at any time by clearing your browser&rsquo;s local storage for this site.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">UTM &amp; attribution data</h2>
              <p className="mt-2">
                If you arrive via a marketing link containing UTM parameters, we store that
                source information in your browser session and associate it with a contact form
                submission, so we understand which channel led to an inquiry. This data is not
                shared with third parties beyond our analytics provider.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Third-party services</h2>
              <p className="mt-2">
                We may use third-party services for analytics (Google Analytics), communication
                (WhatsApp Business), and infrastructure hosting. Each operates under its own
                privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Data retention</h2>
              <p className="mt-2">
                Contact form submissions are retained only as long as needed to respond to your
                inquiry and, where a project proceeds, for the duration of our working
                relationship plus any period required for legitimate business or legal purposes.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Your rights</h2>
              <p className="mt-2">
                You may request access to, correction of, or deletion of the personal information
                we hold about you by contacting us using the details below.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Contact</h2>
              <p className="mt-2">
                Questions about this policy can be sent to{" "}
                <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2 hover:text-signal">
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
