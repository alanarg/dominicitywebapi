export class Contrato {
  constructor(
    public readonly contrato_id: number,
    public licitacao_id: number | null,

    public numero: string,
    public objeto: string,
    public fornecedor: string,

    public valor_total: number,
    public data_vigencia: Date,

    public status: string,

    public ativo: boolean,
    public data_hora_inclusao: Date,
    public data_hora_alteracao: Date,
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }

  atualizarStatus(novoStatus: string) {
    this.status = novoStatus;
    this.data_hora_alteracao = new Date();
  }

  atualizarValor(novoValor: number) {
    this.valor_total = novoValor;
    this.data_hora_alteracao = new Date();
  }
}
