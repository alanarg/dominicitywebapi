import { BaseRepository } from "@/common/repositories/base.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { secretaria } from "@prisma/client";

@Injectable()
export class SecretariaRepository extends BaseRepository<
  secretaria,
  Omit<secretaria, 'secretaria_id'>,
  Partial<secretaria>
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.secretaria);
  }

  findByPrefeitura(prefeitura_id: number) {
    return this.prisma.secretaria.findMany({
      where: { prefeitura_id, ativo: true },
    });
  }
}
