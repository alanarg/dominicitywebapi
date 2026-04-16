import { Injectable } from "@nestjs/common";
import { CreateLicitacaoDto, UpdateLicitacaoDto } from "@/DTOs/licitacao.dto";
import { LicitacaoRepository } from "./licitacao.repository";

@Injectable()
export class LicitacaoService {
  constructor(private readonly repo: LicitacaoRepository) {}

  create(data: CreateLicitacaoDto) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: UpdateLicitacaoDto) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
