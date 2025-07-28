-- AlterTable
ALTER TABLE "streams" ADD COLUMN     "isChatLinksAllowed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isChatProfanityFilter" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isChatSlowMode" BOOLEAN NOT NULL DEFAULT false;
