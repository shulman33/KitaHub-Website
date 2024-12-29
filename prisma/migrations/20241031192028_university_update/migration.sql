/*
  Warnings:

  - You are about to drop the column `city` on the `University` table. All the data in the column will be lost.
  - Added the required column `alphaTwoCode` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "University" DROP COLUMN "city",
ADD COLUMN     "alphaTwoCode" VARCHAR(2) NOT NULL,
ALTER COLUMN "state" DROP NOT NULL;
