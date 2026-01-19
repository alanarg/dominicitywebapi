import { Injectable } from "@nestjs/common";
import { PrefeituraRepository } from "./prefeitura.repository";
import { Prefeitura } from "@/models/prefeitura";

@Injectable()
export class PrefeituraService {
  constructor(private readonly repo: PrefeituraRepository) {}

  create(data: Omit<Prefeitura, 'prefeitura_id'>) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  update(id: number, data: Partial<Prefeitura>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
