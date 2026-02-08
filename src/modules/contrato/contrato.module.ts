import { Module } from "@nestjs/common";
import { ContratoController } from "./contrato.controller";
import { ContratoService } from "./contrato.service";
import { ContratoRepository } from "./contrato.repository";


@Module({
  controllers: [ContratoController],
  providers: [ContratoService, ContratoRepository],
})
export class ContratoModule {}
