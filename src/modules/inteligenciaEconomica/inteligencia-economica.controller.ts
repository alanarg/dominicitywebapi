import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
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
  askQuestion(
    @Body()
    body: {
      secretariaId: number;
      pergunta: string;
      windowDays?: number;
    },
  ) {
    return this.service.askQuestion(
      Number(body.secretariaId),
      body.pergunta,
      body.windowDays ? Number(body.windowDays) : undefined,
    );
  }
}
