/*
  Warnings:

  - Made the column `gender` on table `Athlete` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Athlete" ALTER COLUMN "gender" SET NOT NULL;
