import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashPassword } from '../../utilities/bcrypt.utility';
import { Roles } from '../role/entities/role.entity';
import { UserRoles } from '../role/entities/user-roles.entity';
import { CustomException } from '../../utilities/custom-exception.utility';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,

    @InjectRepository(UserRoles)
    private userRolesRepository: Repository<UserRoles>,
  ) {}

  async create(createUserDto: CreateUserDto, acceptedLanguage: string) {
    if (createUserDto.role) {
      const role = await this.rolesRepository.count({
        where: {
          name: createUserDto.role,
        },
      });

      if (!role) {
        throw new CustomException(
          'role_not_found',
          'role',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      // default role
      createUserDto.role = 'argonomist';
    }

    const role = await this.rolesRepository.findOne({
      where: {
        name: createUserDto.role,
      },
    });

    const userAlreadyExists = await this.usersRepository.findOne({
      where: {
        phone: createUserDto.phone,
        country_code: createUserDto.country_code,
      },
    });

    if (userAlreadyExists) {
      throw new CustomException(
        'user_already_exists',
        'phone',
        HttpStatus.CONFLICT,
      );
    }

    createUserDto.password = await hashPassword(createUserDto.password);

    const user = await this.usersRepository.save({
      ...createUserDto,
      accept_language: acceptedLanguage,
    });

    await this.userRolesRepository.save({
      user_id: user.id,
      role_id: role.id,
    });

    return {
      message: 'User created successfully!',
    };
  }
}
