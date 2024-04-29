import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRoles } from './user-roles.entity';

@Entity('roles')
export class Roles extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updated_at: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Timestamp;

  // relations
  @OneToMany(() => UserRoles, (UserRoles) => UserRoles.role_id)
  user_roles: UserRoles[];
}
