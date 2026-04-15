import { Module } from "@nestjs/common";
import { DadoAvulsoController } from "./dado-avulso.controller";
import { DadoAvulsoService } from "./dado-avulso.service";
import { DadoAvulsoRepository } from "./dado-avulso.repository";
import { TipoDadoAvulsoModule } from "../tipoDadoAvulso/tipo-dado-avulso.module";

@Module({
  imports: [TipoDadoAvulsoModule],
  controllers: [DadoAvulsoController],
  providers: [DadoAvulsoService, DadoAvulsoRepository],
})
export class DadoAvulsoModule {}
