/*
  Warnings:

  - You are about to drop the column `projectType` on the `contact_submissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contact_submissions" DROP COLUMN "projectType",
ADD COLUMN     "subject" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
