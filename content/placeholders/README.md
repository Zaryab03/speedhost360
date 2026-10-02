# Placeholder content, replace before launch

Everything below is structurally complete but not real. Nothing here was
fabricated as if genuine: it's either clearly marked in the UI (an orange
"Placeholder" tag) or is neutral infrastructure config. Search the codebase
for `isPlaceholder` and `PLACEHOLDER` to find every instance programmatically.

## Content that must be replaced

| What | Where | File |
|---|---|---|
| Case studies (problem, solution, verified results, live link). Empty until real, client-approved entries are added; the page shows an empty state and is noindexed meanwhile | `/case-studies` | `lib/data/case-studies.ts` |
| Portfolio items (live client sites). Same empty-state behaviour | `/portfolio` | `lib/data/portfolio.ts` |
| 2 before/after gallery projects + real screenshots | `/gallery` | `lib/data/gallery.ts` |
| Testimonial quote(s), plus optional photo, logo and a specific result. **Only publish with the client's written permission** | Homepage | `lib/data/testimonials.ts` |
| Business address (currently blank, marked placeholder) | Footer / structured data | `lib/data/site.ts` → `siteConfig.address` |
| Social profile links, only add ones that actually exist | Footer | `lib/data/site.ts` → `siteConfig.social` |
| Phone number, confirm whether it's the same as WhatsApp or different | Everywhere | `lib/data/site.ts` → `siteConfig.phoneNumber` |

## Config that must be set before deploying

| What | Purpose | Where |
|---|---|---|
| `DATABASE_URL` / `DIRECT_URL` | Self-managed Postgres connection (see README) | `.env.local` |
| `NEXT_PUBLIC_HELPDESK_URL` | Client Portal link (defaults to https://clients.speedhost360.com) | `.env.local` |
| `AUTH_SECRET` | Session signing secret, generate with `openssl rand -base64 32` | `.env.local` |
| `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` | First admin login, used only by `prisma/seed.ts` | `.env.local` |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics measurement ID, leave blank to keep analytics off | `.env.local` |
| Domain | Currently `speedhost360.com` throughout (canonical URLs, sitemap, JSON-LD, OG) | `lib/data/site.ts` → `siteConfig.domain` / `url` |

## Reliability & payment facts (confirmed, not placeholders)

The 99.9% uptime commitment, daily backup cadence, US/EU server location,
payment by bank transfer (account details sent by email),
and "6+ years in business" are published as real, confirmed claims, not
placeholders, in `lib/data/trust.ts` and the hosting/managed-hosting pricing
notes in `lib/data/services.ts`. If any of these ever change (a new data
center, a dropped payment method, another year in business), update them
there so every page that references them stays in sync.

## Not yet wired to real infrastructure

- **Contact form lead delivery**: every submission is saved to the `Lead` table and shows up at `/admin/leads` (status + delete per row). Nothing emails or pings anyone yet; if you want a Slack/email alert on new leads too, that's still to add on top of this.
- **Image uploads** (`/api/admin/upload`) write to the local filesystem (`/public/uploads`). Fine for local dev or a single persistent server; swap for object storage (Vercel Blob, S3, etc.) before deploying to serverless, where the filesystem isn't persistent.
- **Rate limiting** (`lib/rate-limit.ts`) is stored in Postgres (`RateLimitBucket`), so it survives restarts and is shared across instances.
- **Hosting plan specs**: every unconfirmed value is `TODO_CONFIRM` in `lib/data/plans.ts` (and the `HostingPlan` table after `npm run db:seed`). Also `siteConfig.statusPageUrl` and the ownership/exit terms in `components/sections/data-ownership.tsx`.

## Once real content is in

- Run `npm run db:migrate:deploy` then `npm run db:seed` against the real `DATABASE_URL`.
- Flip `isPlaceholder` off (or just delete the placeholder entries) in the `lib/data/*.ts` files above: the orange "Placeholder" tag and `noIndex` on case studies are driven by that flag, so real entries stop being marked and become indexable automatically.
- Recheck `robots.ts`/`sitemap.ts` output once real case studies and blog posts exist.
