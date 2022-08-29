import { PrismaClient } from '@prisma/client';
const { AuthenticationError } = require('apollo-server');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();
const { authenticated, createToken } = require('./auth');
import {
  IRegisterInput,
  ILoginInput,
  IAddCryptoInput,
  IEditPositionInput,
} from './../../interfaces/interfaces';

// TODO: authenticate routes when finished

export const resolvers = {
  Query: {
    getCoins: async (_: any, __: any, context: any) => {
      const cryptos = await prisma.crypto.findMany();
      return cryptos;
    },
    getUserHoldings: async (_: any, userId: any) => {
      const userHoldings = await prisma.holding.findMany({
        where: {
          userId: userId.userId,
        },
      });
      return userHoldings;
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
        return { token, username, holdings: portfolio, userId: userInfo.id };
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
      const portfolio = await prisma.holding.findMany({
        where: {
          userId: Number(context.user.id),
        },
      });
      return {
        response: 'Added correctly to your portfolio',
        holdings: portfolio,
      };
    },

    async editPosition(
      _: any,
      { editPositionInput }: IEditPositionInput,
      context: any,
    ) {
      const { id, quantity, apy, stakingProvider } = editPositionInput;
      const updatePosition = await prisma.holding.update({
        where: {
          id,
        },
        data: {
          location: stakingProvider,
          quantity: Number(quantity),
          apy: Number(apy),
        },
      });
      const { userId } = updatePosition;
      const portfolio = await prisma.holding.findMany({
        where: {
          userId: Number(userId),
        },
      });
      return {
        response: 'successfully updated',
        holdings: portfolio,
      };
    },

    async deletePosition(_: any, id: any) {
      const { positionId } = id;
      try {
        const deletedPosition = await prisma.holding.delete({
          where: {
            id: positionId,
          },
        });
        const { userId } = deletedPosition;
        const portfolio = await prisma.holding.findMany({
          where: {
            userId: Number(userId),
          },
        });
        return {
          response: 'position correctly deleted',
          holdings: portfolio,
        };
      } catch (error) {
        console.error(error);
        return {
          response: 'error',
        };
      }
    },
  },
};
