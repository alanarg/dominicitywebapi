import { BaseRepository } from "@/common/repositories/base.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { prefeitura } from "@prisma/client";

@Injectable()
export class PrefeituraRepository extends BaseRepository<
  prefeitura,
  Omit<prefeitura, 'prefeitura_id'>,
  Partial<prefeitura>
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.prefeitura);
  }
}
