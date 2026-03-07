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
import { LoginDto } from '../DTOs/login.dto';
import { RegisterDto } from '../DTOs/cadastro.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.senha);
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
  updateUser(@Param('id') id: number, @Body() dto: RegisterDto) {
    return this.authService.updateUser(+id, dto);
  }
}
