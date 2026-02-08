import { Empenho } from "@/models/empenho";
import { Injectable } from "@nestjs/common";
import { EmpenhoRepository } from "./empenho.repository";

@Injectable()
export class EmpenhoService {
  constructor(private readonly repo: EmpenhoRepository) {}

  create(data: Omit<Empenho, 'empenho_id'>) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: Partial<Empenho>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
