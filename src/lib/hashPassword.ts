import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  return bcrypt.hashSync(password, 14);
};
