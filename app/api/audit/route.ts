import { NextResponse } from "next/server";
import { auditFormSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";

// Free website audit form. Public, so: rate limited, honeypot, zod.
export async function POST(request: Request) {
  const { success } = rateLimit(`audit:${clientIp(request)}`, {
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = auditFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const { utm, websiteUrl, email, focusAreas, notes } = parsed.data;

  try {
    await prisma.auditRequest.create({
      data: {
        websiteUrl,
        email,
        focusAreas,
        notes: notes || null,
        utmSource: utm?.source || null,
        utmMedium: utm?.medium || null,
        utmCampaign: utm?.campaign || null,
        utmTerm: utm?.term || null,
        utmContent: utm?.content || null,
      },
    });
  } catch (err) {
    console.error("[audit] failed to save audit request", err);
    return NextResponse.json(
      { error: "We couldn't submit your request right now. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
