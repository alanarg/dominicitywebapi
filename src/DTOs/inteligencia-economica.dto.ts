import { z } from 'zod';
import { DtoOf } from './zod.dto';

export const perguntaInteligenciaEconomicaDtoSchema = z
  .object({
    secretariaId: z.unknown().optional(),
    pergunta: z.unknown().optional(),
    windowDays: z.unknown().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.secretariaId === undefined ||
      data.secretariaId === null ||
      `${data.secretariaId}`.trim() === ''
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['secretariaId'],
        message: 'secretariaId obrigatorio',
      });
    } else if (!Number.isFinite(Number(data.secretariaId))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['secretariaId'],
        message: 'secretariaId deve ser numerico',
      });
    } else if (!Number.isInteger(Number(data.secretariaId)) || Number(data.secretariaId) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['secretariaId'],
        message: 'secretariaId deve ser um numero inteiro maior que zero',
      });
    }

    if (
      data.windowDays === undefined ||
      data.windowDays === null ||
      `${data.windowDays}`.trim() === ''
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['windowDays'],
        message: 'windowDays obrigatorio',
      });
    } else if (!Number.isFinite(Number(data.windowDays))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['windowDays'],
        message: 'windowDays deve ser numerico',
      });
    } else if (!Number.isInteger(Number(data.windowDays)) || Number(data.windowDays) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['windowDays'],
        message: 'windowDays deve ser um numero inteiro maior que zero',
      });
    }

    if (typeof data.pergunta !== 'string' || data.pergunta.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['pergunta'],
        message: 'pergunta obrigatoria e nao pode ser vazia',
      });
    }
  })
  .transform((data) => ({
    secretariaId: Number(data.secretariaId),
    pergunta: String(data.pergunta).trim(),
    windowDays: Number(data.windowDays),
  }));

export type PerguntaInteligenciaEconomicaDto = DtoOf<
  typeof perguntaInteligenciaEconomicaDtoSchema
>;
