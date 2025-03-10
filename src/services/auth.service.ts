import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { TokenModel } from "../models/token.model";
import { generateToken, verifyToken as verifyJwt } from "../utils/jwt";

export async function signup(username: string, password: string) {
  const existingUser = await UserModel.findByUsername(username);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await UserModel.createUser(username, hashedPassword);
}

export async function issueToken(username: string, password: string) {
  const user = await UserModel.findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({ userId: user.id });

  await TokenModel.createToken(user.id, token, new Date(Date.now() + 3600000));
  return token;
}

export async function verifyToken(token: string) {
  const decoded = verifyJwt(token);
  if (!decoded) return null;

  const tokenRecord = await TokenModel.findToken(token);
  return tokenRecord && !tokenRecord.revoked ? decoded : null;
}

export async function revokeToken(token: string) {
  await TokenModel.revokeToken(token);
}
