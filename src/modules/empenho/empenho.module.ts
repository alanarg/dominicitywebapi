import { Module } from "@nestjs/common";
import { EmpenhoController } from "./empenho.controller";
import { EmpenhoService } from "./empenho.service";
import { EmpenhoRepository } from "./empenho.repository";


@Module({
  controllers: [EmpenhoController],
  providers: [EmpenhoService, EmpenhoRepository],
})
export class EmpenhoModule {}
