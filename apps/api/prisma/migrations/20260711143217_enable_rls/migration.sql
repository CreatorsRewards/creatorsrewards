-- This is an empty migration.-- Enable RLS on all tables (server uses service_role key which bypasses RLS)
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."SocialAccount" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."CampaignApplication" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Submission" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Brand" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Campaign" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Transaction" ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public."_prisma_migrations" ENABLE ROW LEVEL SECURITY;