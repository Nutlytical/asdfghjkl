import * as bcrypt from 'bcrypt';

export function encodePassword(password: string): string {
  const SALT = bcrypt.genSaltSync();

  return bcrypt.hashSync(password, SALT);
}

export function decodePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
