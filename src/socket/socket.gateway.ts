// src/socket/socket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // depois você restringe
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  // Evento simples
  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: any) {
    return { event: 'pong', data };
  }

  // Emitir para TODOS
  emitirAtualizacao(payload: any) {
    this.server.emit('atualizacao', payload);
  }
}
