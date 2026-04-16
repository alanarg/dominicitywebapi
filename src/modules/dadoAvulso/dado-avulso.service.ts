import { Injectable } from "@nestjs/common";
import {
  CreateDadoAvulsoDto,
  UpdateDadoAvulsoDto,
} from "@/DTOs/dado-avulso.dto";
import { DadoAvulsoRepository } from "./dado-avulso.repository";
import { Prisma } from "@prisma/client";
import { TipoDadoAvulsoRepository } from "../tipoDadoAvulso/tipo-dado-avulso.repository";

@Injectable()
export class DadoAvulsoService {
  constructor(private readonly repo: DadoAvulsoRepository,private readonly tipoDadoAvulsoRepo: TipoDadoAvulsoRepository ) {}

  create(data: CreateDadoAvulsoDto) {
    return this.repo.create(data as Prisma.dado_avulsoUncheckedCreateInput);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.tipoDadoAvulsoRepo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: UpdateDadoAvulsoDto) {
    return this.repo.update(id, data as Prisma.dado_avulsoUncheckedUpdateInput);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
