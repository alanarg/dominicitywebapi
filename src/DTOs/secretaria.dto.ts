import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const createSecretariaDtoSchema = z.object({
  prefeitura_id: z.coerce.number().int(),
  nome: z.string().min(1).max(200),
  sigla: z.string().min(1).max(20),
  descricao: z.string().min(1).max(500),
  cor: z.string().min(1).max(50),
  icone: z.string().min(1).max(50),
  href: z.string().min(1).max(200),
  orcamento_total: z.coerce.number(),
  total_empenhado: z.coerce.number(),
  total_pago: z.coerce.number(),
  risco_orcamentario: z.string().min(1).max(100),
  risco_divida: z.string().min(1).max(100),
  sistema_integrado: z.string().min(1).max(100),
  fonte_dos_dados: z.string().min(1).max(200),
  ultima_atualizacao: z.coerce.date(),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updateSecretariaDtoSchema = createSecretariaDtoSchema.partial();

export type SecretariaDTO = DtoOf<typeof createSecretariaDtoSchema>;
export type CreateSecretariaDto = DtoOf<typeof createSecretariaDtoSchema>;
export type UpdateSecretariaDto = DtoOf<typeof updateSecretariaDtoSchema>;
