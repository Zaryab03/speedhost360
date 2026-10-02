-- CreateTable
CREATE TABLE "HostingPlan" (
    "slug" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "priceIsFrom" BOOLEAN NOT NULL DEFAULT false,
    "billingPeriod" TEXT NOT NULL,
    "renewalPrice" TEXT NOT NULL,
    "websitesIncluded" TEXT NOT NULL,
    "storageGb" TEXT NOT NULL,
    "bandwidth" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "cpu" TEXT NOT NULL,
    "databases" TEXT NOT NULL,
    "emailAccounts" TEXT NOT NULL,
    "backupFrequency" TEXT NOT NULL,
    "backupRetentionDays" TEXT NOT NULL,
    "monitoringLevel" TEXT NOT NULL,
    "supportTier" TEXT NOT NULL,
    "supportResponseTime" TEXT NOT NULL,
    "migrationIncluded" TEXT NOT NULL,
    "staging" TEXT NOT NULL,
    "sshAccess" TEXT NOT NULL,
    "cdn" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "bestFor" TEXT NOT NULL,
    "mostPopular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostingPlan_pkey" PRIMARY KEY ("slug")
);

-- CreateIndex
CREATE INDEX "HostingPlan_service_sortOrder_idx" ON "HostingPlan"("service", "sortOrder");
