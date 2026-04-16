import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {
  createSecretariaDtoSchema,
  updateSecretariaDtoSchema,
} from "@/DTOs/secretaria.dto";
import { parseDto } from "@/DTOs/zod.dto";
import { SecretariaService } from "./secretaria.service";

@Controller('secretarias')
export class SecretariaController {
  constructor(private readonly service: SecretariaService) { }

  @Post()
  create(@Body() body: unknown) {
    return this.service.create(parseDto(createSecretariaDtoSchema, body));
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: unknown) {
    return this.service.update(+id, parseDto(updateSecretariaDtoSchema, body));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }

  @Get('valores/:id')
  findAllWithValues(@Param('id') id: number) {
    return this.service.buscarIncludeValores(+id);
  }

  @Get('withempenho')
  getWithEmpenho() {
    return this.service.buscarIncludeEmpenho();
  }
}
