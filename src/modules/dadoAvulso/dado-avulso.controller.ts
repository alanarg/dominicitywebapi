import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DadoAvulsoService } from "./dado-avulso.service";

@Controller('dado-avulso')
export class DadoAvulsoController {
  constructor(private readonly service: DadoAvulsoService) {}

  @Post()
  create(@Body() body) {
    console.log(body);
    
    return this.service.create(body);
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
  update(@Param('id') id: number, @Body() body) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
