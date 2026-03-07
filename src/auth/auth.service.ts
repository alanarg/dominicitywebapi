import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: any) {
    const senhaHash = await bcrypt.hash(data.senha, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nome: data.nome,
        cpf: data.cpf.replace(/\D/g, ''),
        email: data.email,
        senha: senhaHash,
        cargo_id: data.cargo_id,
      },
    });

    return {
      usuario_id: usuario.usuario_id,
      email: usuario.email,
    };
  }

  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      include: {
        cargo: {
          select: {
            cargo_id: true,
            nome: true,
            secretaria: {
              select: {
                secretaria_id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: usuario.usuario_id,
      email: usuario.email,
      nome: usuario.nome,

      cargo: usuario.cargo
        ? {
            id: usuario.cargo.cargo_id,
            nome: usuario.cargo.nome,
          }
        : null,

      secretaria: usuario.cargo?.secretaria
        ? {
            id: usuario.cargo.secretaria.secretaria_id,
            nome: usuario.cargo.secretaria.nome,
          }
        : null,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async users() {
    const usuarios = await this.prisma.usuario.findMany({
      where: {},
      include: {
        cargo: {
          include: {
            secretaria: true,
          },
        },
      },
    });

    return usuarios;
  }

  async me(usuario_id: number) {
    return this.prisma.usuario.findUnique({
      where: { usuario_id },
      select: {
        usuario_id: true,
        nome: true,
        email: true,
        ativo: true,
      },
    });
  }
  async updateUser(userId: number, dto: any) {
    return this.prisma.usuario.update({
      where: {
        usuario_id: userId,
      },
      data: {
        ...dto,
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.usuario.findMany({
      where: {
        usuario_id: userId,
      },
      include: {
        cargo: {
          include: {
            secretaria: true,
          },
        },
      },
    });
  }
}
