import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Roles>);
    createRole(createRoleDto: CreateRoleDto): Promise<CreateRoleDto & Roles>;
}
