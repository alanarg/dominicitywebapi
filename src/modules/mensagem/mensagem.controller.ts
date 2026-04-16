import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {
  createMensagemDtoSchema,
  updateMensagemDtoSchema,
} from "@/DTOs/mensagem.dto";
import { parseDto } from "@/DTOs/zod.dto";
import { MensagemService } from "./mensagem.service";

@Controller('mensagems')
export class MensagemController {
  constructor(private readonly service: MensagemService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.service.create(parseDto(createMensagemDtoSchema, body));
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
    return this.service.update(+id, parseDto(updateMensagemDtoSchema, body));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
