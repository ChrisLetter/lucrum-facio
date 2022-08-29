import { IUserInfo, IHolding } from './../interfaces/interfaces';

export type createNewUserAction = {
  type: 'AUTHENTICATE_USER';
  payload: IUserInfo;
};

export type updateHoldings = {
  type: 'UPDATE_HOLDINGS';
  payload: { holdings: IHolding[] };
};
