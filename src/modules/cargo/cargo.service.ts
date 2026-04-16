import { Injectable } from "@nestjs/common";
import { CreateCargoDto, UpdateCargoDto } from "@/DTOs/cargo.dto";
import { CargoRepository } from "./cargo.repository";

@Injectable()
export class CargoService {
  constructor(private readonly repo: CargoRepository) {}

  create(data: CreateCargoDto) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: UpdateCargoDto) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
