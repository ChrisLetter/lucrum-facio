import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation ($registrationInput: registerUserInput) {
    register(registrationInput: $registrationInput) {
      token
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($loginInput: loginUserInput) {
    login(loginInput: $loginInput) {
      token
      username
      userId
      holdings {
        location
        quantity
        apy
        cryptoId
      }
    }
  }
`;

export const ADD_CRYPTO = gql`
  mutation ($addCryptoInput: addCryptoUserInput) {
    addCrypto(addCryptoInput: $addCryptoInput) {
      response
      holdings {
        location
        quantity
        apy
        cryptoId
      }
    }
  }
`;

export const GET_COINS = gql`
  query {
    getCoins {
      idCoinGecko
      name
      symbol
      image
    }
  }
`;

export const GET_USER_HOLDINGS = gql`
  query ($userId: Int) {
    getUserHoldings(userId: $userId) {
      location
      quantity
      apy
      cryptoId
    }
  }
`;
