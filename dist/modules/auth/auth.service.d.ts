import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Sessions } from '../sessions/entities/session.entity';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export declare class AuthService {
    private usersRepository;
    private sessionsRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<Users>, sessionsRepository: Repository<Sessions>, jwtService: JwtService);
    login(request: Request, loginDto: LoginDto): Promise<{
        id: string;
        name: string;
        phone: string;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getAccessToken(refreshToken: string): Promise<{
        access_token: string;
    }>;
}
