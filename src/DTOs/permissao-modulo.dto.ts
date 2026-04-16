import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const createPermissaoModuloDtoSchema = z.object({
  permissao_id: z.coerce.number().int(),
  modulo_id: z.coerce.number().int(),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updatePermissaoModuloDtoSchema =
  createPermissaoModuloDtoSchema.partial();

export type CreatePermissaoModuloDto = DtoOf<
  typeof createPermissaoModuloDtoSchema
>;
export type UpdatePermissaoModuloDto = DtoOf<
  typeof updatePermissaoModuloDtoSchema
>;
