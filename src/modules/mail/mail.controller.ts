import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('cadastro')
  async enviarCadastro(
    @Body() body: { email: string; senha: string },
  ) {
    await this.mailService.enviarEmailCadastro(
      body.email,
      body.senha,
    );

    return { ok: true };
  }
}
