# SpeedHost360 website

Next.js 16 (App Router) site for [speedhost360.com](https://speedhost360.com): web development,
hosting, managed hosting, business email and digital marketing. Self-managed PostgreSQL via
Prisma 7, admin panel with Auth.js.

## Local setup

Requirements: Node 20+, Docker (for Postgres).

```bash
cp .env.example .env.local          # then fill in POSTGRES_PASSWORD, the two DB URLs, AUTH_SECRET
docker compose up -d                # Postgres 16 on localhost:5433
npm install                         # also runs prisma generate
npm run db:migrate                  # apply migrations (dev)
npm run db:seed                     # hosting plans + first admin user (if ADMIN_SEED_* set)
npm run dev                         # http://localhost:3000, admin at /admin
```

| Script | What it does |
|---|---|
| `npm run db:migrate` | `prisma migrate dev`: create/apply migrations in development |
| `npm run db:migrate:deploy` | `prisma migrate deploy`: apply pending migrations (staging/production) |
| `npm run db:seed` | Upsert hosting plans from `lib/data/plans.ts`; create admin user if `ADMIN_SEED_*` set |
| `npm run db:studio` | Prisma Studio |
| `npm run smoke` | Smoke test against a running instance (see below) |

## Where things live

- **Hosting plans:** `lib/data/plans.ts` is the source; `npm run db:seed` copies it into the
  `HostingPlan` table, which the site reads (`lib/plans.ts`, cached 5 minutes, falls back to the
  config if the DB is unavailable). Unconfirmed values are the literal `TODO_CONFIRM`; they render
  as "Ask us" in production and as a red marker in development. `grep -rn TODO_CONFIRM lib`
  lists them.
- **Business facts** (contact details, hours, helpdesk URL): `lib/data/site.ts`.
- **Forms:** brief form (`/contact`, `POST /api/contact`) → `Lead`; free audit form
  (`/free-website-audit`, `POST /api/audit`) → `AuditRequest`. Both are zod-validated,
  honeypot-protected and rate limited (`lib/rate-limit.ts`, stored in Postgres).
  Submissions show at `/admin/leads` and `/admin/audits`.
- **Database access** is server-only: `lib/db.ts` imports `server-only`. Authorization rules
  (what replaced Supabase RLS) are listed in [docs/postgres-migration.md](docs/postgres-migration.md#2-authorization-what-replaces-rls).

## Database

### Migrations

Schema changes go in `prisma/schema.prisma`, then:

```bash
npm run db:migrate -- --name describe_the_change    # dev: writes prisma/migrations/<ts>_<name>
npm run db:migrate:deploy                           # staging/production
```

Commit the generated migration. Never edit an applied migration.

### Connection pooling

`lib/db-client.ts` opens one `pg` pool per app instance, configured from env:
`DB_POOL_MAX` (default 10), `DB_POOL_IDLE_TIMEOUT_MS`, `DB_CONNECT_TIMEOUT_MS`, and `DB_SSL`
(`disable` | `require` | `verify-full` with optional `DB_SSL_CA`).

Keep `DB_POOL_MAX × app instances` comfortably below Postgres `max_connections`. A single
long-running Node server needs nothing else.

**PgBouncer (optional)** helps when you run many instances or serverless functions. Run it in
**transaction** mode in front of Postgres, point `DATABASE_URL` at PgBouncer and keep
`DIRECT_URL` on the direct Postgres connection. Migrations need session features that
transaction pooling doesn't support, and the Prisma CLI uses `DIRECT_URL`.

### Backup and restore

Nightly logical backup (custom format, compressed, no owners/ACLs so it restores into any role):

```bash
pg_dump "$DIRECT_URL" --format=custom --no-owner --no-acl \
  --file="sh360-$(date -u +%Y%m%dT%H%M%SZ).dump"
```

Run it from cron or a systemd timer, copy the file off the server (e.g. to S3-compatible
storage), and keep at least 7 daily and 4 weekly copies. With the Docker setup:
`docker exec sh360-db pg_dump -U sh360 -Fc sh360 > sh360.dump`.

Restore into an **empty** database:

```bash
createdb -h <host> -U <user> sh360_restore
pg_restore --no-owner --no-acl --exit-on-error -d "postgresql://<user>:<pw>@<host>/sh360_restore" sh360-<ts>.dump
```

Test a restore regularly: restore into a scratch database, point a local `.env.local` at it
and run `npm run smoke`.

For point-in-time recovery, add WAL archiving (e.g. pgBackRest or WAL-G) on the server.

### Moving off Supabase

See [docs/postgres-migration.md](docs/postgres-migration.md) for the audit, the runbook
(dump, restore, row-count checks, rollback) and the cutover steps.

## Smoke test

```bash
npm run dev                                  # or npm run build && npm start
npm run smoke                                # BASE_URL=http://localhost:3000 by default
BASE_URL=http://localhost:3100 npm run smoke
```

Checks key pages, the sitemap, the plans and posts queries, the brief form (valid, invalid,
honeypot) and the audit form, then deletes the rows it created. It refuses to run against
speedhost360.com, or against a non-local `DATABASE_URL` unless `SMOKE_ALLOW_REMOTE_DB=1`.

## Deployment notes

- Set every variable from `.env.example` in the host's environment; `NEXT_PUBLIC_*` values are
  baked in at build time.
- Run `npm run db:migrate:deploy` before starting a new release.
- Rate limiting keys on the first `X-Forwarded-For` address. Only trust that behind a reverse
  proxy that overwrites it (nginx: `proxy_set_header X-Forwarded-For $remote_addr;`).
- Image uploads write to `public/uploads`, which needs a persistent disk; use object storage
  if you move to serverless.
