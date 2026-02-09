import { Injectable } from "@nestjs/common";
import { SecretariaRepository } from "./secretaria.repository";
import { Secretaria } from "@/models/secretaria";
import _ from 'lodash';

@Injectable()
export class SecretariaService {
  constructor(private readonly repo: SecretariaRepository) { }

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

  async buscarIncludeValores(id: number) {
    var result = await this.repo.buscarIncludeAllValues(id);

    return await this.traduzirSecretaria(result);
  }

  async buscarIncludeEmpenho() {
    return await this.repo.buscarIncludeEmpenho();

  }

  traduzirSecretaria(resultado: any) {
  const secretaria = _.omit(resultado, ['empenho']);

  const empenhos = resultado.empenho;

  const contratos = _(resultado.empenho)
    .map('contrato')
    .filter(Boolean)
    .uniqBy('contrato_id')
    .value();

  const licitacoes = _(resultado.empenho)
    .map('contrato.licitacao')
    .filter(Boolean)
    .uniqBy('licitacao_id')
    .value();

  return {
    secretaria,
    empenhos,
    contratos,
    licitacoes,
  };
}

}
