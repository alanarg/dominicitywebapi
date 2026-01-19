import { Injectable } from "@nestjs/common";
import { SecretariaRepository } from "./secretaria.repository";
import { Secretaria } from "@/models/secretaria";

@Injectable()
export class SecretariaService {
  constructor(private readonly repo: SecretariaRepository) {}

  create(data: Omit<Secretaria, 'secretaria_id'>) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  update(id: number, data: Partial<Secretaria>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
