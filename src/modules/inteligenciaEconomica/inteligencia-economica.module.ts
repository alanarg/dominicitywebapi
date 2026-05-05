import { Module } from "@nestjs/common";
import { AuthModule } from "@/auth/auth.module";
import { InteligenciaEconomicaController } from "./inteligencia-economica.controller";
import { InteligenciaEconomicaService } from "./inteligencia-economica.service";

@Module({
  imports: [AuthModule],
  controllers: [InteligenciaEconomicaController],
  providers: [InteligenciaEconomicaService],
})
export class InteligenciaEconomicaModule {}
