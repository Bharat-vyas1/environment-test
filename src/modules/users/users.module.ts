import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Roles } from '../role/entities/role.entity';
import { UserRoles } from '../role/entities/user-roles.entity';
import { Sessions } from '../sessions/entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles, UserRoles, Sessions])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
