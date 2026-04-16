import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {
  createLicitacaoDtoSchema,
  updateLicitacaoDtoSchema,
} from "@/DTOs/licitacao.dto";
import { parseDto } from "@/DTOs/zod.dto";
import { LicitacaoService } from "./licitacao.service";

@Controller('licitacao')
export class LicitacaoController {
  constructor(private readonly service: LicitacaoService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.service.create(parseDto(createLicitacaoDtoSchema, body));
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('licitacao/:id')
  findBySecretaria(@Param('id') id: number) {
    return this.service.findBySecretaria(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: unknown) {
    return this.service.update(+id, parseDto(updateLicitacaoDtoSchema, body));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
