import { PrismaService } from '@/prisma/prisma.service';

export abstract class BaseRepository<T, CreateDto, UpdateDto,  ID extends string> {
  protected constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: any,
     private readonly idField: ID
  ) {}

  create(data: CreateDto): Promise<T> {
    return this.model.create({ data });
  }

  findAll(): Promise<T[]> {
    return this.model.findMany({ where: { ativo: true } });
  }

  findById(id: number): Promise<T | null> {
    return this.model.findUnique({ where: { [this.idField]:id } });
  }

  update(id: number, data: UpdateDto): Promise<T> {
    return this.model.update({
      where: { [this.idField]:id },
      data,
    });
  }

  softDelete(id: number): Promise<T> {
    return this.model.update({
      where: { [this.idField]:id },
      data: {
        ativo: false,
        data_hora_alteracao: new Date(),
      },
    });
  }
}
