import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const passwordMatch = await bcrypt.compare(password, hash);

  if (!passwordMatch) {
    return false;
  }

  return true;
};

export { hashPassword, comparePassword };
