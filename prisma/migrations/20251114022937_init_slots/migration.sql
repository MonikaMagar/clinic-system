/*
  Warnings:

  - The primary key for the `Slot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_slotId_fkey";

-- DropIndex
DROP INDEX "Slot_doctorId_date_startTime_endTime_key";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "slotId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Slot" DROP CONSTRAINT "Slot_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT,
ADD CONSTRAINT "Slot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Slot_id_seq";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "Slot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
