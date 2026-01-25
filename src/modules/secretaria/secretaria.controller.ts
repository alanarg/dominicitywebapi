import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SecretariaService } from "./secretaria.service";

@Controller('secretarias')
export class SecretariaController {
  constructor(private readonly service: SecretariaService) {}

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
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
