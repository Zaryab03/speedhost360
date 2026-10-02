import bcrypt from "bcryptjs";
import { createPrismaClient } from "../lib/db-client";
import { hostingPlans, isPending } from "../lib/data/plans";

const prisma = createPrismaClient();

// Upserts every plan from lib/data/plans.ts. Unconfirmed values are stored
// as the literal "TODO_CONFIRM" so they stay greppable in the database too.
async function seedPlans() {
  for (const [sortOrder, plan] of hostingPlans.entries()) {
    const data = { ...plan, sortOrder };
    await prisma.hostingPlan.upsert({
      where: { slug: plan.slug },
      update: data,
      create: data,
    });
  }

  const pending = hostingPlans.flatMap((plan) =>
    Object.entries(plan)
      .filter(([, value]) => isPending(value))
      .map(([key]) => `${plan.slug}.${key}`)
  );
  console.log(`Seeded ${hostingPlans.length} hosting plans (${pending.length} TODO_CONFIRM values).`);
}

async function seedAdmin() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  const name = process.env.ADMIN_SEED_NAME ?? "Admin";

  if (!email || !password) {
    console.log("Skipping admin user: ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD not set.");
    return;
  }
  if (password.length < 12) {
    throw new Error("ADMIN_SEED_PASSWORD must be at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });

  console.log(`Seeded admin user: ${user.email}`);
}

async function main() {
  await seedPlans();
  await seedAdmin();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
