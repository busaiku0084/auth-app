import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TokenModel = {
  createToken: async (userId: number, token: string, expiresAt: Date) => {
    return prisma.token.create({
      data: { userId, token, expiresAt }
    });
  },

  findToken: async (token: string) => {
    return prisma.token.findUnique({ where: { token } });
  },

  revokeToken: async (token: string) => {
    return prisma.token.updateMany({ where: { token }, data: { revoked: true } });
  }
};
