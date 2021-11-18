import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
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
