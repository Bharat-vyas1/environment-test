import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, acceptedLanguage: string): Promise<{
        message: string;
    }>;
    getUserInfo(request: any): {
        user: any;
    };
}
