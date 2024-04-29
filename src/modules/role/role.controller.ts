import { Controller, Post, Body } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Public } from '../../decorators/public.decorator';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }
}
