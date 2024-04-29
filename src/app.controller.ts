import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getMicroserviceStatus(): string {
    return this.appService.getMicroserviceStatus();
  }

  @Public()
  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
