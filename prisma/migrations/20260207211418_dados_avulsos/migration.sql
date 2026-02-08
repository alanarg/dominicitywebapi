-- CreateTable
CREATE TABLE "dado_avulso" (
    "dado_avulso_id" SERIAL NOT NULL,
    "secretaria_id" INTEGER,
    "tipo" VARCHAR(100) NOT NULL,
    "ano" INTEGER,
    "dados" JSONB NOT NULL,
    "fonte" VARCHAR(200),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dado_avulso_pkey" PRIMARY KEY ("dado_avulso_id")
);

-- CreateIndex
CREATE INDEX "dado_avulso_tipo_idx" ON "dado_avulso"("tipo");

-- CreateIndex
CREATE INDEX "dado_avulso_secretaria_id_idx" ON "dado_avulso"("secretaria_id");

-- CreateIndex
CREATE INDEX "dado_avulso_ano_idx" ON "dado_avulso"("ano");

-- AddForeignKey
ALTER TABLE "dado_avulso" ADD CONSTRAINT "dado_avulso_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("secretaria_id") ON DELETE SET NULL ON UPDATE CASCADE;
