import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../../modules/users/entities/user.entity';

@Entity('sessions')
export class Sessions extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false })
  device_address: string;

  @Column({ nullable: false })
  device_name: string;

  @Column({ nullable: false, unique: true })
  token: string;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedAt: Timestamp;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Timestamp;

  // relations
  @ManyToOne(() => Users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Users;
}
