-- CreateTable
CREATE TABLE "waitlist_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "location_city" TEXT,
    "location_country" TEXT DEFAULT 'Nigeria',
    "gender" TEXT,
    "primary_platform" TEXT NOT NULL,
    "instagram_handle" TEXT,
    "instagram_link" TEXT,
    "tiktok_handle" TEXT,
    "tiktok_link" TEXT,
    "youtube_handle" TEXT,
    "youtube_link" TEXT,
    "twitter_handle" TEXT,
    "twitter_link" TEXT,
    "facebook_handle" TEXT,
    "facebook_link" TEXT,
    "snapchat_handle" TEXT,
    "snapchat_link" TEXT,
    "creator_type" TEXT,
    "content_niches" TEXT[],
    "content_formats" TEXT[],
    "follower_range" TEXT,
    "bio" TEXT,
    "has_worked_with_brands" BOOLEAN DEFAULT false,
    "brand_count_estimate" TEXT,
    "preferred_deal_type" TEXT[],
    "referral_source" TEXT,
    "referral_code" TEXT,
    "status" TEXT DEFAULT 'pending',
    "admin_notes" TEXT,
    "waitlist_position" INTEGER,

    CONSTRAINT "waitlist_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_entries_email_key" ON "waitlist_entries"("email");

-- CreateIndex
CREATE INDEX "waitlist_entries_created_at_idx" ON "waitlist_entries"("created_at" DESC);

-- CreateIndex
CREATE INDEX "waitlist_entries_platform_idx" ON "waitlist_entries"("primary_platform");

-- CreateIndex
CREATE INDEX "waitlist_entries_status_idx" ON "waitlist_entries"("status");

