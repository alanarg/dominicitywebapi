import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class JsonExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.getStatus(exception);
    const errorResponse = this.getErrorResponse(exception);

    response
      .status(status)
      .type('application/json')
      .json(errorResponse);
  }

  private getStatus(exception: unknown) {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    if (this.isJsonSyntaxError(exception)) {
      return HttpStatus.BAD_REQUEST;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorResponse(exception: unknown) {
    if (exception instanceof HttpException) {
      const payload = exception.getResponse();

      if (typeof payload === 'string') {
        return { message: payload };
      }

      if (payload && typeof payload === 'object') {
        const message = this.extractMessage(payload);
        const errors = Array.isArray((payload as { errors?: unknown[] }).errors)
          ? (payload as { errors: unknown[] }).errors
          : undefined;

        return errors ? { message, errors } : { message };
      }
    }

    if (this.isJsonSyntaxError(exception)) {
      return { message: 'JSON invalido' };
    }

    return { message: 'Erro interno do servidor' };
  }

  private extractMessage(payload: object) {
    const message = (payload as { message?: string | string[] }).message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }

    return 'Erro inesperado';
  }

  private isJsonSyntaxError(
    exception: unknown,
  ): exception is SyntaxError & { body?: unknown } {
    return exception instanceof SyntaxError && 'body' in exception;
  }
}
