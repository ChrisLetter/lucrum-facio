import { PrismaClient } from '@prisma/client';
const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const { authenticated, authorized, createToken } = require('./auth');
import { IRegisterInput, ILoginInput } from './../../interfaces/interfaces';

export const resolvers = {
  Query: {
    getUsers: async () => {
      const res = await prisma.user.findMany();
      return res;
    },
  },
  Mutation: {
    async register(_: any, { registrationInput }: IRegisterInput) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: registrationInput.email,
        },
      });
      if (existingUser) {
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
    async login(_: any, { loginInput }: ILoginInput) {
      const userInfo = await prisma.user.findUnique({
        where: {
          email: loginInput.email,
        },
      });
      console.log(userInfo);
      if (userInfo?.id) {
        const token = createToken(userInfo.id);
        return { token, user: userInfo };
      }
    },
  },
};
