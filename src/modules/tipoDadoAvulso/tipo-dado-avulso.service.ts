import { Injectable } from "@nestjs/common";
import {
  CreateTipoDadoAvulsoDto,
  UpdateTipoDadoAvulsoDto,
} from "@/DTOs/tipo-dado-avulso.dto";
import { TipoDadoAvulsoRepository } from "./tipo-dado-avulso.repository";

@Injectable()
export class TipoDadoAvulsoService {
  constructor(private readonly repo: TipoDadoAvulsoRepository) {}

  create(data: CreateTipoDadoAvulsoDto) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: UpdateTipoDadoAvulsoDto) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
