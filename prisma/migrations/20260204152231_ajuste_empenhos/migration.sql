-- AlterTable
ALTER TABLE "empenho" ALTER COLUMN "status" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "contrato_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "licitacao" (
    "licitacao_id" SERIAL NOT NULL,
    "numero" VARCHAR(50) NOT NULL,
    "objeto" VARCHAR(300) NOT NULL,
    "modalidade" VARCHAR(100) NOT NULL,
    "valor_estimado" DECIMAL(15,2) NOT NULL,
    "status" VARCHAR(300) NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "licitacao_pkey" PRIMARY KEY ("licitacao_id")
);

-- CreateTable
CREATE TABLE "contrato" (
    "contrato_id" SERIAL NOT NULL,
    "licitacao_id" INTEGER,
    "numero" VARCHAR(50) NOT NULL,
    "objeto" VARCHAR(300) NOT NULL,
    "fornecedor" VARCHAR(200) NOT NULL,
    "valor_total" DECIMAL(15,2) NOT NULL,
    "data_vigencia" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(300) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contrato_pkey" PRIMARY KEY ("contrato_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "licitacao_numero_key" ON "licitacao"("numero");

-- CreateIndex
CREATE INDEX "licitacao_status_idx" ON "licitacao"("status");

-- CreateIndex
CREATE INDEX "licitacao_data_abertura_idx" ON "licitacao"("data_abertura");

-- CreateIndex
CREATE UNIQUE INDEX "contrato_numero_key" ON "contrato"("numero");

-- CreateIndex
CREATE INDEX "contrato_status_idx" ON "contrato"("status");

-- CreateIndex
CREATE INDEX "contrato_data_vigencia_idx" ON "contrato"("data_vigencia");

-- CreateIndex
CREATE INDEX "empenho_secretaria_id_idx" ON "empenho"("secretaria_id");

-- CreateIndex
CREATE INDEX "empenho_contrato_id_idx" ON "empenho"("contrato_id");

-- CreateIndex
CREATE INDEX "empenho_status_idx" ON "empenho"("status");

-- CreateIndex
CREATE INDEX "empenho_data_idx" ON "empenho"("data");

-- CreateIndex
CREATE INDEX "empenho_data_vencimento_idx" ON "empenho"("data_vencimento");

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_licitacao_id_fkey" FOREIGN KEY ("licitacao_id") REFERENCES "licitacao"("licitacao_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empenho" ADD CONSTRAINT "empenho_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("contrato_id") ON DELETE SET NULL ON UPDATE CASCADE;
