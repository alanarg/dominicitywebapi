import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PrefeituraModule } from './modules/prefeitura/prefeitura.module';
import { SecretariaModule } from './modules/secretaria/secretaria.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { PermissaoModuloRepository } from './modules/permisssaoModulo/permissao-modulo.repository';
import { MailModule } from './modules/mail/mail.module';
import { SocketModule } from './socket/socket.module';
import { MensagemModule } from './modules/mensagem/mensagem.module';
import { ContratoModule } from './modules/contrato/contrato.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, PrefeituraModule, SecretariaModule, CargoModule, MailModule,SocketModule, MensagemModule, ContratoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
