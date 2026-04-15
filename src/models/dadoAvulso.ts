import { TipoDadoAvulso } from "./tipoDadoAvulso";

export class DadoAvulso {
  dado_avulso_id: number;

  secretaria_id?: number | null;
  tipo_dado_avulso_id: number;
  ano?: number | null;

  dados: unknown; // pode tipar melhor (vou te mostrar abaixo 👇)

  fonte?: string | null;

  criado_em: Date;
  atualizado_em: Date;

  // Relacionamentos
  tipo_dado_avulso?: TipoDadoAvulso | null;

  constructor(data: Partial<DadoAvulso>) {
    Object.assign(this, data);
  }
}