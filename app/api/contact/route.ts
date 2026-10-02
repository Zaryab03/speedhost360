import { NextResponse } from "next/server";
import { briefFormSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";

const GENERIC_ERROR =
  "We couldn't submit your request right now. Please try again or contact us directly on WhatsApp.";

// Project brief form (/contact). Public, so: rate limited, honeypot, zod.
export async function POST(request: Request) {
  const { success } = await rateLimit(`contact:${clientIp(request)}`, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
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

  const parsed = briefFormSchema.safeParse(body);
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

  const { utm, ...lead } = parsed.data;

  try {
    await prisma.lead.create({
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        plan: lead.plan || null,
        budget: lead.budget,
        timeline: lead.timeline,
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
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
