/*
  Warnings:

  - Made the column `category` on table `Athlete` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Athlete" ALTER COLUMN "category" SET NOT NULL;
