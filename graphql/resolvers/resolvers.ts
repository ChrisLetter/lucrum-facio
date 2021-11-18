import { PrismaClient } from '@prisma/client';
const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const { authenticated, createToken } = require('./auth');
import { IRegisterInput, ILoginInput } from './../../interfaces/interfaces';

export const resolvers = {
  Query: {
    getUsers: authenticated(async (_: any, __: any, context: any) => {
      const res = await prisma.user.findMany();
      return res;
    }),
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
      const hashedPass = await bcrypt.hash(registrationInput.password, 10);
      registrationInput.password = hashedPass;
      const { id, username } = await prisma.user.create({
        data: registrationInput,
      });
      const token = createToken(id);
      return { token, username };
    },
    async login(_: any, { loginInput }: ILoginInput) {
      const userInfo = await prisma.user.findUnique({
        where: {
          email: loginInput.email,
        },
      });
      const isPasswordCorrect = await bcrypt.compare(
        loginInput.password,
        userInfo?.password,
      );
      if (userInfo?.id && isPasswordCorrect) {
        const token = createToken(userInfo.id);
        const username = userInfo.username;
        const portfolio = await prisma.holding.findMany({
          where: {
            userId: Number(userInfo.id),
          },
        });
        return { token, username, holdings: portfolio };
      } else {
        throw new AuthenticationError('wrong email or password');
      }
    },
  },
};
