import { DadoAvulso } from "./dadoAvulso";
import { Secretaria } from "./secretaria";

export class TipoDadoAvulso {
  tipo_dado_avulso_id: number;
  secretaria_id?: number | null;
  nome: string;
  descricao: string;

  // Relacionamentos
  dados_avulsos?: DadoAvulso[];
  secretaria?: Secretaria | null;

  constructor(data: Partial<TipoDadoAvulso>) {
    Object.assign(this, data);
  }
}