import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { LeadStatusSelect, DeleteLeadButton } from "@/components/admin/lead-row-actions";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-ink">Leads</h1>
        <span className="text-xs text-ink-muted">
          {leads.length} total
        </span>
      </div>

      {leads.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">
          No leads yet — submissions from the contact form will show up here.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-[0.06em] text-ink-muted">
                <th className="py-2 pr-4 font-medium">Received</th>
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Business</th>
                <th className="py-2 pr-4 font-medium">Contact</th>
                <th className="py-2 pr-4 font-medium">Service</th>
                <th className="py-2 pr-4 font-medium">Budget</th>
                <th className="py-2 pr-4 font-medium">Message</th>
                <th className="py-2 pr-4 font-medium">Source</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-line align-top">
                  <td className="whitespace-nowrap py-3 pr-4 text-ink-muted">
                    {lead.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                    <br />
                    {lead.createdAt.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 pr-4 font-medium text-ink">{lead.name}</td>
                  <td className="py-3 pr-4 text-ink-muted">{lead.businessName || "—"}</td>
                  <td className="py-3 pr-4 text-ink-muted">
                    <a href={`mailto:${lead.email}`} className="focus-ring block hover:text-signal">
                      {lead.email}
                    </a>
                    <a href={`tel:${lead.phone}`} className="focus-ring block hover:text-signal">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="py-3 pr-4 text-ink-muted">{lead.service}</td>
                  <td className="py-3 pr-4 text-ink-muted">{lead.budget || "—"}</td>
                  <td className="max-w-64 py-3 pr-4 text-ink-muted">
                    <p className="line-clamp-3" title={lead.message}>
                      {lead.message}
                    </p>
                  </td>
                  <td className="py-3 pr-4 text-ink-muted">
                    {lead.utmSource || "direct"}
                    {lead.utmMedium ? ` / ${lead.utmMedium}` : ""}
                  </td>
                  <td className="py-3 pr-4">
                    <LeadStatusSelect id={lead.id} status={lead.status} />
                  </td>
                  <td className="py-3 text-right">
                    <DeleteLeadButton id={lead.id} name={lead.name} />
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
