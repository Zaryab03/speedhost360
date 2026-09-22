import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success } = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly, or reach us on WhatsApp." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Honeypot: a real visitor never fills this hidden field. Return success
  // without persisting or telling the bot anything went differently.
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const { company_website: _honeypot, utm, ...lead } = parsed.data;
  void _honeypot;

  try {
    await prisma.lead.create({
      data: {
        name: lead.name,
        businessName: lead.businessName || null,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        message: lead.message,
        utmSource: utm?.source || null,
        utmMedium: utm?.medium || null,
        utmCampaign: utm?.campaign || null,
        utmTerm: utm?.term || null,
        utmContent: utm?.content || null,
      },
    });
  } catch (err) {
    console.error("[contact] failed to save lead", err);
    return NextResponse.json(
      {
        error:
          "We couldn't submit your request right now. Please try again or contact us directly on WhatsApp.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
