import { Prisma } from '@prisma/client';

export class Secretaria {
  constructor(
    public readonly secretaria_id: number,
    public prefeitura_id: number,

    public nome: string,
    public sigla: string,
    public descricao: string,
    public cor: string,
    public icone: string,
    public href: string,

    public orcamento_total: Prisma.Decimal,
    public total_empenhado: Prisma.Decimal,
    public total_pago: Prisma.Decimal,

    public risco_orcamentario: string,
    public risco_divida: string,

    public sistema_integrado: string,
    public fonte_dos_dados: string,
    public ultima_atualizacao: Date,

    public ativo: boolean = true,
    public data_hora_inclusao: Date = new Date(),
    public data_hora_alteracao: Date = new Date(),
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }

  atualizarDados(dados: Partial<
    Pick<
      Secretaria,
      | 'nome'
      | 'descricao'
      | 'cor'
      | 'icone'
      | 'href'
      | 'orcamento_total'
      | 'sistema_integrado'
      | 'fonte_dos_dados'
    >
  >) {
    Object.assign(this, dados);
    this.data_hora_alteracao = new Date();
  }
}
