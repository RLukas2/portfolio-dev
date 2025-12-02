/*
  Warnings:

  - You are about to drop the column `skill_id` on the `endorsements` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `guestbook` table. All the data in the column will be lost.
  - You are about to drop the column `skill_category_id` on the `skills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[skillId,userId]` on the table `endorsements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentId,sessionId,type]` on the table `reactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentId,sessionId]` on the table `views` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `content_meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `content_meta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillId` to the `endorsements` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `endorsements` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `guestbook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `skill_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('POST', 'PROJECT', 'SHORT', 'PAGE');

-- CreateEnum
CREATE TYPE "TestimonialStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "endorsements" DROP CONSTRAINT "endorsements_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "endorsements" DROP CONSTRAINT "endorsements_userId_fkey";

-- DropForeignKey
ALTER TABLE "skills" DROP CONSTRAINT "skills_skill_category_id_fkey";

-- DropIndex
DROP INDEX "endorsements_skill_id_idx";

-- DropIndex
DROP INDEX "skills_skill_category_id_idx";

-- AlterTable
ALTER TABLE "content_meta" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "title" TEXT,
ADD COLUMN     "type" "ContentType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "endorsements" DROP COLUMN "skill_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "skillId" BIGINT NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "guestbook" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "reactions" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "shares" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "skill_categories" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "skills" DROP COLUMN "skill_category_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "skillCategoryId" BIGINT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "views" ADD COLUMN     "country" VARCHAR(2),
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "ipAddress" VARCHAR(45),
ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- CreateTable
CREATE TABLE "testimonials" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "message" TEXT NOT NULL,
    "relationship" VARCHAR(50) NOT NULL,
    "project" VARCHAR(255),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "TestimonialStatus" NOT NULL DEFAULT 'PENDING',
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "reported" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "testimonials_userId_idx" ON "testimonials"("userId");

-- CreateIndex
CREATE INDEX "testimonials_featured_idx" ON "testimonials"("featured");

-- CreateIndex
CREATE INDEX "testimonials_status_idx" ON "testimonials"("status");

-- CreateIndex
CREATE INDEX "testimonials_rating_idx" ON "testimonials"("rating");

-- CreateIndex
CREATE INDEX "testimonials_createdAt_idx" ON "testimonials"("createdAt");

-- CreateIndex
CREATE INDEX "testimonials_deletedAt_idx" ON "testimonials"("deletedAt");

-- CreateIndex
CREATE INDEX "testimonials_featured_createdAt_idx" ON "testimonials"("featured", "createdAt");

-- CreateIndex
CREATE INDEX "content_meta_type_idx" ON "content_meta"("type");

-- CreateIndex
CREATE INDEX "content_meta_published_idx" ON "content_meta"("published");

-- CreateIndex
CREATE INDEX "content_meta_publishedAt_idx" ON "content_meta"("publishedAt");

-- CreateIndex
CREATE INDEX "content_meta_deletedAt_idx" ON "content_meta"("deletedAt");

-- CreateIndex
CREATE INDEX "endorsements_skillId_idx" ON "endorsements"("skillId");

-- CreateIndex
CREATE INDEX "endorsements_deletedAt_idx" ON "endorsements"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "endorsements_skillId_userId_key" ON "endorsements"("skillId", "userId");

-- CreateIndex
CREATE INDEX "guestbook_createdAt_idx" ON "guestbook"("createdAt");

-- CreateIndex
CREATE INDEX "guestbook_deletedAt_idx" ON "guestbook"("deletedAt");

-- CreateIndex
CREATE INDEX "reactions_sessionId_idx" ON "reactions"("sessionId");

-- CreateIndex
CREATE INDEX "reactions_type_idx" ON "reactions"("type");

-- CreateIndex
CREATE INDEX "reactions_createdAt_idx" ON "reactions"("createdAt");

-- CreateIndex
CREATE INDEX "reactions_deletedAt_idx" ON "reactions"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_contentId_sessionId_type_key" ON "reactions"("contentId", "sessionId", "type");

-- CreateIndex
CREATE INDEX "shares_sessionId_idx" ON "shares"("sessionId");

-- CreateIndex
CREATE INDEX "shares_type_idx" ON "shares"("type");

-- CreateIndex
CREATE INDEX "shares_createdAt_idx" ON "shares"("createdAt");

-- CreateIndex
CREATE INDEX "shares_deletedAt_idx" ON "shares"("deletedAt");

-- CreateIndex
CREATE INDEX "skill_categories_deletedAt_idx" ON "skill_categories"("deletedAt");

-- CreateIndex
CREATE INDEX "skills_skillCategoryId_idx" ON "skills"("skillCategoryId");

-- CreateIndex
CREATE INDEX "skills_deletedAt_idx" ON "skills"("deletedAt");

-- CreateIndex
CREATE INDEX "views_sessionId_idx" ON "views"("sessionId");

-- CreateIndex
CREATE INDEX "views_createdAt_idx" ON "views"("createdAt");

-- CreateIndex
CREATE INDEX "views_country_idx" ON "views"("country");

-- CreateIndex
CREATE INDEX "views_deletedAt_idx" ON "views"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "views_contentId_sessionId_key" ON "views"("contentId", "sessionId");

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_skillCategoryId_fkey" FOREIGN KEY ("skillCategoryId") REFERENCES "skill_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endorsements" ADD CONSTRAINT "endorsements_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endorsements" ADD CONSTRAINT "endorsements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
