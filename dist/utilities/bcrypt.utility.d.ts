declare const hashPassword: (password: string) => Promise<string>;
declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
export { hashPassword, comparePassword };
