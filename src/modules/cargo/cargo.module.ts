import { Module } from "@nestjs/common";
import { CargoController } from "./cargo.controller";
import { CargoService } from "./cargo.service";
import { CargoRepository } from "./cargo.repository";

@Module({
  controllers: [CargoController],
  providers: [CargoService, CargoRepository],
})
export class CargoModule {}
