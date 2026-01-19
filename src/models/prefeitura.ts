import { Decimal } from "@prisma/client/runtime/library";

export class Prefeitura {
  constructor(
    public readonly prefeitura_id: number,
    public nome: string,
    public coord_x:  null | Decimal,
    public coord_y:  null | Decimal,
    public ativo: boolean,
    public data_hora_inclusao: Date,
    public data_hora_alteracao: Date,
  ) {}

  desativar() {
    this.ativo = false;
    this.data_hora_alteracao = new Date();
  }
}
