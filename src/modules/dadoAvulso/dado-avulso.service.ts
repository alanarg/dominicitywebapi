import { Injectable } from "@nestjs/common";
import { Cargo } from "@/models/cargo";
import { DadoAvulsoRepository } from "./dado-avulso.repository";
import { dado_avulso, Prisma } from "@prisma/client";
import { TipoDadoAvulsoRepository } from "../tipoDadoAvulso/tipo-dado-avulso.repository";

@Injectable()
export class DadoAvulsoService {
  constructor(private readonly repo: DadoAvulsoRepository,private readonly tipoDadoAvulsoRepo: TipoDadoAvulsoRepository ) {}

  create(data: Prisma.dado_avulsoUncheckedCreateInput) {
    console.log(data);
    
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.tipoDadoAvulsoRepo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: Partial<Cargo>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
