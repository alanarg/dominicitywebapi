import { Module } from "@nestjs/common";
import { LicitacaoController } from "./licitacao.controller";
import { LicitacaoService } from "./licitacao.service";
import { LicitacaoRepository } from "./licitacao.repository";


@Module({
  controllers: [LicitacaoController],
  providers: [LicitacaoService, LicitacaoRepository],
})
export class LicitacaoModule {}
