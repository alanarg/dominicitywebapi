import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { perguntaInteligenciaEconomicaDtoSchema } from "@/DTOs/inteligencia-economica.dto";
import { parseDto } from "@/DTOs/zod.dto";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { InteligenciaEconomicaService } from "./inteligencia-economica.service";

@Controller("inteligencia-economica")
export class InteligenciaEconomicaController {
  constructor(private readonly service: InteligenciaEconomicaService) {}

  @Get("secretaria/:id")
  findBySecretaria(
    @Param("id", ParseIntPipe) id: number,
    @Query("windowDays") windowDays?: string,
  ) {
    const parsedWindowDays = windowDays ? Number(windowDays) : undefined;

    return this.service.findBySecretaria(id, parsedWindowDays);
  }

  @Post("perguntar")
  askQuestion(@Body() body: unknown) {
    const dto = parseDto(perguntaInteligenciaEconomicaDtoSchema, body);

    return this.service.askQuestion(
      dto.secretariaId,
      dto.pergunta,
      dto.windowDays,
    );
  }
}
