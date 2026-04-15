import { Module } from "@nestjs/common";
import { TipoDadoAvulsoController } from "./tipo-dado-avulso.controller";
import { TipoDadoAvulsoService } from "./tipo-dado-avulso.service";
import { TipoDadoAvulsoRepository } from "./tipo-dado-avulso.repository";

@Module({
  controllers: [TipoDadoAvulsoController],
  providers: [TipoDadoAvulsoService, TipoDadoAvulsoRepository],
  exports: [TipoDadoAvulsoRepository],
})
export class TipoDadoAvulsoModule {}
