import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { cargo, Prisma } from '@prisma/client';

@Injectable()
export class LicitacaoRepository extends BaseRepository<
  cargo,
  Prisma.licitacaoUncheckedCreateInput,
  Prisma.licitacaoUncheckedUpdateInput,
  "licitacao_id"
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.licitacao,"licitacao_id");
  }

  findBySecretaria(secretaria_id: number) {
    return this.model.findMany({
      where: {
        secretaria_id,
        ativo: true,
      },
    });
  }

  
}
