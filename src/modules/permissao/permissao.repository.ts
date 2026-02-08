import { BaseRepository } from "@/common/repositories/base.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { permissao } from "@prisma/client";

@Injectable()
export class PermissaoRepository extends BaseRepository<
  permissao,
  Omit<permissao, 'permissao_id'>,
  Partial<permissao>,
  'permissao_id'
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.permissao,'permissao_id');
  }
}
