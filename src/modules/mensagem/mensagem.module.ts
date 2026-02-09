import { Module } from "@nestjs/common";
import { MensagemController } from "./mensagem.controller";
import { MensagemService } from "./mensagem.service";
import { MensagemRepository } from "./mensagem.repository";
import { SocketModule } from "@/socket/socket.module";

@Module({
  imports: [
    SocketModule, // ✅ AGORA O NEST ENXERGA O GATEWAY
  ],
  controllers: [MensagemController],
  providers: [MensagemService, MensagemRepository],
})
export class MensagemModule {}
