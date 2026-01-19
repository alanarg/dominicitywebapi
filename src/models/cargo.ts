export class Cargo {
  constructor(
    public readonly cargo_id: number,
    public secretaria_id: number,
    public nome: string,
    public ativo: boolean,
    public data_hora_inclusao: Date,
    public data_hora_alteracao: Date,
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }
}
