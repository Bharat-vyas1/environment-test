"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoles1687768113330 = void 0;
const typeorm_1 = require("typeorm");
class CreateRoles1687768113330 {
    async up(queryRunner) {
        await queryRunner.startTransaction();
        try {
            await queryRunner.createTable(new typeorm_1.Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }), true);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }
    async down(queryRunner) {
        await queryRunner.startTransaction();
        try {
            await queryRunner.dropTable('roles');
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }
}
exports.CreateRoles1687768113330 = CreateRoles1687768113330;
//# sourceMappingURL=1687768113330-create-roles.js.map