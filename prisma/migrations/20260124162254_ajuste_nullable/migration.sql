/*
  Warnings:

  - Made the column `rubrica` on table `empenho` required. This step will fail if there are existing NULL values in that column.
  - Made the column `setor_contabil` on table `empenho` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projeto` on table `empenho` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fornecedor` on table `empenho` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contrato_id` on table `empenho` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fonte` on table `empenho` required. This step will fail if there are existing NULL values in that column.
  - Made the column `descricao` on table `secretaria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cor` on table `secretaria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icone` on table `secretaria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `href` on table `secretaria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sistema_integrado` on table `secretaria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fonte_dos_dados` on table `secretaria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "empenho" ALTER COLUMN "rubrica" SET NOT NULL,
ALTER COLUMN "setor_contabil" SET NOT NULL,
ALTER COLUMN "projeto" SET NOT NULL,
ALTER COLUMN "fornecedor" SET NOT NULL,
ALTER COLUMN "contrato_id" SET NOT NULL,
ALTER COLUMN "fonte" SET NOT NULL;

-- AlterTable
ALTER TABLE "secretaria" ALTER COLUMN "descricao" SET NOT NULL,
ALTER COLUMN "cor" SET NOT NULL,
ALTER COLUMN "icone" SET NOT NULL,
ALTER COLUMN "href" SET NOT NULL,
ALTER COLUMN "sistema_integrado" SET NOT NULL,
ALTER COLUMN "fonte_dos_dados" SET NOT NULL;
