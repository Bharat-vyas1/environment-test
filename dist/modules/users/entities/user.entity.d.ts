import { BaseEntity, Timestamp } from 'typeorm';
import { UserRoles } from '../../role/entities/user-roles.entity';
import { Sessions } from '../../sessions/entities/session.entity';
export declare class Users extends BaseEntity {
    id: string;
    name: string;
    phone: string;
    country_code: string;
    password: string;
    accept_language: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    deleted_at: Timestamp;
    UserRoles: UserRoles[];
    sessions: Sessions[];
}
