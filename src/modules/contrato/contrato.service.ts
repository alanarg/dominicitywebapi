import { Injectable } from "@nestjs/common";
import { ContratoRepository } from "./contrato.repository";
import { Contrato } from "@/models/contrato";

@Injectable()
export class ContratoService {
  constructor(private readonly repo: ContratoRepository) {}

  create(data: Omit<Contrato, 'contrato_id'>) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: Partial<Contrato>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
