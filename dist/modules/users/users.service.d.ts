import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Roles } from '../role/entities/role.entity';
import { UserRoles } from '../role/entities/user-roles.entity';
export declare class UsersService {
    private usersRepository;
    private rolesRepository;
    private userRolesRepository;
    constructor(usersRepository: Repository<Users>, rolesRepository: Repository<Roles>, userRolesRepository: Repository<UserRoles>);
    create(createUserDto: CreateUserDto, acceptedLanguage: string): Promise<{
        message: string;
    }>;
}
