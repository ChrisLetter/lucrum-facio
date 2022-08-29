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
  userId: number;
}

export interface IHoldingsProp {
  holdings: IHolding[];
}

export interface IHoldingProp {
  holding: IHolding;
}

export interface IHolding {
  name: string;
  location: string;
  quantity: number;
  apy: number;
  cryptoId?: string;
  id: number;
}

export interface IHoldingFromDb {
  apy: number;
  cryptoId: string;
  location: string;
  quantity: string;
}

export interface ICryptoInfo {
  idCoinGecko: string;
  symbol: string;
  image: string;
  name: string;
}

export interface IAddCryptoFormErrors {
  stakingProvider?: string;
  quantity?: string;
  apy?: string;
}

export interface IAddCryptoFormInput {
  stakingProvider?: string;
  quantity?: string;
  apy?: string;
}

export interface IAddCryptoInput {
  addCryptoInput: {
    crypto: string;
    stakingProvider: string;
    quantity: string;
    apy: string;
  };
}

export interface IEditPositionInput {
  editPositionInput: {
    id: number;
    stakingProvider: string;
    quantity: string;
    apy: string;
  };
}

export interface IPieChartData {
  id: string;
  label: string;
  value: number;
}

export interface IPieChartDataProps {
  data: IPieChartData[];
}

export interface IAggregateHoldingsResult {
  usdNetWorth: string;
  usdApyEstimate: string;
  totalApy: string;
  dataPieChart: IPieChartData[];
}

export interface IHoldingsGroupedByCrypto {
  [key: string]: IHolding[];
}
