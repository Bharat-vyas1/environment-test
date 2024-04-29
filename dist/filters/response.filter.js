"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessageSerializerFilter = void 0;
const common_1 = require("@nestjs/common");
const nestjs_i18n_1 = require("nestjs-i18n");
let ErrorMessageSerializerFilter = exports.ErrorMessageSerializerFilter = class ErrorMessageSerializerFilter {
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const i18n = nestjs_i18n_1.I18nContext.current();
        const response = ctx.getResponse();
        const errorResponse = exception.getResponse();
        let errorMessages = [];
        let errorMessage = 'something_went_wrong_please_try_again';
        let errorField = null;
        if (errorResponse.message &&
            Array.isArray(errorResponse.message) &&
            errorResponse.message.length > 0) {
            errorMessages = errorMessages.concat(errorResponse.message);
            const splittedMessage = errorResponse.message[0].split(' ');
            errorField = splittedMessage.shift();
            errorMessage = splittedMessage.join(' ');
        }
        else if (errorResponse.type === 'customException') {
            errorMessage = errorResponse.error;
            errorField = errorResponse.errorKey;
        }
        else if (typeof errorResponse === 'string') {
            errorMessage = errorResponse;
        }
        else if (errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse.message) {
            errorMessage = errorResponse.message;
        }
        const translatedErrorMessage = await i18n.t(`translations.${errorMessage}`);
        if (!translatedErrorMessage.startsWith('translations.')) {
            errorMessage = translatedErrorMessage;
        }
        const serializedError = {
            statusCode: exception.getStatus(),
            message: errorMessage,
            errorField: errorField,
            messages: errorMessages,
            timestamp: new Date().toISOString(),
        };
        serializedError.message += '!';
        response.status(exception.getStatus()).json(serializedError);
    }
};
exports.ErrorMessageSerializerFilter = ErrorMessageSerializerFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], ErrorMessageSerializerFilter);
//# sourceMappingURL=response.filter.js.map