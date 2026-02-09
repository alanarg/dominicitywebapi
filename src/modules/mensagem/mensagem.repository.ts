import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { BaseRepository } from '@/common/repositories/base.repository';
import { mensagem, Prisma } from '@prisma/client';

@Injectable()
export class MensagemRepository extends BaseRepository<
  mensagem,
  Prisma.mensagemUncheckedCreateInput,
  Prisma.mensagemUncheckedUpdateInput,
  "mensagem_id"
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.mensagem,"mensagem_id");
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
