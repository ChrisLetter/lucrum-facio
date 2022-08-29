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
    location: String!
    quantity: String!
    apy: String!
    userId: Int!
    cryptoId: String!
    crypto: crypto
    owner: user
  }
  type crypto {
    id: Int!
    idCoinGecko: String!
    name: String!
    symbol: String!
    image: String!
    holders: [holding]
  }
  type loggedUser {
    token: String!
    username: String!
    holdings: [holding]
    userId: Int!
  }
  type newUser {
    token: String!
    username: String!
  }
  type Query {
    getCoins: [crypto]
    getUserHoldings(userId: Int): [holding]
  }
  type mutationResponse {
    response: String!
    holdings: [holding]
  }
  input loginUserInput {
    email: String!
    password: String!
  }
  type Mutation {
    register(registrationInput: registerUserInput): newUser
    login(loginInput: loginUserInput): loggedUser
    addCrypto(addCryptoInput: addCryptoUserInput): mutationResponse!
    deletePosition(positionId: Int): mutationResponse!
    editPosition(editPositionInput: editPositionUserInput): mutationResponse!
  }
  input registerUserInput {
    username: String!
    email: String!
    password: String!
  }
  input addCryptoUserInput {
    crypto: String!
    stakingProvider: String!
    quantity: String!
    apy: String!
  }
  input editPositionUserInput {
    id: Int!
    stakingProvider: String!
    quantity: String!
    apy: String!
  }
`;
