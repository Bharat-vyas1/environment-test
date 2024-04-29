import * as crypto from 'crypto-js';

const encrypt = (text: string): string => {
  const encrypted = crypto.AES.encrypt(text, process.env.CRYPT_KEY).toString();
  return encrypted;
};

const decrypt = (encryptedText: string): string => {
  const decrypted = crypto.AES.decrypt(
    encryptedText,
    process.env.CRYPT_KEY,
  ).toString(crypto.enc.Utf8);
  return decrypted;
};

export { encrypt, decrypt };
