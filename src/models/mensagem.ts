export class Mensagem {
  constructor(
    public readonly mensagem_id: number,

    public assunto: string,
    public endereco: string,
    public cpf: string,
    public descricao: string,

    public ativo: boolean = true,
    public data_hora_inclusao: Date = new Date(),
    public data_hora_alteracao: Date = new Date(),
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }

  atualizarDados(
    dados: Partial<Omit<Mensagem, 'mensagem_id'>>
  ) {
    Object.assign(this, dados);
    this.data_hora_alteracao = new Date();
  }
}
