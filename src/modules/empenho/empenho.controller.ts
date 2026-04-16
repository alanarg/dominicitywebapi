import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { createEmpenhoDtoSchema, updateEmpenhoDtoSchema } from "@/DTOs/empenho.dto";
import { parseDto } from "@/DTOs/zod.dto";
import { EmpenhoService } from "./empenho.service";

@Controller('empenho')
export class EmpenhoController {
  constructor(private readonly service: EmpenhoService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.service.create(parseDto(createEmpenhoDtoSchema, body));
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
    return this.service.update(+id, parseDto(updateEmpenhoDtoSchema, body));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
