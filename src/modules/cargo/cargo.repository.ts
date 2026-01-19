import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { cargo, Prisma } from '@prisma/client';

@Injectable()
export class CargoRepository extends BaseRepository<
  cargo,
  Prisma.cargoUncheckedCreateInput,
  Prisma.cargoUncheckedUpdateInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.cargo);
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
