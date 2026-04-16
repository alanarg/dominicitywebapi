import { z } from 'zod';
import { DtoOf } from './zod.dto';

export const createDadoAvulsoDtoSchema = z.object({
  secretaria_id: z.coerce.number().int().nullable().optional(),
  tipo_dado_avulso_id: z.coerce.number().int(),
  ano: z.coerce.number().int().nullable().optional(),
  dados: z.unknown(),
  fonte: z.string().max(200).nullable().optional(),
  criado_em: z.coerce.date().optional(),
  atualizado_em: z.coerce.date().optional(),
});

export const updateDadoAvulsoDtoSchema = createDadoAvulsoDtoSchema.partial();

export type CreateDadoAvulsoDto = DtoOf<typeof createDadoAvulsoDtoSchema>;
export type UpdateDadoAvulsoDto = DtoOf<typeof updateDadoAvulsoDtoSchema>;
