import { Body, Controller, Post } from '@nestjs/common';
import { enviarCadastroEmailDtoSchema } from '@/DTOs/mail.dto';
import { parseDto } from '@/DTOs/zod.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('cadastro')
  async enviarCadastro(@Body() body: unknown) {
    const dto = parseDto(enviarCadastroEmailDtoSchema, body);

    await this.mailService.enviarEmailCadastro(
      dto.email,
      dto.senha,
    );

    return { ok: true };
  }
}
