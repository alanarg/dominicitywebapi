import { BaseRepository } from "@/common/repositories/base.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { secretaria } from "@prisma/client";
import _ from 'lodash';


@Injectable()
export class SecretariaRepository extends BaseRepository<
  secretaria,
  Omit<secretaria, 'secretaria_id'>,
  Partial<secretaria>,
  'secretaria_id'
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.secretaria, 'secretaria_id');
  }

  findByPrefeitura(prefeitura_id: number) {
    return this.prisma.secretaria.findMany({
      where: { prefeitura_id, ativo: true },
    });
  }


  buscarIncludeAllValues(id: number) {
    return this.prisma.secretaria.findUnique({
      where: {
        secretaria_id: id,
      },
      include: {
        empenho: {
          include: {
            contrato: {
              include: {
                licitacao: true
              }
            },
          },
        },
      },
    });

  }

  buscarIncludeEmpenho(){
    return this.prisma.secretaria.findMany({
      where: {  },
      include:{
        empenho:true
      }
    });
  }
}
