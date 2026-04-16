import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PrefeituraService } from "./prefeitura.service";
import {
  createPrefeituraDtoSchema,
  updatePrefeituraDtoSchema,
} from "@/DTOs/prefeitura.dto";
import { parseDto } from "@/DTOs/zod.dto";

@Controller('prefeituras')
export class PrefeituraController {
  constructor(private readonly service: PrefeituraService) {}

  @Post()
  create(@Body() body: unknown) {
    return this.service.create(parseDto(createPrefeituraDtoSchema, body));
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }


  @Put(':id')
  update(@Param('id') id: number, @Body() body: unknown) {
    return this.service.update(+id, parseDto(updatePrefeituraDtoSchema, body));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
