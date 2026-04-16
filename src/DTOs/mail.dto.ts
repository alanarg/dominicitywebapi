import { z } from 'zod';
import { DtoOf } from './zod.dto';

export const enviarCadastroEmailDtoSchema = z.object({
  email: z.string().email().max(150),
  senha: z.string().min(1).max(550),
});

export type EnviarCadastroEmailDto = DtoOf<
  typeof enviarCadastroEmailDtoSchema
>;
