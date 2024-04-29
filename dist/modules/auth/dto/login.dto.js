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
exports.LoginDto = void 0;
const class_validator_1 = require("class-validator");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '$property phone_number_is_required' }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.Length)(1, 16, { message: '$property phone_number_is_too_long' }),
    __metadata("design:type", String)
], LoginDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '$property country_code_is_required' }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.Length)(1, 4, { message: '$property country_code_is_too_long' }),
    __metadata("design:type", String)
], LoginDto.prototype, "country_code", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '$property password_should_be_string' }),
    (0, class_validator_1.IsNotEmpty)({ message: '$property password_is_required' }),
    (0, class_validator_1.Length)(1, 100, { message: '$property password_is_too_long' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
//# sourceMappingURL=login.dto.js.map