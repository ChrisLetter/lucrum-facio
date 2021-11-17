import { ApolloServer, gql } from 'apollo-server-micro';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import Cors from 'micro-cors';

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    password: String!
    email: String!
    portfolio: [Holding]
  }
  type Holding {
    id: Int!
    name: String!
    location: String!
    quantity: String!
    apy: String!
    userId: Int!
    owner: User!
  }
  type Query {
    getUsers: [User]
  }
`;

const resolvers = {
  Query: {
    getUsers: async () => {
      const res = await prisma.user.findMany();
      return res;
    },
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
