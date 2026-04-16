import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {
  createTipoDadoAvulsoDtoSchema,
  updateTipoDadoAvulsoDtoSchema,
} from "@/DTOs/tipo-dado-avulso.dto";
import { parseDto } from "@/DTOs/zod.dto";
import { TipoDadoAvulsoService } from "./tipo-dado-avulso.service";

@Controller('tipo-dado-avulso')
export class TipoDadoAvulsoController {
  constructor(private readonly service: TipoDadoAvulsoService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.service.create(parseDto(createTipoDadoAvulsoDtoSchema, body));
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('secretaria/:id')
  findBySecretaria(@Param('id') id: number) {
    return this.service.findBySecretaria(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: unknown) {
    return this.service.update(+id, parseDto(updateTipoDadoAvulsoDtoSchema, body));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
