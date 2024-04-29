"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUuidExtension1687135017691 = void 0;
class CreateUuidExtension1687135017691 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
    }
}
exports.CreateUuidExtension1687135017691 = CreateUuidExtension1687135017691;
//# sourceMappingURL=1687135017691-create-uuid-extension.js.map