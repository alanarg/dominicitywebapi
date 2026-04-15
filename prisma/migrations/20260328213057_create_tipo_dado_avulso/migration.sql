/*
  Warnings:

  - You are about to drop the column `tipo` on the `dado_avulso` table. All the data in the column will be lost.
  - Added the required column `tipo_dado_avulso_id` to the `dado_avulso` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dado_avulso" DROP CONSTRAINT "dado_avulso_secretaria_id_fkey";

-- DropIndex
DROP INDEX "dado_avulso_secretaria_id_idx";

-- DropIndex
DROP INDEX "dado_avulso_tipo_idx";

-- AlterTable
ALTER TABLE "dado_avulso" DROP COLUMN "tipo",
ADD COLUMN     "tipo_dado_avulso_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "tipo_dado_avulso" (
    "tipo_dado_avulso_id" SERIAL NOT NULL,
    "secretaria_id" INTEGER,
    "nome" VARCHAR(150) NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,

    CONSTRAINT "tipo_dado_avulso_pkey" PRIMARY KEY ("tipo_dado_avulso_id")
);

-- CreateIndex
CREATE INDEX "tipo_dado_avulso_secretaria_id_idx" ON "tipo_dado_avulso"("secretaria_id");

-- CreateIndex
CREATE INDEX "dado_avulso_tipo_dado_avulso_id_idx" ON "dado_avulso"("tipo_dado_avulso_id");

-- AddForeignKey
ALTER TABLE "tipo_dado_avulso" ADD CONSTRAINT "tipo_dado_avulso_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("secretaria_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dado_avulso" ADD CONSTRAINT "dado_avulso_tipo_dado_avulso_id_fkey" FOREIGN KEY ("tipo_dado_avulso_id") REFERENCES "tipo_dado_avulso"("tipo_dado_avulso_id") ON DELETE RESTRICT ON UPDATE CASCADE;
