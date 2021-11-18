import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import Cors from 'micro-cors';
import { typeDefs } from './../../graphql/typeDefs/typeDefs';
import { resolvers } from './../../graphql/resolvers/resolvers';
import { createToken, getUserFromToken } from './../../graphql/resolvers/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await getUserFromToken(token);
    return { user, createToken };
  },
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});
