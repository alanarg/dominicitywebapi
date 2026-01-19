import { Module } from "@nestjs/common";
import { SecretariaController } from "./secretaria.controller";
import { SecretariaService } from "./secretaria.service";
import { SecretariaRepository } from "./secretaria.repository";

@Module({
  controllers: [SecretariaController],
  providers: [SecretariaService, SecretariaRepository],
})
export class SecretariaModule {}
