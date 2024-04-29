import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CustomException } from '../../utilities/custom-exception.utility';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    const roleAlreadyExists = await this.rolesRepository.findOne({
      where: {
        name: createRoleDto.name,
      },
    });

    if (roleAlreadyExists) {
      throw new CustomException(
        'role_already_exists',
        'name',
        HttpStatus.BAD_REQUEST,
      );
    }

    const role = await this.rolesRepository.save(createRoleDto);

    return role;
  }
}
