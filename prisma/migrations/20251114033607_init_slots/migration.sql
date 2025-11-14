/*
  Warnings:

  - Added the required column `updatedAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CancelledBy" AS ENUM ('PATIENT', 'DOCTOR');

-- DropIndex
DROP INDEX "Appointment_slotId_key";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "cancelledBy" "CancelledBy",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
