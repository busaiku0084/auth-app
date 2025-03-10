import { Request, Response, RequestHandler } from "express";
import { signup, issueToken, verifyToken, revokeToken } from "../services/auth.service";

/**
 * ユーザー登録
 */
export const signupController: RequestHandler = async (req, res) => {
  try {
    const user = await signup(req.body.username, req.body.password);
    res.json({ message: "User created", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * トークン発行
 */
export const issueTokenController: RequestHandler = async (req, res) => {
  try {
    const token = await issueToken(req.body.username, req.body.password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

/**
 * トークン検証
 */
export const verifyTokenController: RequestHandler = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ valid: false });
    return;
  }

  const token = authHeader.split(" ")[1];
  const decoded = await verifyToken(token);
  res.json({ valid: !!decoded, user: decoded });
};

/**
 * トークン失効
 */
export const revokeTokenController: RequestHandler = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];
  await revokeToken(token);
  res.json({ message: "Token revoked" });
};
