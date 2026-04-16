import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {
  createDadoAvulsoDtoSchema,
  updateDadoAvulsoDtoSchema,
} from "@/DTOs/dado-avulso.dto";
import { parseDto } from "@/DTOs/zod.dto";
import { DadoAvulsoService } from "./dado-avulso.service";

@Controller('dado-avulso')
export class DadoAvulsoController {
  constructor(private readonly service: DadoAvulsoService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.service.create(parseDto(createDadoAvulsoDtoSchema, body));
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
    return this.service.update(+id, parseDto(updateDadoAvulsoDtoSchema, body));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
