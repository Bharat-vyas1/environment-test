import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMicroserviceStatus(): string {
    return 'Microservice is running!';
  }

  getHealth(): string {
    return 'Microservice is healthy!';
  }
}
