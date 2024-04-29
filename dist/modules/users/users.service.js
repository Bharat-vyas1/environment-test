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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt_utility_1 = require("../../utilities/bcrypt.utility");
const role_entity_1 = require("../role/entities/role.entity");
const user_roles_entity_1 = require("../role/entities/user-roles.entity");
const custom_exception_utility_1 = require("../../utilities/custom-exception.utility");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository, rolesRepository, userRolesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.userRolesRepository = userRolesRepository;
    }
    async create(createUserDto, acceptedLanguage) {
        if (createUserDto.role) {
            const role = await this.rolesRepository.count({
                where: {
                    name: createUserDto.role,
                },
            });
            if (!role) {
                throw new custom_exception_utility_1.CustomException('role_not_found', 'role', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            createUserDto.role = 'argonomist';
        }
        const role = await this.rolesRepository.findOne({
            where: {
                name: createUserDto.role,
            },
        });
        const userAlreadyExists = await this.usersRepository.findOne({
            where: {
                phone: createUserDto.phone,
                country_code: createUserDto.country_code,
            },
        });
        if (userAlreadyExists) {
            throw new custom_exception_utility_1.CustomException('user_already_exists', 'phone', common_1.HttpStatus.CONFLICT);
        }
        createUserDto.password = await (0, bcrypt_utility_1.hashPassword)(createUserDto.password);
        const user = await this.usersRepository.save(Object.assign(Object.assign({}, createUserDto), { accept_language: acceptedLanguage }));
        await this.userRolesRepository.save({
            user_id: user.id,
            role_id: role.id,
        });
        return {
            message: 'User created successfully!',
        };
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Roles)),
    __param(2, (0, typeorm_1.InjectRepository)(user_roles_entity_1.UserRoles)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map