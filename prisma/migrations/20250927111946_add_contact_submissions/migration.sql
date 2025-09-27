/*
  Warnings:

  - You are about to drop the column `subject` on the `contact_submissions` table. All the data in the column will be lost.
  - Added the required column `projectType` to the `contact_submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_submissions" DROP COLUMN "subject",
ADD COLUMN     "projectType" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'new';
