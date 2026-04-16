import { Injectable } from "@nestjs/common";
import { CreatePrefeituraDto, UpdatePrefeituraDto } from "@/DTOs/prefeitura.dto";
import { PrefeituraRepository } from "./prefeitura.repository";

@Injectable()
export class PrefeituraService {
  constructor(private readonly repo: PrefeituraRepository) {}

  create(data: CreatePrefeituraDto) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  update(id: number, data: UpdatePrefeituraDto) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
