import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const SECRET_KEY: string = process.env.SECRET_KEY || "default_secret";

/**
 * JWT を発行する
 * @param payload - JWT のペイロード
 * @param expiresIn - 期限 (デフォルト: 1時間)
 * @returns JWT トークン
 */
export function generateToken(payload: object, expiresIn: SignOptions["expiresIn"] = "1h"): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}


/**
 * JWT を検証する
 * @param token - 検証するトークン
 * @returns 成功時: デコードされたペイロード, 失敗時: null
 */
export function verifyToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return typeof decoded === "string" ? null : decoded;
  } catch {
    return null;
  }
}
