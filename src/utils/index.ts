import bcrypt from "bcrypt";

export function generateUserPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}
