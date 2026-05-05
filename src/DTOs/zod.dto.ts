import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

export type DtoOf<TSchema extends z.ZodTypeAny> = z.infer<TSchema>;

export const optionalBooleanSchema = z.coerce.boolean().optional();
export const optionalDateSchema = z.coerce.date().optional();
export const optionalNullableIntSchema = z.coerce
  .number()
  .int()
  .nullable()
  .optional();

export function parseDto<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown,
): z.infer<TSchema> {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      campo: issue.path.join('.'),
      mensagem: issue.message,
    }));

    throw new BadRequestException({
      message: errors[0]?.mensagem ?? 'Dados invalidos',
      errors,
    });
  }

  return parsed.data;
}
