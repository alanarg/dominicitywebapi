import { Injectable } from "@nestjs/common";
import { Cargo } from "@/models/cargo";
import { TipoDadoAvulsoRepository } from "./tipo-dado-avulso.repository";
import { TipoDadoAvulso } from "@/models/tipoDadoAvulso";
import { tipo_dado_avulso } from "@prisma/client";

@Injectable()
export class TipoDadoAvulsoService {
  constructor(private readonly repo: TipoDadoAvulsoRepository) {}

  create(data: Omit<tipo_dado_avulso, 'tipo_dado_avulso_id'>) {
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
