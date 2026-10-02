# Supabase → self-managed PostgreSQL

Runbook for moving the production database off Supabase onto a plain
PostgreSQL server. **Nothing here has been run against production.** Every
command is for you to run, in order, during a planned window.

## 1. Audit: what Supabase was actually used for

Searched the codebase, `package.json`/`package-lock.json` and migrations
(October 2026):

| Supabase feature | Used? | Replacement |
|---|---|---|
| `@supabase/*` packages / supabase-js | No | n/a |
| Supabase Auth (`auth.users`, `auth.uid()`) | No | Already Auth.js (credentials) + local `User` table, `lib/auth.ts` |
| Storage buckets | No | Already local disk, `public/uploads` (`app/api/admin/upload`) |
| Realtime | No | n/a |
| Edge functions / RPC | No | n/a (all server logic is Next.js route handlers) |
| RLS policies | No | n/a; see section 2 for the server-side checks that do the job |
| Triggers / SQL functions | No | n/a |
| Extensions | None used by the schema | IDs are `cuid()` generated in the app, so no `pgcrypto`/`uuid-ossp` needed |
| Supabase connection pooler | Yes (`DATABASE_URL` with `?pgbouncer=true`) | `pg.Pool` in `lib/db-client.ts`; PgBouncer optional (README) |

So Supabase was only a hosted Postgres. The migration is a **data move**,
not a code rewrite. Run section 3a against production to confirm that
nothing was added through the Supabase dashboard outside the Prisma
migrations.

## 2. Authorization (what replaces RLS)

No RLS policies existed. With no `anon`/`authenticated` roles, the only
protection is server code. Every database access goes through `lib/db.ts`,
which imports `server-only`, so the client can't be bundled for the
browser. The rules are:

| Data | Who may read / write | Enforced in |
|---|---|---|
| `Lead` | Public: create only (brief form). Admin: read, update status, delete | `app/api/contact/route.ts` (zod, honeypot, rate limit); `app/admin/(dashboard)/leads/page.tsx` and `app/api/admin/leads/[id]/route.ts` check `auth()` |
| `AuditRequest` | Public: create only (audit form). Admin: read, update status, delete | `app/api/audit/route.ts`; `app/admin/(dashboard)/audits/page.tsx` and `app/api/admin/audits/[id]/route.ts` check `auth()` |
| `Post` | Public: read `PUBLISHED` only. Admin: full CRUD | `lib/blog.ts` filters `status: "PUBLISHED"`; `app/api/admin/posts/**` check `auth()` |
| `User` | Never exposed; read only by the login flow | `lib/auth.ts` (bcrypt compare) |
| `HostingPlan` | Public read; writes only by seed or SQL | `lib/plans.ts` (read-only); `prisma/seed.ts` |
| `RateLimitBucket` | Server only | `lib/rate-limit.ts` |
| Uploads | Admin only | `app/api/admin/upload/route.ts` checks `auth()` |

The admin layout (`app/admin/(dashboard)/layout.tsx`) also redirects
unauthenticated users. All queries use Prisma (parameterized). The single
raw query, in `lib/rate-limit.ts`, uses tagged-template parameters.

## 3. Runbook

Set these in your shell. Never commit them.

```bash
# Supabase: use the DIRECT or session-mode (port 5432) connection, not the
# transaction pooler on 6543 (pg_dump needs a real session).
export SUPABASE_DB_URL='postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=require'
# New server
export NEW_DB_URL='postgresql://sh360:<password>@<new-host>:5432/sh360'
```

Use a `pg_dump` whose major version is **≥ the Supabase server version**.
Check it with `psql "$SUPABASE_DB_URL" -Atc 'show server_version'`. If your local
client is older, run it from Docker, e.g. `docker run --rm -it postgres:17 pg_dump ...`.

### 3a. Pre-flight checks (read-only)

```bash
# Server versions
psql "$SUPABASE_DB_URL" -Atc 'show server_version'
psql "$NEW_DB_URL"      -Atc 'show server_version'

# Tables in public (expect: Lead, Post, User, _prisma_migrations)
psql "$SUPABASE_DB_URL" -c '\dt public.*'

# Anything Supabase-specific attached to public? All should return 0 rows.
psql "$SUPABASE_DB_URL" -c "select schemaname, tablename, policyname from pg_policies where schemaname = 'public';"
psql "$SUPABASE_DB_URL" -c "select relname from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r' and c.relrowsecurity;"
psql "$SUPABASE_DB_URL" -c "select tgname, tgrelid::regclass from pg_trigger t join pg_class c on c.oid = t.tgrelid join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and not t.tgisinternal;"
psql "$SUPABASE_DB_URL" -c "select p.proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public';"
psql "$SUPABASE_DB_URL" -c "select conrelid::regclass, conname, confrelid::regclass from pg_constraint where contype = 'f' and connamespace = 'public'::regnamespace and confrelid::regclass::text like '%.%';"

# Which migrations has production applied? (expect at least 20260917085102_init)
psql "$SUPABASE_DB_URL" -c 'select migration_name, finished_at from public."_prisma_migrations" order by started_at;'

# Schema drift between production and the Prisma migrations (read-only).
# Anything listed beyond the new tables/columns was added outside Prisma.
DIRECT_URL="$SUPABASE_DB_URL" npx prisma migrate diff \
  --from-config-datasource --to-schema prisma/schema.prisma

# Keep a reference copy of the production public schema (no owners/ACLs)
pg_dump "$SUPABASE_DB_URL" --schema=public --schema-only --no-owner --no-acl \
  --no-comments -f supabase_public_schema.sql

# Extensions: the schema needs none. Confirm the target has the usual ones
# available in case you add uuid defaults later.
psql "$NEW_DB_URL" -c "select name, default_version, installed_version from pg_available_extensions where name in ('pgcrypto', 'uuid-ossp');"
```

