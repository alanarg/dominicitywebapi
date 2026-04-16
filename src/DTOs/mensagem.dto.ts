import { z } from 'zod';
import { DtoOf, optionalBooleanSchema, optionalDateSchema } from './zod.dto';

export const createMensagemDtoSchema = z.object({
  assunto: z.string().min(1).max(150),
  endereco: z.string().min(1).max(300),
  cpf: z.string().min(1).max(14),
  descricao: z.string().min(1),
  ativo: optionalBooleanSchema,
  data_hora_inclusao: optionalDateSchema,
  data_hora_alteracao: optionalDateSchema,
});

export const updateMensagemDtoSchema = createMensagemDtoSchema.partial();

export type CreateMensagemDto = DtoOf<typeof createMensagemDtoSchema>;
export type UpdateMensagemDto = DtoOf<typeof updateMensagemDtoSchema>;
