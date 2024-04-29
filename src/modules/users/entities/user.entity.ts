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
import { UserRoles } from '../../role/entities/user-roles.entity';
import { Sessions } from '../../sessions/entities/session.entity';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  country_code: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  accept_language: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  created_at: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updated_at: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Timestamp;

  // relations
  @OneToMany(() => UserRoles, (UserRoles) => UserRoles.user_id)
  UserRoles: UserRoles[];

  @OneToMany(() => Sessions, (sessions) => sessions.user_id)
  sessions: Sessions[];
}
