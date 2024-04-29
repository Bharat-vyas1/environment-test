"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSessions1687779278310 = void 0;
const typeorm_1 = require("typeorm");
class CreateSessions1687779278310 {
    async up(queryRunner) {
        await queryRunner.startTransaction();
        try {
            await queryRunner.createTable(new typeorm_1.Table({
                name: 'sessions',
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
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'device_address',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'device_name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'token',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
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
            await queryRunner.createForeignKey('sessions', new typeorm_1.TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }));
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
            await queryRunner.dropTable('sessions');
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }
}
exports.CreateSessions1687779278310 = CreateSessions1687779278310;
//# sourceMappingURL=1687779278310-create-sessions.js.map