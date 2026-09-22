import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/data/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern working with SpeedHost360 on web development, hosting and marketing.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Terms of Service", path: "/terms-of-service" }]} />
      <section>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-signal">Legal</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Terms of Service
          </h1>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
            <section>
              <h2 className="text-base font-semibold text-ink">Services</h2>
              <p className="mt-2">
                {siteConfig.name} provides website development, web hosting, managed hosting and
                digital marketing services as described on this website. Specific scope, timeline
                and deliverables for a project are agreed in writing before work begins.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Payments</h2>
              <p className="mt-2">
                Payment terms (deposits, milestones, and final payment) are set out in each
                project&rsquo;s proposal or agreement. Hosting and managed hosting plans are
                billed on the cycle confirmed at signup.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Hosting &amp; managed hosting</h2>
              <p className="mt-2">
                We do not guarantee specific uptime percentages on this website. Hosting and
                managed hosting service levels, if any are contractually guaranteed, are set out
                in your specific agreement.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Website development</h2>
              <p className="mt-2">
                Project timelines depend on timely delivery of content, feedback and approvals
                from the client. Delays in providing these may extend the agreed timeline.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Digital marketing</h2>
              <p className="mt-2">
                We do not guarantee specific search rankings, traffic levels or revenue outcomes.
                Marketing recommendations and campaigns are based on professional judgment and
                industry best practice, not guaranteed results.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Intellectual property</h2>
              <p className="mt-2">
                Upon final payment, ownership of custom deliverables created specifically for
                your project transfers to you, excluding third-party tools, libraries, and
                SpeedHost360&rsquo;s own pre-existing frameworks or code, which remain licensed
                for your use.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Client responsibilities</h2>
              <p className="mt-2">
                You are responsible for the accuracy and legality of content you provide, and for
                maintaining any account credentials we issue to you.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Support &amp; cancellation</h2>
              <p className="mt-2">
                Ongoing support and hosting agreements may be cancelled according to the notice
                period set out in your specific agreement.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Liability</h2>
              <p className="mt-2">
                To the extent permitted by law, {siteConfig.name}&rsquo;s liability for any claim
                arising from our services is limited to the fees paid for the specific service in
                question.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Third-party services</h2>
              <p className="mt-2">
                Some deliverables may depend on third-party services (domain registrars, payment
                processors, marketing platforms) governed by their own terms, outside our
                control.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-ink">Contact</h2>
              <p className="mt-2">
                Questions about these terms can be sent to{" "}
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
