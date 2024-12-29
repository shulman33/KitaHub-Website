/*
  Warnings:

  - You are about to drop the column `tyep` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `type` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "tyep",
ADD COLUMN     "type" "ResourceType" NOT NULL;
