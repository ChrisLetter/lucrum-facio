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
