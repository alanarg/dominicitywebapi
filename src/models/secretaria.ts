export class Secretaria {
  constructor(
    public readonly secretaria_id: number,
    public prefeitura_id: number,
    public nome: string,
    public sigla: string,
    public ativo: boolean,
    public data_hora_inclusao: Date,
    public data_hora_alteracao: Date,
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }
}
