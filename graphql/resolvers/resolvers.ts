import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getUsers: async () => {
      const res = await prisma.user.findMany();
      return res;
    },
  },
};
