import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ContratoService } from "./contrato.service";

@Controller('contrato')
export class ContratoController {
  constructor(private readonly service: ContratoService) {}

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('contrato/:id')
  findBySecretaria(@Param('id') id: number) {
    return this.service.findBySecretaria(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
