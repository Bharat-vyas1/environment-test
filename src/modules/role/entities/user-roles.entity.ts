import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { Roles } from './role.entity';
import { Users } from '../../users/entities/user.entity';

@Entity('user_roles')
export class UserRoles extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'uuid' })
  user_id: string;

  @Column({ nullable: false, type: 'uuid' })
  role_id: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updated_at: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Timestamp;

  // relations
  @OneToOne(() => Roles, (roles) => roles.id)
  role: Roles;

  @OneToOne(() => Users, (users) => users.id)
  user: Users;
}
