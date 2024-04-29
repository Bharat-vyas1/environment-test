"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const _1687135017691_create_uuid_extension_1 = require("../migrations/1687135017691-create-uuid-extension");
const _1687240112160_create_users_1 = require("../migrations/1687240112160-create-users");
const _1687768113330_create_roles_1 = require("../migrations/1687768113330-create-roles");
const _1687768205624_create_user_roles_1 = require("../migrations/1687768205624-create-user-roles");
const _1687779278310_create_sessions_1 = require("../migrations/1687779278310-create-sessions");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [],
    migrations: [
        _1687135017691_create_uuid_extension_1.CreateUuidExtension1687135017691,
        _1687240112160_create_users_1.CreateUser1687240112160,
        _1687768113330_create_roles_1.CreateRoles1687768113330,
        _1687768205624_create_user_roles_1.CreateUserRoles1687768205624,
        _1687779278310_create_sessions_1.CreateSessions1687779278310,
    ],
});
//# sourceMappingURL=typeorm.config.js.map