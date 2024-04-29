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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const session_entity_1 = require("../sessions/entities/session.entity");
const bcrypt_utility_1 = require("../../utilities/bcrypt.utility");
const jwt_1 = require("@nestjs/jwt");
const crypto_utility_1 = require("../../utilities/crypto.utility");
const crypto_utility_2 = require("../../utilities/crypto.utility");
const uuid_1 = require("uuid");
const custom_exception_utility_1 = require("../../utilities/custom-exception.utility");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersRepository, sessionsRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.sessionsRepository = sessionsRepository;
        this.jwtService = jwtService;
    }
    async login(request, loginDto) {
        const uniqueDeviceName = (0, uuid_1.v4)();
        const user = await this.usersRepository.findOne({
            where: {
                phone: loginDto.phone,
            },
        });
        if (!user) {
            throw new custom_exception_utility_1.CustomException('user_with_this_phone_number_not_found', 'phone', common_1.HttpStatus.NOT_FOUND);
        }
        const passwordMatch = await (0, bcrypt_utility_1.comparePassword)(loginDto.password, user.password);
        if (!passwordMatch) {
            throw new custom_exception_utility_1.CustomException('invalid_password', 'password', common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = {
            id: user.id,
            device_name: uniqueDeviceName,
        };
        const accessToken = (0, crypto_utility_1.encrypt)(this.jwtService.sign(payload));
        const refreshToken = (0, crypto_utility_1.encrypt)(this.jwtService.sign(payload, {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
        }));
        await this.sessionsRepository.save({
            user_id: user.id,
            device_address: request.headers['user-agent'],
            device_name: uniqueDeviceName,
            token: refreshToken,
        });
        return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            tokens: {
                access_token: accessToken,
                refresh_token: refreshToken,
            },
        };
    }
    async getAccessToken(refreshToken) {
        let decryptedRefreshToken;
        if (!refreshToken) {
            throw new custom_exception_utility_1.CustomException('refresh_token_required', 'refresh_token', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            decryptedRefreshToken = (0, crypto_utility_2.decrypt)(refreshToken);
            const payload = await this.jwtService.verifyAsync(decryptedRefreshToken, {
                secret: process.env.JWT_SECRET,
            });
            const user = await this.usersRepository.findOne({
                where: {
                    id: payload.id,
                },
            });
            if (!user) {
                throw new custom_exception_utility_1.CustomException('user_not_found', 'refresh_token', common_1.HttpStatus.UNAUTHORIZED);
            }
            const session = await this.sessionsRepository.findOne({
                where: {
                    device_name: payload.device_name,
                    token: refreshToken,
                },
            });
            if (!session) {
                throw new custom_exception_utility_1.CustomException('session_not_found', 'refresh_token', common_1.HttpStatus.UNAUTHORIZED);
            }
            const accessTokenPayload = {
                id: user.id,
            };
            const accessToken = (0, crypto_utility_1.encrypt)(this.jwtService.sign(accessTokenPayload));
            return {
                access_token: accessToken,
            };
        }
        catch (err) {
            throw new custom_exception_utility_1.CustomException('token_expired', 'refresh_token', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(session_entity_1.Sessions)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map