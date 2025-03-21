import bcrypt from "bcryptjs";

/**
 * パスワードをハッシュ化する
 * @param password - ハッシュ化する平文のパスワード
 * @returns ハッシュ化されたパスワード
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

/**
 * パスワードを検証する
 * @param password - 検証する平文のパスワード
 * @param hashedPassword - ハッシュ化されたパスワード
 * @returns パスワードが一致するかどうか
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashedPassword);

  return isValid;
}
