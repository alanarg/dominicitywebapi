export class Permissao {
  constructor(
    public readonly permissao_id: number,
    public usuario_id: number,
    public secretaria_id: number,
    public ativo: boolean,
    public data_hora_inclusao: Date,
    public data_hora_alteracao: Date,
  ) {}

  revogar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }
}
