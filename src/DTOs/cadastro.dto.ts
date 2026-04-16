import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const registerDtoSchema = z.object({
  nome: z.string().min(1).max(150),
  cpf: z.string().min(11).max(14),
  email: z.string().email().max(150),
  senha: z.string().min(1).max(550),
  cargo_id: z.coerce.number().int(),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updateUsuarioDtoSchema = registerDtoSchema.partial();

export type RegisterDto = DtoOf<typeof registerDtoSchema>;
export type UpdateUsuarioDto = DtoOf<typeof updateUsuarioDtoSchema>;
