import { Injectable } from "@nestjs/common";
import { CargoRepository } from "./cargo.repository";
import { Cargo } from "@/models/cargo";

@Injectable()
export class CargoService {
  constructor(private readonly repo: CargoRepository) {}

  create(data: Omit<Cargo, 'cargo_id'>) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: Partial<Cargo>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
