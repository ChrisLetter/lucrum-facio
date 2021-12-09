import { PrismaClient } from '@prisma/client';
const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const { authenticated, createToken } = require('./auth');
import {
  IRegisterInput,
  ILoginInput,
  IAddCryptoInput,
} from './../../interfaces/interfaces';

// TODO: authenticate routes when finished

export const resolvers = {
  Query: {
    getCoins: async (_: any, __: any, context: any) => {
      const cryptos = await prisma.crypto.findMany();
      return cryptos;
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

    async addCrypto(_: any, { addCryptoInput }: IAddCryptoInput, context: any) {
      const cryptoId = await prisma.crypto.findMany({
        where: {
          name: addCryptoInput.crypto,
        },
      });
      await prisma.holding.create({
        data: {
          location: addCryptoInput.stakingProvider,
          quantity: Number(addCryptoInput.quantity),
          apy: Number(addCryptoInput.apy),
          userId: Number(context.user.id),
          cryptoId: cryptoId[0].idCoinGecko,
        },
      });
      return { response: 'Added correctly to your portfolio' };
    },
  },
};
