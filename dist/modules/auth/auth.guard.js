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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const session_entity_1 = require("../sessions/entities/session.entity");
const jwt_1 = require("@nestjs/jwt");
const crypto_utility_1 = require("../../utilities/crypto.utility");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../../decorators/public.decorator");
const typeorm_2 = require("@nestjs/typeorm");
let AuthGuard = exports.AuthGuard = class AuthGuard {
    constructor(usersRepository, sessionsRepository, jwtService, reflector) {
        this.usersRepository = usersRepository;
        this.sessionsRepository = sessionsRepository;
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const decryptedToken = (0, crypto_utility_1.decrypt)(token);
            const payload = await this.jwtService.verifyAsync(decryptedToken, {
                secret: process.env.JWT_SECRET,
            });
            const user = await this.usersRepository.findOne({
                where: {
                    id: payload.id,
                },
            });
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const session = await this.sessionsRepository.findOne({
                where: {
                    device_name: payload.device_name,
                },
            });
            if (!session) {
                throw new common_1.UnauthorizedException();
            }
            request['user'] = user;
            request['session'] = session;
        }
        catch (_a) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        var _a, _b;
        const [type, token] = (_b = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.Users)),
    __param(1, (0, typeorm_2.InjectRepository)(session_entity_1.Sessions)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService,
        core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map