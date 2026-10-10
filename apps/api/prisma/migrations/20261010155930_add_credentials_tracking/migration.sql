-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credentialsExpiresAt" TIMESTAMP(3),
ADD COLUMN     "credentialsSentAt" TIMESTAMP(3),
ADD COLUMN     "mustChangePassword" BOOLEAN NOT NULL DEFAULT false;
