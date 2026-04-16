import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const createEmpenhoDtoSchema = z.object({
  secretaria_id: z.coerce.number().int(),
  contrato_id: z.coerce.number().int().nullable().optional(),
  descricao: z.string().min(1).max(300),
  valor: z.coerce.number(),
  valor_pago: z.coerce.number().optional(),
  data: z.coerce.date(),
  data_vencimento: z.coerce.date(),
  status: z.string().min(1).max(300),
  rubrica: z.string().min(1).max(100),
  setor_contabil: z.string().min(1).max(100),
  projeto: z.string().min(1).max(100),
  fornecedor: z.string().min(1).max(200),
  fonte: z.string().min(1).max(100),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updateEmpenhoDtoSchema = createEmpenhoDtoSchema.partial();

export type CreateEmpenhoDto = DtoOf<typeof createEmpenhoDtoSchema>;
export type UpdateEmpenhoDto = DtoOf<typeof updateEmpenhoDtoSchema>;
