import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type user {
    id: Int!
    username: String!
    password: String!
    email: String!
    portfolio: [holding]
  }
  type holding {
    id: Int!
    name: String!
    location: String!
    quantity: String!
    apy: String!
    userId: Int!
    owner: user!
  }
  type loggedUser {
    token: String!
    user: user
  }
  type Query {
    getUsers: [user]
  }
  input loginUserInput {
    email: String!
    password: String!
  }
  type Mutation {
    register(registrationInput: registerUserInput): loggedUser
    login(loginInput: loginUserInput): loggedUser
  }
  input registerUserInput {
    username: String!
    email: String!
    password: String!
  }
`;
