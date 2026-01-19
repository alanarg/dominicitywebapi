import { BaseRepository } from "@/common/repositories/base.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { permissao_modulo } from "@prisma/client";

@Injectable()
export class PermissaoModuloRepository extends BaseRepository<
  permissao_modulo,
  Omit<permissao_modulo, 'permissao_modulo_id'>,
  Partial<permissao_modulo>
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.permissao_modulo);
  }
}
