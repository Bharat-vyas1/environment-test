// export default typeOrmConfig;
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CreateUuidExtension1687135017691 } from '../migrations/1687135017691-create-uuid-extension';
import { CreateUser1687240112160 } from '../migrations/1687240112160-create-users';
import { CreateRoles1687768113330 } from '../migrations/1687768113330-create-roles';
import { CreateUserRoles1687768205624 } from '../migrations/1687768205624-create-user-roles';
import { CreateSessions1687779278310 } from '../migrations/1687779278310-create-sessions';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [],
  migrations: [
    CreateUuidExtension1687135017691,
    CreateUser1687240112160,
    CreateRoles1687768113330,
    CreateUserRoles1687768205624,
    CreateSessions1687779278310,
  ],
});
