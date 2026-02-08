-- AlterTable
ALTER TABLE "licitacao" ADD COLUMN     "secretaria_id" INTEGER;

-- AddForeignKey
ALTER TABLE "licitacao" ADD CONSTRAINT "licitacao_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("secretaria_id") ON DELETE SET NULL ON UPDATE CASCADE;
