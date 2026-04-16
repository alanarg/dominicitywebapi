import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const createModuloDtoSchema = z.object({
  nome: z.string().min(1).max(150),
  url: z.string().min(1).max(150),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updateModuloDtoSchema = createModuloDtoSchema.partial();

export type CreateModuloDto = DtoOf<typeof createModuloDtoSchema>;
export type UpdateModuloDto = DtoOf<typeof updateModuloDtoSchema>;
