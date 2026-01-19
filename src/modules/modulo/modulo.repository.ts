import { BaseRepository } from "@/common/repositories/base.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { modulo } from "@prisma/client";

@Injectable()
export class ModuloRepository extends BaseRepository<
  modulo,
  Omit<modulo, 'modulo_id'>,
  Partial<modulo>
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.modulo);
  }
}
