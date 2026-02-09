-- CreateTable
CREATE TABLE "mensagem" (
    "mensagem_id" SERIAL NOT NULL,
    "assunto" VARCHAR(150) NOT NULL,
    "endereco" VARCHAR(300) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "descricao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mensagem_pkey" PRIMARY KEY ("mensagem_id")
);

-- CreateIndex
CREATE INDEX "mensagem_cpf_idx" ON "mensagem"("cpf");

-- CreateIndex
CREATE INDEX "mensagem_assunto_idx" ON "mensagem"("assunto");
