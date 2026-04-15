import { Module } from "@nestjs/common";
import { InteligenciaEconomicaController } from "./inteligencia-economica.controller";
import { InteligenciaEconomicaService } from "./inteligencia-economica.service";

@Module({
  controllers: [InteligenciaEconomicaController],
  providers: [InteligenciaEconomicaService],
})
export class InteligenciaEconomicaModule {}
