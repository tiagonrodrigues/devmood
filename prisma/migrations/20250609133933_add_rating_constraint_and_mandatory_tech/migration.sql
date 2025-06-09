/*
  Warnings:

  - You are about to alter the column `rating` on the `Mood` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - Made the column `tech` on table `Mood` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mood" ALTER COLUMN "rating" SET DATA TYPE SMALLINT,
ALTER COLUMN "tech" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Mood_rating_idx" ON "Mood"("rating");

-- CreateIndex
CREATE INDEX "Mood_tech_idx" ON "Mood"("tech");


