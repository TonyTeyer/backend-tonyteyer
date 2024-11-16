import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(): string {
    return 'Esta es una ruta protegida';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
