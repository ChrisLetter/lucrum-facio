export interface IRegisterFormErrors {
  email?: string;
  password?: string;
  username?: string;
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
