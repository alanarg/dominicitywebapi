/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `cargo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "cargo" DROP CONSTRAINT "fk_cargo_secretaria";

-- DropIndex
DROP INDEX "uq_cargo_secretaria_nome";

-- AlterTable
ALTER TABLE "cargo" ALTER COLUMN "secretaria_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "uq_cargo_secretaria_nome" ON "cargo"("nome");

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "fk_cargo_secretaria" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("secretaria_id") ON DELETE SET NULL ON UPDATE CASCADE;
