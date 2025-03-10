import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UserModel = {
  findByUsername: async (username: string) => {
    return prisma.user.findUnique({ where: { username } });
  },

  createUser: async (username: string, hashedPassword: string) => {
    return prisma.user.create({
      data: { username, password: hashedPassword },
    });
  }
};
