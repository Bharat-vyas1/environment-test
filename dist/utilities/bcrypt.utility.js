"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => {
    const passwordMatch = await bcrypt.compare(password, hash);
    if (!passwordMatch) {
        return false;
    }
    return true;
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.utility.js.map