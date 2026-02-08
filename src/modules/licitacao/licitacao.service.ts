import { Injectable } from "@nestjs/common";
import { LicitacaoRepository } from "./licitacao.repository";
import { Licitacao } from "@/models/licitacao";

@Injectable()
export class LicitacaoService {
  constructor(private readonly repo: LicitacaoRepository) {}

  create(data: Omit<Licitacao, 'licitacao_id'>) {
    return this.repo.create(data);
  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: Partial<Licitacao>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
