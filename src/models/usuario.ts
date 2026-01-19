export class Usuario {
  constructor(
    public readonly usuario_id: number,
    public nome: string,
    public cpf: string,
    public email: string,
    public senha: string,
    public cargo_id: number,
    public ativo: boolean,
    public data_hora_inclusao: Date,
    public data_hora_alteracao: Date,
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }

  alterarSenha(novaSenhaHash: string) {
    this.senha = novaSenhaHash;
    this.data_hora_alteracao = new Date();
  }
}
