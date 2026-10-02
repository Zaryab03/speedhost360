-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "plan" TEXT,
ADD COLUMN     "timeline" TEXT;

-- CreateTable
CREATE TABLE "AuditRequest" (
    "id" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "focusAreas" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuditRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuditRequest_status_createdAt_idx" ON "AuditRequest"("status", "createdAt");