If any of the "should return 0 rows" checks return rows, stop and review
before continuing. Something was created outside the Prisma migrations.

### 3b. Create the schema on the new server

The schema comes from the versioned Prisma migrations, not from the
Supabase dump. That way no Supabase roles, policies, grants or `auth.*` /
`storage.*` references can carry over.

```bash
DATABASE_URL="$NEW_DB_URL" DIRECT_URL="$NEW_DB_URL" npx prisma migrate deploy
psql "$NEW_DB_URL" -c '\dt public.*'
# Expect: AuditRequest, HostingPlan, Lead, Post, RateLimitBucket, User, _prisma_migrations
```

### 3c. Copy the data

Do this at the start of your window. Note the time, because leads submitted
after it are handled in 3e.

```bash
date -u +"%Y-%m-%dT%H:%M:%SZ" | tee dump_started_at.txt

pg_dump "$SUPABASE_DB_URL" \
  --data-only --schema=public \
  --exclude-table='public."_prisma_migrations"' \
  --no-owner --no-acl \
  -f supabase_public_data.sql

# Load in one transaction: all or nothing.
psql "$NEW_DB_URL" -v ON_ERROR_STOP=1 --single-transaction -f supabase_public_data.sql
```

`pg_dump` writes `COPY "Lead" (col, col, ...)` with explicit column lists.
Columns added since (`Lead.plan`, `Lead.timeline`) are nullable and simply
stay NULL for old rows.

Then seed the hosting plans. Leave the admin variables empty, because the
`User` rows were just copied over:

```bash
DATABASE_URL="$NEW_DB_URL" DIRECT_URL="$NEW_DB_URL" \
  ADMIN_SEED_EMAIL= ADMIN_SEED_PASSWORD= npm run db:seed
```

### 3d. Verify row counts

```bash
for t in Lead Post User; do
  src=$(psql "$SUPABASE_DB_URL" -Atc "select count(*) from public.\"$t\"")
  dst=$(psql "$NEW_DB_URL"      -Atc "select count(*) from public.\"$t\"")
  ids_src=$(psql "$SUPABASE_DB_URL" -Atc "select md5(coalesce(string_agg(id, ',' order by id), '')) from public.\"$t\"")
  ids_dst=$(psql "$NEW_DB_URL"      -Atc "select md5(coalesce(string_agg(id, ',' order by id), '')) from public.\"$t\"")
  printf '%-6s source=%-6s target=%-6s ids_match=%s\n' "$t" "$src" "$dst" "$([ "$ids_src" = "$ids_dst" ] && echo yes || echo NO)"
done
psql "$NEW_DB_URL" -Atc 'select count(*) from public."HostingPlan"'   # expect 4
```

Every table must show equal counts and `ids_match=yes`. If not, do not
switch. Investigate first (see Rollback).

### 3e. Switch the app

1. Set production env: `DATABASE_URL` and `DIRECT_URL` to the new server.
   Add `DB_SSL=require` (or `verify-full` + `DB_SSL_CA`) if it isn't on a
   private network, plus `DB_POOL_MAX`.
2. Deploy and restart.
3. Copy over any leads that arrived on Supabase after the dump started:

   ```bash
   since=$(cat dump_started_at.txt)
   psql "$SUPABASE_DB_URL" -c "\copy (select * from public.\"Lead\" where \"createdAt\" >= '$since') to 'late_leads.csv' csv header"
   # Inspect late_leads.csv, then load it; the header row gives the column
   # order (quoted, since the columns are camelCase):
   cols=$(head -1 late_leads.csv | sed 's/[^,]*/"&"/g')
   psql "$NEW_DB_URL" -c "\copy public.\"Lead\"($cols) from 'late_leads.csv' csv header"
   ```

4. Check by hand: submit the brief form and the audit form on the live site
   with a test email, confirm both appear in `/admin/leads` and
   `/admin/audits`, then delete them there. The smoke script refuses to run
   against speedhost360.com on purpose.

### Rollback

Supabase is never written to by this runbook, so it remains a complete
copy as of the dump.

- **Before step 3e:** nothing to undo. Drop and recreate the new database
  if you want a clean retry.
- **After step 3e:** point `DATABASE_URL`/`DIRECT_URL` back at Supabase and
  redeploy. The current code expects the new tables and columns. Either
  redeploy the last commit before these changes, or first run the additive
  migrations against Supabase:
  `DIRECT_URL="$SUPABASE_DB_URL" npx prisma migrate deploy`.
  Then copy back any `Lead`/`AuditRequest` rows created on the new server
  since the switch, using the same `\copy` approach as 3e.3.

Keep the Supabase project, paused but not deleted, until the new server
has run cleanly through at least one full backup and restore cycle.

## 4. After cutover

- Backups: see README, "Backup and restore". Test a restore.
- Remove the Supabase connection strings from every environment and secret
  store, then rotate the Supabase database password.
- Delete `supabase_public_data.sql`, `late_leads.csv` and the other dump files
  from wherever you ran this. They contain customer contact details.
