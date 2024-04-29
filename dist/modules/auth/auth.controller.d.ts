import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, request: Request): Promise<{
        id: string;
        name: string;
        phone: string;
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    getAccessToken(request: Request): Promise<{
        access_token: string;
    }>;
}
