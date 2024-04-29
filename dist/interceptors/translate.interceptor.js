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
exports.TranslateInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const nestjs_i18n_1 = require("nestjs-i18n");
const custom_exception_utility_1 = require("../utilities/custom-exception.utility");
let TranslateInterceptor = exports.TranslateInterceptor = class TranslateInterceptor {
    constructor(i18n) {
        this.i18n = i18n;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const whitelistUrls = ['/', '/health', '/health/'];
        const lang = request.headers['accept-language'];
        if (whitelistUrls.includes(request.url)) {
            return next.handle();
        }
        if (!lang) {
            throw new custom_exception_utility_1.CustomException('accept_language_header_is_required', 'accept_language', common_1.HttpStatus.BAD_REQUEST);
        }
        return next.handle().pipe((0, operators_1.map)((data) => {
            this.i18n.resolveLanguage(lang);
            return data;
        }));
    }
};
exports.TranslateInterceptor = TranslateInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService])
], TranslateInterceptor);
//# sourceMappingURL=translate.interceptor.js.map