import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { LeadStatusSelect, DeleteLeadButton } from "@/components/admin/lead-row-actions";
import { auditFocusOptions, optionLabel } from "@/lib/data/forms";

export const dynamic = "force-dynamic";

export default async function AdminAuditsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const audits = await prisma.auditRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Audit requests</h1>
        <span className="text-xs text-ink-muted">{audits.length} total</span>
      </div>

      {audits.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">
          No audit requests yet. Submissions from the free website audit form will show up here.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-[0.06em] text-ink-muted">
                <th className="py-2 pr-4 font-medium">Received</th>
                <th className="py-2 pr-4 font-medium">Website</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Improve</th>
                <th className="py-2 pr-4 font-medium">Notes</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {audits.map((a) => (
                <tr key={a.id} className="border-b border-line align-top">
                  <td className="whitespace-nowrap py-3 pr-4 text-ink-muted">
                    {a.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </td>
                  <td className="max-w-56 break-all py-3 pr-4 text-ink">
                    {/* Shown as text, not a link: it's user-submitted. */}
                    {a.websiteUrl}
                  </td>
                  <td className="py-3 pr-4 text-ink-muted">
                    <a href={`mailto:${a.email}`} className="focus-ring hover:text-signal">
                      {a.email}
                    </a>
                  </td>
                  <td className="py-3 pr-4 text-ink-muted">
                    {a.focusAreas.map((f) => optionLabel(auditFocusOptions, f)).join(", ")}
                  </td>
                  <td className="max-w-64 py-3 pr-4 text-ink-muted">
                    <p className="line-clamp-3" title={a.notes ?? ""}>
                      {a.notes || "N/A"}
                    </p>
                  </td>
                  <td className="py-3 pr-4">
                    <LeadStatusSelect id={a.id} status={a.status} endpoint="/api/admin/audits" />
                  </td>
                  <td className="py-3 text-right">
                    <DeleteLeadButton id={a.id} name={a.websiteUrl} endpoint="/api/admin/audits" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
