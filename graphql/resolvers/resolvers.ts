import { PrismaClient } from '@prisma/client';
const { AuthenticationError } = require('apollo-server');

const prisma = new PrismaClient();
const { authenticated, authorized, createToken } = require('./auth');
import { IRegisterInput } from './../../interfaces/interfaces';

export const resolvers = {
  Query: {
    getUsers: async () => {
      const res = await prisma.user.findMany();
      return res;
    },
  },
  Mutation: {
    async register(_: any, { registrationInput }: IRegisterInput) {
      const existingUser = await prisma.user.findMany({
        where: {
          email: registrationInput.email,
        },
      });
      if (existingUser.length) {
        throw new AuthenticationError(
          'there was an error creating the account',
        );
      }
      const user = await prisma.user.create({
        data: registrationInput,
      });
      const token = createToken(user.id);
      return { token, user };
    },
  },
};
