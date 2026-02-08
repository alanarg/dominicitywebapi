-- CreateTable
CREATE TABLE "cargo" (
    "cargo_id" SERIAL NOT NULL,
    "secretaria_id" INTEGER NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("cargo_id")
);

-- CreateTable
CREATE TABLE "modulo" (
    "modulo_id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "url" VARCHAR(150) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modulo_pkey" PRIMARY KEY ("modulo_id")
);

-- CreateTable
CREATE TABLE "permissao" (
    "permissao_id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "secretaria_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissao_pkey" PRIMARY KEY ("permissao_id")
);

-- CreateTable
CREATE TABLE "permissao_modulo" (
    "permissao_modulo_id" SERIAL NOT NULL,
    "permissao_id" INTEGER NOT NULL,
    "modulo_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissao_modulo_pkey" PRIMARY KEY ("permissao_modulo_id")
);

-- CreateTable
CREATE TABLE "prefeitura" (
    "prefeitura_id" SERIAL NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "coord_x" DECIMAL(10,6),
    "coord_y" DECIMAL(10,6),
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prefeitura_pkey" PRIMARY KEY ("prefeitura_id")
);

-- CreateTable
CREATE TABLE "secretaria" (
    "secretaria_id" SERIAL NOT NULL,
    "prefeitura_id" INTEGER NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "sigla" VARCHAR(20) NOT NULL,
    "descricao" VARCHAR(500) NOT NULL,
    "cor" VARCHAR(20) NOT NULL,
    "icone" VARCHAR(50) NOT NULL,
    "href" VARCHAR(200) NOT NULL,
    "orcamento_total" DECIMAL(15,2),
    "sistema_integrado" VARCHAR(100) NOT NULL,
    "fonte_dos_dados" VARCHAR(200) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "secretaria_pkey" PRIMARY KEY ("secretaria_id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "usuario_id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "cargo_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "empenho" (
    "empenho_id" SERIAL NOT NULL,
    "secretaria_id" INTEGER NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "valor" DECIMAL(15,2) NOT NULL,
    "valor_pago" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "data" TIMESTAMP(3) NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "rubrica" VARCHAR(100) NOT NULL,
    "setor_contabil" VARCHAR(100) NOT NULL,
    "projeto" VARCHAR(100) NOT NULL,
    "fornecedor" VARCHAR(200) NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "fonte" VARCHAR(100) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_hora_inclusao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_hora_alteracao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empenho_pkey" PRIMARY KEY ("empenho_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_cargo_secretaria_nome" ON "cargo"("secretaria_id", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "modulo_nome_key" ON "modulo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "uq_permissao_usuario_secretaria" ON "permissao"("usuario_id", "secretaria_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_permissao_modulo" ON "permissao_modulo"("permissao_id", "modulo_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_key" ON "usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "cargo" ADD CONSTRAINT "fk_cargo_secretaria" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("secretaria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissao" ADD CONSTRAINT "fk_permissao_secretaria" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("secretaria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissao" ADD CONSTRAINT "fk_permissao_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissao_modulo" ADD CONSTRAINT "fk_perm_mod_modulo" FOREIGN KEY ("modulo_id") REFERENCES "modulo"("modulo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissao_modulo" ADD CONSTRAINT "fk_perm_mod_permissao" FOREIGN KEY ("permissao_id") REFERENCES "permissao"("permissao_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secretaria" ADD CONSTRAINT "fk_secretaria_prefeitura" FOREIGN KEY ("prefeitura_id") REFERENCES "prefeitura"("prefeitura_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "fk_usuario_cargo" FOREIGN KEY ("cargo_id") REFERENCES "cargo"("cargo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empenho" ADD CONSTRAINT "empenho_secretaria_id_fkey" FOREIGN KEY ("secretaria_id") REFERENCES "secretaria"("secretaria_id") ON DELETE RESTRICT ON UPDATE CASCADE;
