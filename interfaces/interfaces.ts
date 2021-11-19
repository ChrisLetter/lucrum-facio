export interface IRegisterFormErrors {
  email?: string;
  password?: string;
  username?: string;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  username: string;
}

export interface ILoginFormErrors {
  email?: string;
  password?: string;
}
export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegisterInput {
  registrationInput: {
    username: string;
    email: string;
    password: string;
  };
}

export interface ILoginInput {
  loginInput: {
    email: string;
    password: string;
  };
}

export interface IUserInfo {
  username: string;
  holdings: IHolding[];
}

export interface IHolding {
  name: string;
  location: string;
  quantity: number;
  apy: number;
}

export interface ICryptoInfo {
  idCoinGecko: string;
  symbol: string;
  image: string;
  name: string;
}
