import { Injectable } from "@nestjs/common";
import { CreateContratoDto, UpdateContratoDto } from "@/DTOs/contrato.dto";
import { ContratoRepository } from "./contrato.repository";

@Injectable()
export class ContratoService {
  constructor(private readonly repo: ContratoRepository) {}

  create(data: CreateContratoDto) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: UpdateContratoDto) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
