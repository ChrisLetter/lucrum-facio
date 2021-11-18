import { IUserInfo } from './../interfaces/interfaces';

export type createNewUserAction = {
  type: 'AUTHENTICATE_USER';
  payload: IUserInfo;
};
