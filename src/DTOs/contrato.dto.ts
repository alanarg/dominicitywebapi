import { z } from 'zod';
import {
  DtoOf,
  optionalBooleanSchema,
  optionalDateSchema,
  optionalNullableIntSchema,
} from './zod.dto';

export const createContratoDtoSchema = z.object({
  licitacao_id: optionalNullableIntSchema,
  numero: z.string().min(1).max(50),
  objeto: z.string().min(1).max(300),
  fornecedor: z.string().min(1).max(200),
  valor_total: z.coerce.number(),
  data_vigencia: z.coerce.date(),
  status: z.string().min(1).max(300),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updateContratoDtoSchema = createContratoDtoSchema.partial();

export type CreateContratoDto = DtoOf<typeof createContratoDtoSchema>;
export type UpdateContratoDto = DtoOf<typeof updateContratoDtoSchema>;
