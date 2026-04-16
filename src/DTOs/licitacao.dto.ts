import { z } from 'zod';
import {
  DtoOf,
  optionalBooleanSchema,
  optionalDateSchema,
  optionalNullableIntSchema,
} from './zod.dto';

export const createLicitacaoDtoSchema = z.object({
  secretaria_id: optionalNullableIntSchema,
  numero: z.string().min(1).max(50),
  objeto: z.string().min(1).max(300),
  modalidade: z.string().min(1).max(100),
  valor_estimado: z.coerce.number(),
  status: z.string().min(1).max(300),
  data_abertura: z.coerce.date(),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updateLicitacaoDtoSchema = createLicitacaoDtoSchema.partial();

export type CreateLicitacaoDto = DtoOf<typeof createLicitacaoDtoSchema>;
export type UpdateLicitacaoDto = DtoOf<typeof updateLicitacaoDtoSchema>;
