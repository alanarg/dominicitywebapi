import { BaseRepository } from "@/common/repositories/base.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { usuario } from "@prisma/client";

@Injectable()
export class UsuarioRepository extends BaseRepository<
  usuario,
  Omit<usuario, 'usuario_id'>,
  Partial<usuario>
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.usuario);
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}
