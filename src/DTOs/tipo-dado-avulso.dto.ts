import { z } from 'zod';
import { DtoOf } from './zod.dto';

export const createTipoDadoAvulsoDtoSchema = z.object({
  secretaria_id: z.coerce.number().int().nullable().optional(),
  nome: z.string().min(1).max(150),
  descricao: z.string().min(1).max(300),
});

export const updateTipoDadoAvulsoDtoSchema =
  createTipoDadoAvulsoDtoSchema.partial();

export type CreateTipoDadoAvulsoDto = DtoOf<
  typeof createTipoDadoAvulsoDtoSchema
>;
export type UpdateTipoDadoAvulsoDto = DtoOf<
  typeof updateTipoDadoAvulsoDtoSchema
>;
