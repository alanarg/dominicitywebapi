import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { empenho, Prisma } from '@prisma/client';

@Injectable()
export class EmpenhoRepository extends BaseRepository<
  empenho,
  Prisma.empenhoUncheckedCreateInput,
  Prisma.empenhoUncheckedUpdateInput,
  "empenho_id"
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.empenho,"empenho_id");
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
