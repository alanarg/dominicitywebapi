import { CreateEmpenhoDto, UpdateEmpenhoDto } from "@/DTOs/empenho.dto";
import { Injectable } from "@nestjs/common";
import { EmpenhoRepository } from "./empenho.repository";

@Injectable()
export class EmpenhoService {
  constructor(private readonly repo: EmpenhoRepository) {}

  create(data: CreateEmpenhoDto) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: UpdateEmpenhoDto) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
