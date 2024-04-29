import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Sessions } from '../sessions/entities/session.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { decrypt } from '../../utilities/crypto.utility';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../decorators/public.decorator';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(Sessions)
    private sessionsRepository: Repository<Sessions>,

    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decryptedToken = decrypt(token);
      const payload = await this.jwtService.verifyAsync(decryptedToken, {
        secret: process.env.JWT_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const user = await this.usersRepository.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const session = await this.sessionsRepository.findOne({
        where: {
          device_name: payload.device_name,
        },
      });

      if (!session) {
        throw new UnauthorizedException();
      }

      request['user'] = user;
      request['session'] = session;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
