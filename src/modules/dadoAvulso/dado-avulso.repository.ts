import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { Prisma, dado_avulso } from '@prisma/client';

@Injectable()
export class DadoAvulsoRepository extends BaseRepository<
  dado_avulso,
  Prisma.dado_avulsoUncheckedCreateInput,
  Prisma.dado_avulsoUncheckedUpdateInput,
  "dado_avulso_id"
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.dado_avulso,"dado_avulso_id");
  }

  findBySecretaria(secretaria_id: number) {
    return this.prisma.tipo_dado_avulso.findMany({
      where: {
        secretaria_id,
      },
      include: {
        dados_avulsos: {
          where: {
            secretaria_id,
          },
        },
      },
    });
  }
}
