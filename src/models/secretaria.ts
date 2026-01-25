import { Prisma } from '@prisma/client';

export class Secretaria {
  constructor(
    public readonly secretaria_id: number,
    public prefeitura_id: number,

    public sigla: string ,
    public nome: string ,

    public descricao: string ,
    public cor: string ,
    public icone: string ,
    public href: string ,

    // 👇 agora compatível com Prisma
    public orcamento_total: Prisma.Decimal ,

    public sistema_integrado: string ,
    public fonte_dos_dados: string ,

    public ativo: boolean = true,
    public data_hora_inclusao: Date = new Date(),
    public data_hora_alteracao: Date = new Date(),
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }

  atualizarDados(dados: Partial<Omit<Secretaria, 'secretaria_id'>>) {
    Object.assign(this, dados);
    this.data_hora_alteracao = new Date();
  }
}
