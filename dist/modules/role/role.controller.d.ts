import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    createRole(createRoleDto: CreateRoleDto): Promise<CreateRoleDto & import("./entities/role.entity").Roles>;
}
