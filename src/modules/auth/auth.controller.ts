import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../decorators/public.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() request: Request) {
    return this.authService.login(request, loginDto);
  }

  @Public()
  @Get('access-token')
  getAccessToken(@Req() request: Request) {
    const refreshToken = request.headers?.authorization?.replace('Bearer ', '');

    return this.authService.getAccessToken(refreshToken);
  }
}
