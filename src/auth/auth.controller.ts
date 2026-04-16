import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, loginDtoSchema } from '../DTOs/login.dto';
import { registerDtoSchema, updateUsuarioDtoSchema } from '../DTOs/cadastro.dto';
import { AuthGuard } from '@nestjs/passport';
import { parseDto } from '@/DTOs/zod.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: unknown) {
    return this.authService.register(parseDto(registerDtoSchema, dto));
  }

  @Post('login')
  login(@Body() dto: unknown) {
    const loginDto: LoginDto = parseDto(loginDtoSchema, dto);

    return this.authService.login(loginDto.email, loginDto.senha);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req) {
    return this.authService.me(req.user.sub);
  }

  @Get('users')
  users(@Req() req) {
    return this.authService.users();
  }

  @Get('users/:id')
  findBySecretaria(@Param('id') id: number) {
    return this.authService.findByUser(+id);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: number, @Body() dto: unknown) {
    return this.authService.updateUser(+id, parseDto(updateUsuarioDtoSchema, dto));
  }
}
