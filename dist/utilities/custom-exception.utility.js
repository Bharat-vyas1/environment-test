"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
const common_1 = require("@nestjs/common");
class CustomException extends common_1.HttpException {
    constructor(error, errorKey, statusCode) {
        super({ error, errorKey, type: 'customException' }, statusCode);
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=custom-exception.utility.js.map