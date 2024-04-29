import { BaseEntity, Timestamp } from 'typeorm';
import { Roles } from './role.entity';
import { Users } from '../../users/entities/user.entity';
export declare class UserRoles extends BaseEntity {
    id: string;
    user_id: string;
    role_id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    deleted_at: Timestamp;
    role: Roles;
    user: Users;
}
