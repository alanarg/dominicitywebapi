import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const createCargoDtoSchema = z.object({
  secretaria_id: z.coerce.number().int().nullable().optional(),
  nome: z.string().min(1).max(150),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updateCargoDtoSchema = createCargoDtoSchema.partial();

export type CargoDTO = DtoOf<typeof createCargoDtoSchema>;
export type CreateCargoDto = DtoOf<typeof createCargoDtoSchema>;
export type UpdateCargoDto = DtoOf<typeof updateCargoDtoSchema>;
