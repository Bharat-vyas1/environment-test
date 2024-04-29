"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto = require("crypto-js");
const encrypt = (text) => {
    const encrypted = crypto.AES.encrypt(text, process.env.CRYPT_KEY).toString();
    return encrypted;
};
exports.encrypt = encrypt;
const decrypt = (encryptedText) => {
    const decrypted = crypto.AES.decrypt(encryptedText, process.env.CRYPT_KEY).toString(crypto.enc.Utf8);
    return decrypted;
};
exports.decrypt = decrypt;
//# sourceMappingURL=crypto.utility.js.map