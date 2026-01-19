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
        cpf: data.cpf,
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
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
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
}
