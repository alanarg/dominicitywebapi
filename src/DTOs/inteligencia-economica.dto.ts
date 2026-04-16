import { z } from 'zod';
import { DtoOf } from './zod.dto';

export const perguntaInteligenciaEconomicaDtoSchema = z.object({
  secretariaId: z.coerce.number().int(),
  pergunta: z.string().min(1),
  windowDays: z.coerce.number().int().positive().optional(),
});

export type PerguntaInteligenciaEconomicaDto = DtoOf<
  typeof perguntaInteligenciaEconomicaDtoSchema
>;
