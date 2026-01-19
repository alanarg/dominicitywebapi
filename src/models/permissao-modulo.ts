export class PermissaoModulo {
  constructor(
    public readonly permissao_modulo_id: number,
    public permissao_id: number,
    public modulo_id: number,
    public ativo: boolean,
    public data_hora_inclusao: Date,
    public data_hora_alteracao: Date,
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }
}
