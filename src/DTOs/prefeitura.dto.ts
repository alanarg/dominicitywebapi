import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const createPrefeituraDtoSchema = z.object({
  nome: z.string().min(1).max(200),
  coord_x: z.coerce.number().nullable().optional(),
  coord_y: z.coerce.number().nullable().optional(),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updatePrefeituraDtoSchema = createPrefeituraDtoSchema.partial();

export type PrefeituraDTO = DtoOf<typeof createPrefeituraDtoSchema>;
export type CreatePrefeituraDto = DtoOf<typeof createPrefeituraDtoSchema>;
export type UpdatePrefeituraDto = DtoOf<typeof updatePrefeituraDtoSchema>;
