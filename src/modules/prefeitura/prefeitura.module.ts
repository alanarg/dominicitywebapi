import { Module } from "@nestjs/common";
import { PrefeituraController } from "./prefeitura.controller";
import { PrefeituraService } from "./prefeitura.service";
import { PrefeituraRepository } from "./prefeitura.repository";

@Module({
  controllers: [PrefeituraController],
  providers: [PrefeituraService, PrefeituraRepository],
})
export class PrefeituraModule {}
