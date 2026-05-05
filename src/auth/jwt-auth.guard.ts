import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = unknown>(
    err: unknown,
    user: TUser,
    info: { message?: string } | undefined,
    _context: ExecutionContext,
  ) {
    if (err || !user) {
      throw err ?? new UnauthorizedException(info?.message ?? 'Token invalido ou ausente');
    }

    return user;
  }
}
