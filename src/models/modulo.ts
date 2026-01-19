export class Modulo {
  constructor(
    public readonly modulo_id: number,
    public nome: string,
    public url: string,
    public ativo: boolean,
    public data_hora_inclusao: Date,
    public data_hora_alteracao: Date,
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }
}
