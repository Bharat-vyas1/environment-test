import { BaseEntity, Timestamp } from 'typeorm';
import { UserRoles } from './user-roles.entity';
export declare class Roles extends BaseEntity {
    id: string;
    name: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    deleted_at: Timestamp;
    user_roles: UserRoles[];
}
