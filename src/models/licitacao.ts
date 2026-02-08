export class Licitacao {
  constructor(
    public readonly licitacao_id: number,
    public secretaria_id: number | null,

    public numero: string,
    public objeto: string,
    public modalidade: string,

    public valor_estimado: number,

    public status: string,
    public data_abertura: Date,

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
}
