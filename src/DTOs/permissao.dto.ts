import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const createPermissaoDtoSchema = z.object({
  usuario_id: z.coerce.number().int(),
  secretaria_id: z.coerce.number().int(),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updatePermissaoDtoSchema = createPermissaoDtoSchema.partial();

export type CreatePermissaoDto = DtoOf<typeof createPermissaoDtoSchema>;
export type UpdatePermissaoDto = DtoOf<typeof updatePermissaoDtoSchema>;
