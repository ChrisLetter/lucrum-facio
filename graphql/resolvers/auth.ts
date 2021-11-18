const { AuthenticationError } = require('apollo-server');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const createToken = (id: number) => jwt.sign(id, secret);

const getUserFromToken = async (token: string) => {
  try {
    const userId = jwt.verify(token, secret);
    return await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
  } catch (e) {
    return null;
  }
};

const authenticated =
  (next: any) => (root: any, args: any, context: any, info: any) => {
    if (!context.user) {
      throw new AuthenticationError('must authenticate');
    }
    return next(root, args, context, info);
  };

export { getUserFromToken, authenticated, createToken };
