import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Sessions } from '../sessions/entities/session.entity';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
export declare class AuthGuard implements CanActivate {
    private usersRepository;
    private sessionsRepository;
    private jwtService;
    private reflector;
    constructor(usersRepository: Repository<Users>, sessionsRepository: Repository<Sessions>, jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
