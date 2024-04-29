"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let UserRoles = exports.UserRoles = class UserRoles extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserRoles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'uuid' }),
    __metadata("design:type", String)
], UserRoles.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'uuid' }),
    __metadata("design:type", String)
], UserRoles.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', nullable: false }),
    __metadata("design:type", typeorm_1.Timestamp)
], UserRoles.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', nullable: false }),
    __metadata("design:type", typeorm_1.Timestamp)
], UserRoles.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", typeorm_1.Timestamp)
], UserRoles.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => role_entity_1.Roles, (roles) => roles.id),
    __metadata("design:type", role_entity_1.Roles)
], UserRoles.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Users, (users) => users.id),
    __metadata("design:type", user_entity_1.Users)
], UserRoles.prototype, "user", void 0);
exports.UserRoles = UserRoles = __decorate([
    (0, typeorm_1.Entity)('user_roles')
], UserRoles);
//# sourceMappingURL=user-roles.entity.js.map