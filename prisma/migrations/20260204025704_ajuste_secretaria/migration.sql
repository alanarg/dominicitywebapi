/*
  Warnings:

  - Added the required column `risco_divida` to the `secretaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `risco_orcamentario` to the `secretaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_empenhado` to the `secretaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_pago` to the `secretaria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ultima_atualizacao` to the `secretaria` table without a default value. This is not possible if the table is not empty.
  - Made the column `orcamento_total` on table `secretaria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "secretaria" ADD COLUMN     "risco_divida" VARCHAR(100) NOT NULL,
ADD COLUMN     "risco_orcamentario" VARCHAR(100) NOT NULL,
ADD COLUMN     "total_empenhado" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "total_pago" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "ultima_atualizacao" TIMESTAMP(6) NOT NULL,
ALTER COLUMN "orcamento_total" SET NOT NULL;

-- CreateTable
CREATE TABLE "secretaria_dados_anuais" (
    "id" SERIAL NOT NULL,
    "secretaria_id" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "orcamento_total" DECIMAL(15,2) NOT NULL,
    "total_empenhado" DECIMAL(15,2) NOT NULL,
    "total_pago" DECIMAL(15,2) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "secretaria_dados_anuais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "secretaria_dados_anuais_secretaria_id_ano_mes_key" ON "secretaria_dados_anuais"("secretaria_id", "ano", "mes");

-- AddForeignKey
ALTER TABLE "secretaria_dados_anuais" ADD CONSTRAINT "secretaria_dados_anuais_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("secretaria_id") ON DELETE RESTRICT ON UPDATE CASCADE;
