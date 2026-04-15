import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { tipo_dado_avulso, Prisma } from '@prisma/client';

@Injectable()
export class TipoDadoAvulsoRepository extends BaseRepository<
  tipo_dado_avulso,
  Prisma.tipo_dado_avulsoUncheckedCreateInput,
  Prisma.tipo_dado_avulsoUncheckedUpdateInput,
  "tipo_dado_avulso_id"
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.tipo_dado_avulso,"tipo_dado_avulso_id");
  }

  findBySecretaria(secretaria_id: number) {
    return this.model.findMany({
      where: {
        secretaria_id
      },
      include: {
        dados_avulsos: {},
      },
    });
  }
}
