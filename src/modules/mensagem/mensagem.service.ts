import { Mensagem } from "@/models/mensagem";
import { Injectable } from "@nestjs/common";
import { MensagemRepository } from "./mensagem.repository";
import { SocketGateway } from "@/socket/socket.gateway";

@Injectable()
export class MensagemService {
  constructor(private readonly repo: MensagemRepository,
    private readonly socket: SocketGateway
  ) { }

  async create(data: Omit<Mensagem, 'mensagem_id'>) {
    const mensagem = await this.repo.create(data);

    this.socket.emitirAtualizacao({
      tipo: 'MENSAGEM_CRIADA',
      mensagemId: mensagem.mensagem_id,
      assunto: mensagem.assunto,
    });

    return mensagem;

  }

  findAll() {
    return this.repo.findAll();
  }

  findBySecretaria(secretaria_id: number) {
    return this.repo.findBySecretaria(secretaria_id);
  }

  update(id: number, data: Partial<Mensagem>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.softDelete(id);
  }
}
