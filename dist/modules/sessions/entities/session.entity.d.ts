import { BaseEntity, Timestamp } from 'typeorm';
import { Users } from '../../../modules/users/entities/user.entity';
export declare class Sessions extends BaseEntity {
    id: string;
    user_id: string;
    device_address: string;
    device_name: string;
    token: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt: Timestamp;
    user: Users;
}
